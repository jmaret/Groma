import type { Metadata } from "next";
import { MarkdownDoc } from "@/components/MarkdownDoc";
import { readSummary } from "@/lib/docs";

export const metadata: Metadata = { title: "Vision" };

export default function VisionPage() {
  const markdown = readSummary("docs/VISION_AND_REQUIREMENTS.md");
  return (
    <article className="site-wrap py-8 sm:py-12">
      <div className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Vision</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">What this room is for</h1>
        <div className="mt-4">
          <MarkdownDoc markdown={markdown} />
        </div>
      </div>
    </article>
  );
}
