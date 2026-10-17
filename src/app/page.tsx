import Link from "next/link";
import { chapterId, lessonsByChapter } from "../../content/lessons";
import { LessonView } from "@/components/LessonView";

export default function HomePage() {
  const chapters = lessonsByChapter();

  return (
    <div className="site-wrap space-y-8 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Groma</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From a file that describes a camp to the plan that proposes it.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
          Nine short configurations on this page. Each one has a check you answer here. The plan
          shows the proposal Terraform would print. This page does not apply it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#root" className="btn-accent">
            Start with the file
          </a>
          <Link href="/language" className="btn-ghost">
            The language
          </Link>
          <Link href="/vision" className="btn-ghost">
            Read the vision
          </Link>
        </div>
      </section>

      {chapters.map((group) => (
        <section key={group.chapter} id={chapterId(group.chapter)} className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">{group.chapter}</h2>
          {group.lessons.map((lesson) => (
            <LessonView key={lesson.id} lesson={lesson} />
          ))}
        </section>
      ))}

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">What this page leaves out</h2>
        <p className="mt-2 max-w-xl text-[var(--ink-muted)]">
          The short path ends at a data source, and at a cloud resource you only read. Modules,
          count, for_each, and remote state are later. Nothing on this page is applied.
        </p>
        <Link href="/language" className="btn-ghost mt-4">
          Why Terraform looks like this
        </Link>
      </section>
    </div>
  );
}
