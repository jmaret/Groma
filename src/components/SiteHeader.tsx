"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import packageJson from "../../package.json";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Lessons" },
  { href: "/language", label: "The language" },
  { href: "/vision", label: "Vision" },
  { href: "/architecture", label: "Architecture" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)]/80 bg-[rgba(246,234,216,0.9)] backdrop-blur-md">
      <div className="site-wrap flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium sm:justify-end">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4"
                    : "text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
                }
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/releases"
            className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--ink)]"
          >
            v{packageJson.version}
          </Link>
        </nav>
      </div>
    </header>
  );
}
