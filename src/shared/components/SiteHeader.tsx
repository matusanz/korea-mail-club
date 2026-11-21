import Link from "next/link";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/#story", label: "Our Story" },
  { href: "/#postcards", label: "Postcards" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ivory/90 backdrop-blur supports-[backdrop-filter]:bg-ivory/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark className="text-[0.85rem] sm:text-[1rem]" />
        <nav aria-label="Main" className="flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hidden text-muted transition-colors hover:text-ink md:inline">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="rounded-full border border-ink/80 px-4 py-1.5 text-[0.8rem] font-medium tracking-wide transition-colors hover:bg-ink hover:text-ivory"
          >
            Join the Club
          </Link>
        </nav>
      </div>
    </header>
  );
}
