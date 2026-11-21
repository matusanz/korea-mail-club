import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";
export const alt =
  "Korea Mail Club — Sharing little pieces of Korea. An illustrated postcard of Gwanghwamun Gate at sunset.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share preview (Instagram/Facebook/WhatsApp): brand name, tagline and the owner's palace postcard. */
export default async function OpenGraphImage() {
  const root = process.cwd();
  const [manrope, postcard] = await Promise.all([
    readFile(join(root, "src/shared/assets/Manrope-SemiBold-latin.ttf")),
    readFile(join(root, "public/images/postcard-gate-sunset-1008.jpg")),
  ]);
  const postcardSrc = `data:image/jpeg;base64,${postcard.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FFFFFF", fontFamily: "Manrope" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 470, paddingLeft: 72 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: "#E7B89C" }} />
            <div style={{ fontSize: 19, letterSpacing: 4, color: "#697190", marginLeft: 14 }}>FROM SEOUL, WITH LOVE</div>
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.02, color: "#1D2335", marginTop: 28, letterSpacing: -1 }}>Korea Mail Club</div>
          <div style={{ fontSize: 32, color: "#697190", marginTop: 24, lineHeight: 1.3 }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <img width={700} height={522} alt="" src={postcardSrc} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: manrope, style: "normal", weight: 600 }] },
  );
}
