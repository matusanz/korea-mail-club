import Link from "next/link";

/** Brand: the cherry blossom stamp + "KOREA MAIL CLUB" in spaced uppercase sans. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-display font-bold uppercase tracking-[0.18em] text-ink ${className}`}>
      <picture className="shrink-0">
        <source type="image/webp" srcSet="/images/logo-stamp-64.webp 2x, /images/logo-stamp-96.webp 3x" />
        <img src="/images/logo-stamp-96.png" alt="" width={96} height={96} className="block h-8 w-8" />
      </picture>
      Korea Mail Club
    </Link>
  );
}
