import { contactLinks, siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";

/**
 * /llms.txt (https://llmstxt.org): a plain-text summary of the site for AI assistants and crawlers.
 * Built from the owner-approved config only — no new copy. Keep the page list in sync with sitemap.ts.
 */
export function GET() {
  const { url } = siteConfig;
  const contact = [
    contactLinks.email && `- Email: ${contactLinks.email}`,
    contactLinks.instagram && `- [Instagram](${contactLinks.instagram})`,
    contactLinks.facebook && `- [Facebook](${contactLinks.facebook})`,
  ].filter(Boolean);

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.tagline}. ${siteConfig.signature}`,
    "",
    "## Pages",
    "",
    `- [Home](${url}/): what Korea Mail Club is, the story behind it, and the postcard registration form.`,
    `- [Privacy notice](${url}/privacy/): what the registration form collects and how those details are handled.`,
    ...(contact.length ? ["", "## Contact", "", ...contact] : []),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
