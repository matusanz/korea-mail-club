import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";
export const alt = "Korea Mail Club — Sharing little pieces of Korea. A pastel postcard of a Korean palace gate at sunset.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share preview (Instagram/Facebook/WhatsApp): brand name, tagline and the palace postcard. */
export default async function OpenGraphImage() {
  const manrope = await readFile(join(process.cwd(), "src/shared/assets/Manrope-SemiBold-latin.ttf"));
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FFFFFF", padding: 72, fontFamily: "Manrope" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 500 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E7B89C", border: "4px solid #F3DB95" }} />
            <div style={{ fontSize: 20, letterSpacing: 4, color: "#697190", marginLeft: 14 }}>FROM SEOUL, WITH LOVE</div>
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.02, color: "#1D2335", marginTop: 30, letterSpacing: -1 }}>Korea Mail Club</div>
          <div style={{ fontSize: 34, color: "#697190", marginTop: 26, lineHeight: 1.3 }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: 20, right: 10, width: 260, height: 260, borderRadius: 130, background: "rgba(243,219,149,0.45)" }} />
          <div
            style={{
              display: "flex",
              background: "#FFFFFF",
              padding: 18,
              transform: "rotate(3deg)",
              boxShadow: "0 28px 56px -20px rgba(29,35,53,0.35)",
            }}
          >
            <img width={500} height={350} alt="" src={`data:image/svg+xml;utf8,${encodeURIComponent(palaceSvg)}`} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: manrope, style: "normal", weight: 600 }] },
  );
}

/** Copy of the palace placeholder (src/shared/components/Artwork.tsx); replace with the real postcard artwork. */
const palaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBEAE4"/><stop offset="0.6" stop-color="#F6DCD3"/><stop offset="1" stop-color="#E7B89C"/></linearGradient></defs><rect width="600" height="340" fill="url(#s)"/><circle cx="456" cy="128" r="64" fill="#F3DB95" opacity="0.25"/><circle cx="456" cy="128" r="46" fill="#F3DB95"/><path d="M0 236 C70 192 130 172 210 200 C280 146 370 118 452 166 C512 144 560 156 600 172 V420 H0Z" fill="#B7BCD0"/><path d="M0 272 C90 236 170 230 250 250 C330 222 430 218 600 244 V420 H0Z" fill="#8D94AE"/><rect y="330" width="600" height="90" fill="#F4E2D9"/><rect x="150" y="292" width="300" height="44" fill="#FFFFFF"/><path d="M190 336 V314 a18 18 0 0 1 36 0 V336Z M282 336 V308 a18 18 0 0 1 36 0 V336Z M374 336 V314 a18 18 0 0 1 36 0 V336Z" fill="#697190"/><rect x="166" y="244" width="268" height="48" fill="#FFF5F0"/><g fill="#D98F74"><rect x="174" y="244" width="8" height="48"/><rect x="222" y="244" width="8" height="48"/><rect x="270" y="244" width="8" height="48"/><rect x="318" y="244" width="8" height="48"/><rect x="366" y="244" width="8" height="48"/><rect x="414" y="244" width="8" height="48"/></g><rect x="160" y="236" width="280" height="10" fill="#697190"/><path d="M104 226 Q200 250 300 250 Q400 250 496 226 L452 200 H148Z" fill="#2B3149"/><rect x="200" y="170" width="200" height="32" fill="#FFF5F0"/><g fill="#D98F74"><rect x="211" y="170" width="6" height="32"/><rect x="259" y="170" width="6" height="32"/><rect x="297" y="170" width="6" height="32"/><rect x="335" y="170" width="6" height="32"/><rect x="383" y="170" width="6" height="32"/></g><rect x="194" y="164" width="212" height="8" fill="#697190"/><path d="M140 160 Q220 182 300 182 Q380 182 460 160 L410 128 H190Z" fill="#2B3149"/><path d="M182 128 Q300 120 418 128" stroke="#1D2335" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M72 336 C76 300 70 270 80 240" stroke="#2B3149" stroke-width="6" fill="none"/><ellipse cx="62" cy="252" rx="34" ry="12" fill="#697190"/><ellipse cx="96" cy="230" rx="30" ry="10" fill="#8D94AE"/><ellipse cx="70" cy="212" rx="24" ry="8" fill="#697190"/></svg>`;
