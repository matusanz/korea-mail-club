/**
 * Site-wide settings. Every external value comes from build-time env vars (`.env.example`):
 * nothing is invented, and an empty value hides the link instead of showing a placeholder.
 */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

/** Only allow http(s) URLs for public links; anything else is treated as "not configured". */
export function safeUrl(value: string | undefined): string {
  const v = clean(value);
  return /^https?:\/\/[^\s]+$/i.test(v) ? v : "";
}

export function safeEmail(value: string | undefined): string {
  const v = clean(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : "";
}

export const siteConfig = {
  name: "Korea Mail Club",
  tagline: "Sharing little pieces of Korea",
  signature: "From Seoul, with love.",
  description:
    "Postcards, photographs, illustrations and little discoveries from South Korea — shared by someone who lives here. Join the mailing list for occasional notes from Korea.",
  url: (safeUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000").replace(/\/+$/, ""),
  locale: "en",
} as const;

export const contactLinks = {
  instagram: safeUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook: safeUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  email: safeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
} as const;

/** Production builds only: `SITE_INDEXABLE=true` (read at build time). */
export const isIndexable = process.env.SITE_INDEXABLE === "true";
