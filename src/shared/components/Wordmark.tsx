import Link from "next/link";

/** "KOREA MAIL CLUB" in spaced uppercase serif — the brand's wordmark. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-serif text-[1.05rem] font-semibold uppercase tracking-[0.24em] text-ink ${className}`}>
      Korea Mail Club
    </Link>
  );
}
