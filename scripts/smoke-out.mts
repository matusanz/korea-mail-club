/**
 * Smoke test of the static export in out/ (run after `npm run build`): required files exist,
 * the welcome page is never indexable, and no placeholder/fabricated text slipped in.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "out");
const failures: string[] = [];
const read = (p: string) => readFileSync(join(out, p), "utf8");

for (const f of ["index.html", "404.html", "privacy/index.html", "welcome/index.html", "robots.txt", "sitemap.xml", "opengraph-image"]) {
  if (!existsSync(join(out, f))) failures.push(`missing out/${f}`);
}

if (!failures.length) {
  const home = read("index.html");
  for (const id of ['id="story"', 'id="postcards"', 'id="join"']) if (!home.includes(id)) failures.push(`home lacks ${id}`);
  if (!home.includes("A little piece of Korea")) failures.push("home lacks the hero headline");
  if (!home.includes('property="og:image"')) failures.push("home lacks og:image");
  if (!/name="robots" content="[^"]*noindex/.test(read("welcome/index.html"))) failures.push("welcome page must be noindex");
  if (!read("sitemap.xml").includes("/privacy/") || read("sitemap.xml").includes("/welcome/")) failures.push("sitemap content");

  for (const page of ["index.html", "privacy/index.html", "welcome/index.html", "404.html"]) {
    const html = read(page);
    for (const bad of [/lorem ipsum/i, /href="(undefined|null|#)"/, /href="mailto:"/, /TODO/, /href="[^"]*example\.com/]) {
      if (bad.test(html)) failures.push(`${page}: matches ${bad}`);
    }
  }
}

if (failures.length) {
  console.error(`Smoke test failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Smoke test passed: out/ has every page, metadata and no placeholders.");
