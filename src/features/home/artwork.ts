/**
 * Image slots for the landing page. Each is an original placeholder illustration until a real
 * file is added: put the image in public/images/ and set `src` (e.g. "/images/palace-postcard.jpg").
 * Use only artwork/photos the owner made or has rights to; write an accurate `alt`.
 */
import type { Scene } from "@/shared/components/Artwork";

type Slot = { scene: Scene; src?: string; alt?: string };

export const artwork = {
  /** The owner's palace postcard illustration (hero + postcard section). */
  palacePostcard: { scene: "palace" } as Slot,
  story: { scene: "street" } as Slot,
  places: { scene: "street" } as Slot,
  seasons: { scene: "seasons" } as Slot,
  culture: { scene: "culture" } as Slot,
  postcards: { scene: "postcards" } as Slot,
};
