/**
 * Build the web versions of the owner's artwork into public/images/ (JPEG, two widths each).
 *
 *   npm run images -- "/path/to/Mail Club" "/path/to/Downloads"
 *
 * Originals stay outside the repo. `dir` picks the source folder (0 = first argument, 1 = second).
 * Illustrations get their near-white background lifted to pure white (so they sit seamlessly on the
 * white page); photos are only resized. Add new images to `jobs` and to src/features/home/artwork.ts.
 */
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

type Job = {
  file: string;
  dir?: 0 | 1;
  /** Photos: keep their tones (no white-background lift). */
  photo?: boolean;
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
  // Not used on the site now: "Serene Gyeongbokgung Spring Courtyard-4.png" (re-add to use it).
  // Unsplash photos (Unsplash License; credits in src/features/home/artwork.ts).
  { file: "jean-carlo-emer-Ds0_4JCFGfQ-unsplash.jpg", dir: 1, photo: true, name: "bukchon-hanok-street", widths: [540, 800] },
  { file: "bundo-kim--HaW6ZYwpHs-unsplash.jpg", dir: 1, photo: true, name: "seoul-cafe-corner", widths: [700, 1200] },
  { file: "nik-v-9UHTL1aVV-E-unsplash.jpg", dir: 1, photo: true, name: "myeongdong-street", widths: [700, 1200] },
];

const sources = process.argv.slice(2, 4);
if (!sources[0]) {
  console.error('Usage: npm run images -- "/path/to/Mail Club" ["/path/to/Downloads"]');
  process.exit(2);
}
const out = join(process.cwd(), "public/images");
mkdirSync(out, { recursive: true });

// Levels: 0..247 → 0..255, so the paper-white background (≈247–254) becomes pure white.
const gain = 255 / 247;

for (const job of jobs) {
  const dir = sources[job.dir ?? 0];
  if (!dir) {
    console.warn(`skipped ${job.file} (no source folder ${job.dir} given)`);
    continue;
  }
  if (!existsSync(join(dir, job.file))) {
    console.warn(`skipped ${job.file} (not found in ${dir}; existing web versions are kept)`);
    continue;
  }
  for (const w of job.widths) {
    let img = sharp(join(dir, job.file)).rotate().toColourspace("srgb");
    if (job.crop) img = img.extract(job.crop);
    if (!job.photo) img = img.linear(gain, 0);
    const target = join(out, `${job.name}-${w}.jpg`);
    const info = await img
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(target);
    console.log(`${target.replace(process.cwd() + "/", "")}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}

// Brand mark: "Cherry Blossom Sunset Stamp Icon.png" (Downloads), cropped tightly to the stamp (no soft shadow).
const logoDir = sources[1];
if (logoDir && existsSync(join(logoDir, "Cherry Blossom Sunset Stamp Icon.png"))) {
  const stamp = () =>
    sharp(join(logoDir, "Cherry Blossom Sunset Stamp Icon.png")).extract({ left: 285, top: 270, width: 690, height: 690 });
  const outputs: [string, Promise<{ width: number; height: number; size: number }>][] = [
    // Header/footer wordmark and share image.
    ["public/images/logo-stamp-96.png", stamp().resize(96).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("public/images/logo-stamp-96.png")],
    ["public/images/logo-stamp-192.png", stamp().resize(192).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("public/images/logo-stamp-192.png")],
    // Favicon (Next.js app icon convention).
    ["src/app/icon.png", stamp().resize(128).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("src/app/icon.png")],
    // iOS home screen: no transparency (iOS would fill it black), small white margin.
    [
      "src/app/apple-icon.png",
      stamp()
        .resize(150)
        .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#ffffff" })
        .flatten({ background: "#ffffff" })
        .png({ palette: true, quality: 90, compressionLevel: 9 })
        .toFile("src/app/apple-icon.png"),
    ],
  ];
  for (const [path, done] of outputs) {
    const info = await done;
    console.log(`${path}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
