/**
 * The owner's Korea Mail Club artwork (supplied 2026-11-22; originals kept outside the repo in
 * "Mail Club/" on the owner's Mac). Web versions in public/images/ (JPEG, two widths each).
 * Add new artwork the same way: export two widths, then add an entry here with an accurate alt.
 */
import type { ArtImage } from "@/shared/components/Picture";

const set = (name: string, widths: number[]) => widths.map((w) => ({ w, src: `/images/${name}-${w}.jpg` }));

export const artwork = {
  /** "Sunset Palace Gate Postcard" — tilted postcard on white, cropped to the card. */
  heroPostcard: {
    srcs: set("postcard-gate-sunset", [640, 1008]),
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
  /** "Serene Gyeongbokgung Spring Courtyard" — square, cherry blossoms. */
  springCourtyard: {
    srcs: set("spring-courtyard", [700, 1254]),
    width: 1254,
    height: 1254,
    alt: "Illustration of a palace gate in spring, framed by cherry blossom branches with petals drifting across a pastel sky",
  },
} satisfies Record<string, ArtImage>;
