import type { ReactNode } from "react";

export function Diagrams() {
  return (
    <div className="space-y-6">
      <Figure
        title="Conceptual"
        label="A visitor reads a lesson, answers a check, and may open the written plan. The documents sit beside that path."
      >
        <ConceptualDiagram />
      </Figure>
      <Figure
        title="Logical"
        label="The lesson file feeds the page. The page grades a check and reveals the plan text. The documents feed the reading pages."
      >
        <LogicalDiagram />
      </Figure>
      <Figure
        title="Physical"
        label="GitHub Pages stores the files. The browser grades checks and shows the plan. Terraform does not run here."
      >
        <PhysicalDiagram />
      </Figure>
    </div>
  );
}

function Figure({ title, label, children }: { title: string; label: string; children: ReactNode }) {
  return (
    <figure className="panel px-4 py-5 sm:px-6">
      <figcaption>
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">{label}</p>
      </figcaption>
      <div className="mt-4 overflow-x-auto">{children}</div>
    </figure>
  );
}

function Marker({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" fill="#0f4c5c" />
      </marker>
    </defs>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  lines,
  tone = "paper",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines: string[];
  tone?: "paper" | "accent";
}) {
  const fill = tone === "accent" ? "#0f4c5c" : "#f6ead8";
  const titleFill = tone === "accent" ? "#f6ead8" : "#152028";
  const lineFill = tone === "accent" ? "#e7d3b8" : "#5a6b76";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={fill} stroke="#0f4c5c" strokeWidth="1.5" />
      <text x={x + 16} y={y + 28} fill={titleFill} fontSize="15" fontWeight="600" fontFamily="Source Serif 4, Georgia, serif">
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 16}
          y={y + 50 + index * 18}
          fill={lineFill}
          fontSize="12"
          fontFamily="Source Sans 3, Arial, sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function ConceptualDiagram() {
  return (
    <svg viewBox="0 0 860 500" role="img" aria-label="Conceptual architecture" className="min-w-[760px]">
      <Marker id="arrow-c" />
      <Box x={330} y={16} w={200} h={78} title="Visitor" lines={["Reads, then answers"]} />
      <Box x={20} y={160} w={240} h={100} title="Lessons" lines={["Nine configurations", "One plan each"]} />
      <Box x={310} y={160} w={240} h={100} title="Checks" lines={["Answered on the page", "Graded in the browser"]} />
      <Box x={600} y={160} w={240} h={100} title="Documents" lines={["Vision, architecture", "Release notes"]} />
      <Box x={250} y={360} w={360} h={100} title="Written plan" lines={["Text shipped with the lesson", "Nothing is applied"]} tone="accent" />
      <path d="M390 94 L140 160" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
      <path d="M430 94 V160" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
      <path d="M490 94 L720 160" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
      <path d="M260 210 H310" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
      <path d="M160 260 L360 360" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
    </svg>
  );
}

function LogicalDiagram() {
  return (
    <svg viewBox="0 0 860 520" role="img" aria-label="Logical architecture" className="min-w-[760px]">
      <Marker id="arrow-l" />
      <Box x={20} y={20} w={250} h={96} title="lessons.ts" lines={["Chapter, configuration", "Checks and plan text"]} />
      <Box x={305} y={20} w={250} h={96} title="docs markdown" lines={["Summary section", "Three Mermaid views"]} />
      <Box x={590} y={20} w={246} h={96} title="package.json" lines={["Version chip", "CHANGELOG.md"]} />
      <Box x={20} y={190} w={250} h={96} title="Lesson page" lines={["/ the short path"]} />
      <Box x={305} y={190} w={250} h={96} title="Reading pages" lines={["/language", "/vision, /architecture"]} />
      <Box x={590} y={190} w={246} h={96} title="/releases" lines={["Full changelog"]} />
      <Box x={20} y={380} w={250} h={110} title="Check grader" lines={["Compares the choice", "Shows the explanation"]} tone="accent" />
      <Box x={340} y={380} w={280} h={110} title="Plan text" lines={["Revealed on the page", "No Terraform run"]} tone="accent" />
      <path d="M145 116 V190" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-l)" />
      <path d="M430 116 V190" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-l)" />
      <path d="M713 116 V190" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-l)" />
      <path d="M145 286 V380" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-l)" />
      <path d="M200 286 L430 380" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-l)" />
    </svg>
  );
}

function PhysicalDiagram() {
  return (
    <svg viewBox="0 0 860 440" role="img" aria-label="Physical architecture" className="min-w-[760px]">
      <Marker id="arrow-p" />
      <rect x="16" y="24" width="360" height="392" rx="16" fill="#f6ead8" stroke="#0f4c5c" strokeWidth="1.5" />
      <text x="36" y="58" fill="#152028" fontSize="18" fontWeight="600" fontFamily="Source Serif 4, Georgia, serif">
        Static host
      </text>
      <text x="36" y="84" fill="#5a6b76" fontSize="13" fontFamily="Source Sans 3, Arial, sans-serif">
        jmaret.github.io/Groma
      </text>
      <Box x={36} y={110} w={320} h={78} title="HTML, CSS, JS" lines={["Next.js static export"]} />
      <Box x={36} y={206} w={320} h={78} title="hero-bg.svg" lines={["Survey grid"]} />
      <Box x={36} y={302} w={320} h={78} title="No Terraform binary" lines={["No account, no database"]} />

      <rect x="460" y="24" width="380" height="392" rx="16" fill="#f6ead8" stroke="#0f4c5c" strokeWidth="1.5" />
      <text x="480" y="58" fill="#152028" fontSize="18" fontWeight="600" fontFamily="Source Serif 4, Georgia, serif">
        Browser tab
      </text>
      <text x="480" y="84" fill="#5a6b76" fontSize="13" fontFamily="Source Sans 3, Arial, sans-serif">
        Where a check is graded
      </text>
      <Box x={480} y={110} w={340} h={78} title="Lesson page" lines={["The short path"]} />
      <Box x={480} y={206} w={340} h={86} title="Checks and the plan" lines={["Both stay in the tab"]} tone="accent" />
      <Box x={480} y={310} w={340} h={70} title="Nothing stored" lines={["Refresh keeps the lessons"]} />
      <path d="M376 210 H460" stroke="#0f4c5c" strokeWidth="1.5" markerEnd="url(#arrow-p)" />
      <text x="386" y="198" fill="#5a6b76" fontSize="12" fontFamily="Source Sans 3, Arial, sans-serif">
        files
      </text>
    </svg>
  );
}
