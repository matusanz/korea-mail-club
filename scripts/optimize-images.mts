/**
 * Build the web versions of the owner's artwork into public/images/ (JPEG, two widths each).
 *
 *   npm run images -- "/path/to/Mail Club"
 *
 * Originals stay outside the repo. Each image is optionally cropped, its near-white background is
 * lifted to pure white (so it sits seamlessly on the white page), then resized. Add new artwork to
 * `jobs` and to src/features/home/artwork.ts.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

type Job = {
  file: string;
  name: string;
  widths: number[];
  crop?: { left: number; top: number; width: number; height: number };
};

const jobs: Job[] = [
  {
    file: "Sunset Palace Gate Postcard-1.png",
    name: "postcard-gate-sunset",
    widths: [640, 1008],
    crop: { left: 600, top: 70, width: 1072, height: 800 },
  },
  { file: "Gwanghwamun Gate at Sunset-3.png", name: "gate-sunset-poster", widths: [668, 1081] },
  { file: "Korean Palace Sunset Stationery Scene-2.png", name: "palace-stationery", widths: [900, 1672] },
  { file: "Serene Gyeongbokgung Spring Courtyard-4.png", name: "spring-courtyard", widths: [700, 1254] },
];

const source = process.argv[2];
if (!source) {
  console.error('Usage: npm run images -- "/path/to/Mail Club"');
  process.exit(2);
}
const out = join(process.cwd(), "public/images");
mkdirSync(out, { recursive: true });

// Levels: 0..247 → 0..255, so the paper-white background (≈247–254) becomes pure white.
const gain = 255 / 247;

for (const job of jobs) {
  for (const w of job.widths) {
    let img = sharp(join(source, job.file)).toColourspace("srgb");
    if (job.crop) img = img.extract(job.crop);
    const target = join(out, `${job.name}-${w}.jpg`);
    const info = await img
      .linear(gain, 0)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(target);
    console.log(`${target.replace(process.cwd() + "/", "")}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
