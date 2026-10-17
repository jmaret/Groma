import type { Metadata } from "next";
import { Diagrams } from "@/components/architecture/Diagrams";
import { MarkdownDoc } from "@/components/MarkdownDoc";
import { readSummary } from "@/lib/docs";

export const metadata: Metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  const markdown = readSummary("docs/ARCHITECTURE_AND_DESIGN.md");
  return (
    <div className="site-wrap space-y-6 py-8 sm:py-12">
      <header className="panel px-5 py-8 sm:px-8">
        <p className="eyebrow">Architecture</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">Three views of the survey</h1>
        <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
          Conceptual, logical, and physical. The summary under the drawings is the same Summary
          section kept in the repository.
        </p>
      </header>
      <Diagrams />
      <article className="panel px-5 py-8 sm:px-8 sm:py-10">
        <MarkdownDoc markdown={markdown} />
      </article>
    </div>
  );
}
