import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="site-wrap py-16">
      <div className="panel px-5 py-10 sm:px-8">
        <p className="eyebrow">Missing page</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
          That page is not on the survey
        </h1>
        <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
          The lessons, the language page, the vision, the architecture, and the release notes are still here.
        </p>
        <Link href="/" className="btn-accent mt-6">
          Back to the lessons
        </Link>
      </div>
    </div>
  );
}
