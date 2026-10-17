import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  href?: string;
};

export function Logo({ compact = false, href = "/" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex min-w-0 items-center gap-2.5 no-underline" aria-label="Groma home">
      <svg
        viewBox="0 0 36 36"
        aria-hidden="true"
        className="size-8 shrink-0 rounded-full ring-1 ring-[var(--line)] sm:size-9"
      >
        <circle cx="18" cy="18" r="17" fill="#E6CA98" stroke="#B89260" strokeWidth="1" />
        <path d="M18 28V13" fill="none" stroke="#0F4C5C" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 13h20" fill="none" stroke="#0F4C5C" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 13v8M28 13v8" fill="none" stroke="#0F4C5C" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="22.4" r="1.5" fill="#0F4C5C" />
        <circle cx="28" cy="22.4" r="1.5" fill="#0F4C5C" />
        <circle cx="18" cy="13" r="1.6" fill="#0F4C5C" />
      </svg>
      {!compact && (
        <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)] sm:text-2xl">
          Groma
        </span>
      )}
    </Link>
  );
}
