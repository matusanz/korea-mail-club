import Link from "next/link";
import { contactLinks, siteConfig } from "@/shared/config/site";
import { Wordmark } from "./Wordmark";

/** Social and contact links appear only when configured (.env.example) — never placeholders. */
export function SiteFooter() {
  const links = [
    contactLinks.instagram && { href: contactLinks.instagram, label: "Instagram", external: true },
    contactLinks.facebook && { href: contactLinks.facebook, label: "Facebook", external: true },
    contactLinks.email && { href: `mailto:${contactLinks.email}`, label: "Email", external: false },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  const linkClass = "text-slate transition-colors hover:text-ink";

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <Wordmark className="text-[0.85rem]" />
          <p className="text-sm text-slate">{siteConfig.tagline}.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={linkClass}>
              {l.label}
            </a>
          ))}
          <Link href="/privacy/" className={linkClass}>
            Privacy Policy
          </Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-line px-5 py-6 text-xs text-slate sm:flex-row sm:justify-between sm:px-8">
        <p>Made in South Korea, shared with the world.</p>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
