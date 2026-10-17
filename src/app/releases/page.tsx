import type { Metadata } from "next";
import { MarkdownDoc } from "@/components/MarkdownDoc";
import { readRepoFile } from "@/lib/docs";

export const metadata: Metadata = { title: "Releases" };

export default function ReleasesPage() {
  const markdown = readRepoFile("CHANGELOG.md");
  return (
    <article className="site-wrap py-8 sm:py-12">
      <div className="panel px-5 py-8 sm:px-8 sm:py-10">
        <MarkdownDoc markdown={markdown} />
      </div>
    </article>
  );
}
