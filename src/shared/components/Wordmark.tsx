import Link from "next/link";

/** "KOREA MAIL CLUB" wordmark: spaced uppercase sans with a small sun mark. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-display font-bold uppercase tracking-[0.18em] text-ink ${className}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-peach ring-[3px] ring-sun/70" />
      Korea Mail Club
    </Link>
  );
}
