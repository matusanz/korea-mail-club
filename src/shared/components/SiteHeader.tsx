import Link from "next/link";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/#story", label: "Our Story" },
  { href: "/#postcards", label: "Postcards" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark className="text-[0.8rem] sm:text-[0.9rem]" />
        <nav aria-label="Main" className="flex items-center gap-7 text-sm font-medium">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hidden text-slate transition-colors hover:text-ink md:inline">
              {item.label}
            </Link>
          ))}
          <Link href="/#join" className="rounded-lg bg-ink px-4 py-2 text-[0.8rem] font-semibold text-white transition-colors hover:bg-[#2e3650]">
            Get a Free Postcard
          </Link>
        </nav>
      </div>
    </header>
  );
}
