/**
 * Smoke test of the static export in out/ (run after `npm run build`): required files exist,
 * the postcard registration section embeds the Tally form, no retired integration slipped in,
 * and no placeholder text or empty links are published.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "out");
const failures: string[] = [];
const read = (p: string) => readFileSync(join(out, p), "utf8");

for (const f of ["index.html", "404.html", "privacy/index.html", "robots.txt", "sitemap.xml", "opengraph-image"]) {
  if (!existsSync(join(out, f))) failures.push(`missing out/${f}`);
}
if (existsSync(join(out, "welcome"))) failures.push("retired /welcome/ page is still exported");

if (!failures.length) {
  const home = read("index.html");
  for (const id of ['id="story"', 'id="postcards"', 'id="join"']) if (!home.includes(id)) failures.push(`home lacks ${id}`);
  if (!home.includes("A little piece of Korea")) failures.push("home lacks the hero headline");
  if (!home.includes("Get a postcard from Korea.")) failures.push("home lacks the postcard registration section");
  if (!home.includes('property="og:image"')) failures.push("home lacks og:image");
  if (!/data-tally-src="https:\/\/tally\.so\/embed\/[A-Za-z0-9]+\?/.test(home)) failures.push("Tally registration form is not embedded");
  if (!/src="https:\/\/www\.googletagmanager\.com\/gtm\.js\?id=GTM-[A-Z0-9]+"/.test(home)) failures.push("home lacks the GTM tag");
  if (!read("sitemap.xml").includes("/privacy/")) failures.push("sitemap lacks /privacy/");

  for (const page of ["index.html", "privacy/index.html", "404.html"]) {
    const html = read(page);
    for (const bad of [/lorem ipsum/i, /href="(undefined|null|#)"/, /href="mailto:"/, /TODO/, /href="[^"]*example\.com/, /mailerlite/i]) {
      if (bad.test(html)) failures.push(`${page}: matches ${bad}`);
    }
  }
}

if (failures.length) {
  console.error(`Smoke test failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Smoke test passed: out/ has every page, the registration section and no placeholders.");
