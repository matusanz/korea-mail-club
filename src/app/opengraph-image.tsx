import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";
export const alt = "Korea Mail Club — Sharing little pieces of Korea. A postcard of a Korean palace gate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share preview (Instagram/Facebook/WhatsApp): brand name, tagline and the palace postcard. */
export default async function OpenGraphImage() {
  const serif = await readFile(join(process.cwd(), "src/shared/assets/CormorantGaramond-Medium-latin.ttf"));
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FAF7F2", padding: 64, fontFamily: "Cormorant" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 520 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#6E645C" }}>FROM SEOUL, WITH LOVE</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#332D29", marginTop: 28, letterSpacing: 4 }}>KOREA MAIL CLUB</div>
          <div style={{ width: 80, height: 2, background: "#D7A39C", marginTop: 36 }} />
          <div style={{ fontSize: 40, color: "#9A5A4C", marginTop: 32, fontStyle: "italic" }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              background: "#FFFFFF",
              padding: 18,
              transform: "rotate(3deg)",
              boxShadow: "0 24px 48px -18px rgba(51,45,41,0.35)",
            }}
          >
            <img width={500} height={350} alt="" src={`data:image/svg+xml;utf8,${encodeURIComponent(palaceSvg)}`} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant", data: serif, style: "normal", weight: 500 }] },
  );
}

/** Simplified copy of the palace placeholder; replace with the real postcard artwork when available. */
const palaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><rect width="600" height="420" fill="#F6ECE3"/><circle cx="468" cy="92" r="40" fill="#EECBC3"/><path d="M0 236 C70 196 130 176 210 204 C280 150 370 120 452 168 C512 146 560 160 600 178 V420 H0Z" fill="#CBD6DE"/><path d="M0 270 C90 236 170 232 250 252 C330 226 430 222 600 248 V420 H0Z" fill="#B4C4CF"/><rect y="330" width="600" height="90" fill="#EDE2D4"/><rect x="150" y="292" width="300" height="44" fill="#E4D8C8"/><path d="M190 336 V314 a18 18 0 0 1 36 0 V336Z M282 336 V308 a18 18 0 0 1 36 0 V336Z M374 336 V314 a18 18 0 0 1 36 0 V336Z" fill="#BCAA98"/><rect x="166" y="244" width="268" height="48" fill="#EFE4D6"/><g fill="#B87567"><rect x="174" y="244" width="8" height="48"/><rect x="222" y="244" width="8" height="48"/><rect x="270" y="244" width="8" height="48"/><rect x="318" y="244" width="8" height="48"/><rect x="366" y="244" width="8" height="48"/><rect x="414" y="244" width="8" height="48"/></g><rect x="160" y="236" width="280" height="10" fill="#9DB3AE"/><path d="M104 226 Q200 250 300 250 Q400 250 496 226 L452 200 H148Z" fill="#5E5752"/><rect x="200" y="170" width="200" height="32" fill="#EFE4D6"/><rect x="194" y="164" width="212" height="8" fill="#9DB3AE"/><path d="M140 160 Q220 182 300 182 Q380 182 460 160 L410 128 H190Z" fill="#5E5752"/><path d="M182 128 Q300 120 418 128" stroke="#45403C" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M72 336 C76 300 70 270 80 240" stroke="#8C7564" stroke-width="7" fill="none"/><ellipse cx="62" cy="252" rx="34" ry="13" fill="#8FA596"/><ellipse cx="96" cy="230" rx="30" ry="11" fill="#9DB2A3"/><ellipse cx="70" cy="212" rx="24" ry="9" fill="#8FA596"/></svg>`;
