/**
 * Korea Mail Club images. Illustrations: the owner's artwork (supplied 2026-11-22; originals kept in
 * "Mail Club/" on the owner's Mac). Photos: chosen by the owner from Unsplash (Unsplash License:
 * free to use, no attribution required — credited here anyway). Web versions in public/images/
 * (WebP + JPEG fallback, two or three widths each, `npm run images`).
 * Add new artwork the same way: export two widths, then add an entry here with an accurate alt.
 */
import type { ArtImage } from "@/shared/components/Picture";

const set = (name: string, widths: number[]) => widths.map((w) => ({ w, src: `/images/${name}-${w}.jpg` }));

export const artwork = {
  /** "Sunset Palace Gate Postcard" — tilted postcard on white, cropped to the card. */
  heroPostcard: {
    srcs: set("postcard-gate-sunset", [640, 800, 1008]),
    width: 1008,
    height: 752,
    alt: "Illustrated postcard of Gwanghwamun Gate at sunset, with a golden sun, pink clouds and blue mountains behind the palace roofs",
  },
  /** "Gwanghwamun Gate at Sunset" — portrait poster. */
  gatePoster: {
    srcs: set("gate-sunset-poster", [668, 1081]),
    width: 1081,
    height: 1455,
    alt: "Illustration of Gwanghwamun Gate under a peach sunset sky with a full sun, pink clouds and people crossing the plaza",
  },
  /** "Korean Palace Sunset Stationery Scene" — postcard on an envelope with stamp, blossoms and washi tape. */
  stationery: {
    srcs: set("palace-stationery", [900, 1672]),
    width: 1672,
    height: 941,
    alt: "A Korea Mail Club postcard of a palace gate at sunset resting on a blue envelope, with a cherry blossom stamp, a blossom branch and pink washi tape",
  },
  /** Photo by Jean Carlo Emer on Unsplash (Ds0_4JCFGfQ) — Bukchon Hanok Village with N Seoul Tower. */
  bukchonStreet: {
    srcs: set("bukchon-hanok-street", [540, 800]),
    width: 800,
    height: 1207,
    alt: "A quiet lane between hanok houses with curved tile roofs in Seoul, with N Seoul Tower in the distance",
  },
  /** Photo by Bundo Kim on Unsplash (-HaW6ZYwpHs) — corner café with a Korean sign. */
  cafeCorner: {
    srcs: set("seoul-cafe-corner", [700, 1200]),
    width: 1200,
    height: 714,
    alt: "A small corner café with a wooden door, white tiles and a Korean sign on a quiet Seoul side street",
  },
  /** Photo by Nik V on Unsplash (9UHTL1aVV-E) — Myeongdong underground shopping center entrance. */
  myeongdongStreet: {
    srcs: set("myeongdong-street", [700, 1200]),
    width: 1200,
    height: 800,
    alt: "A Seoul street corner by the Myeongdong underground shopping center entrance, with bicycles, buses and city buildings",
  },
} satisfies Record<string, ArtImage>;
