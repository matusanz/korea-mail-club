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

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8">
        <Wordmark />
        <p className="font-serif text-lg italic text-muted">{siteConfig.tagline}.</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {l.label}
            </a>
          ))}
          <Link href="/privacy/" className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline">
            Privacy Policy
          </Link>
        </nav>
        <div className="space-y-1 text-xs tracking-wide text-muted">
          <p>Made in South Korea, shared with the world.</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
