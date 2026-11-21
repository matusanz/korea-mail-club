/**
 * Site-wide settings. Public values confirmed by the owner (2026-11-22) are the defaults; a build-time
 * env var (`.env.example`) overrides them. Nothing is invented: an empty value hides the link.
 */

/** Owner-confirmed public values (2026-11-22). */
const confirmed = {
  url: "https://www.koreamailclub.com",
  instagram: "https://www.instagram.com/koreamailclub",
  facebook: "https://www.facebook.com/profile.php?id=61596515290347",
  email: "info@koreamailclub.com",
  /**
   * Public postcard-registration Tally form "A little piece of Korea, delivered to you." (owner, 2026-11-22).
   * It collects name, email and full postal address from every registrant (owner's decision).
   */
  tallyRegistrationFormId: "4aKrAB",
};

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
    "Postcards, photographs, illustrations and little discoveries from South Korea — shared by someone who lives here. Register for free to get a postcard from Korea.",
  url: (safeUrl(process.env.NEXT_PUBLIC_SITE_URL) || confirmed.url).replace(/\/+$/, ""),
  locale: "en",
} as const;

export const contactLinks = {
  instagram: safeUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL || confirmed.instagram),
  facebook: safeUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL || confirmed.facebook),
  email: safeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL || confirmed.email),
} as const;

/** Production builds only: `SITE_INDEXABLE=true` (read at build time). */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

/** Tally form IDs are short alphanumeric codes; anything else counts as "not configured". */
export function safeTallyId(value: string | undefined): string {
  const v = clean(value);
  return /^[A-Za-z0-9]{3,20}$/.test(v) ? v : "";
}

export const tallyConfig = {
  registrationFormId: safeTallyId(process.env.NEXT_PUBLIC_TALLY_FORM_ID || confirmed.tallyRegistrationFormId),
} as const;
