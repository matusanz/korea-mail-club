import Link from "next/link";

/** Brand: the cherry blossom stamp + "KOREA MAIL CLUB" in spaced uppercase sans. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-display font-bold uppercase tracking-[0.18em] text-ink ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized file */}
      <img src="/images/logo-stamp-96.png" alt="" width={96} height={96} className="h-8 w-8 shrink-0" />
      Korea Mail Club
    </Link>
  );
}
