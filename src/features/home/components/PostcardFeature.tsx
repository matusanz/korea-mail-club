import { Artwork } from "@/shared/components/Artwork";
import { Postcard } from "@/shared/components/Postcard";
import { Postmark } from "@/shared/components/Stamp";
import { artwork } from "../artwork";
import { Envelope, StampMark } from "./Stationery";

export function PostcardFeature() {
  const art = artwork.palacePostcard;
  return (
    <section id="postcards" aria-labelledby="postcards-title">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-28">
        <div className="relative mx-auto w-full max-w-[36rem]">
          <Envelope className="absolute inset-x-[-2%] bottom-[-6%] top-[22%] rotate-2" />
          <Postcard scene={art.scene} src={art.src} alt={art.alt} tilt={-2.5} className="relative" />
          <StampMark className="absolute -right-1 top-[30%] w-[16%] -rotate-3" />
          {/* close-up detail of the same artwork */}
          <figure className="absolute -bottom-10 -left-2 w-[34%] sm:-left-6">
            <div className="aspect-square overflow-hidden rounded-full border-[6px] border-paper bg-cream shadow-card">
              <div className="h-full w-full origin-[52%_42%] scale-[2.4]">
                <Artwork scene={art.scene} src={art.src} alt="" />
              </div>
            </div>
            <figcaption className="sr-only">Close-up of the postcard’s roof details</figcaption>
          </figure>
        </div>

        <div className="max-w-xl pt-8 lg:pt-0">
          <p className="eyebrow text-terracotta-ink">Made with love in Korea</p>
          <h2 id="postcards-title" className="mt-5 text-4xl sm:text-5xl">
            A postcard from Korea
          </h2>
          <div className="mt-8 space-y-5 text-muted">
            <p>There’s something special about receiving real mail.</p>
            <p>
              A small piece of paper that’s traveled across the world, carrying a place, a memory, or a little moment from
              somewhere far away.
            </p>
            <p>
              I love the idea of turning some of my favorite discoveries in Korea into postcards that people can actually
              hold, collect, or send to someone else.
            </p>
          </div>
          <p className="mt-8 font-serif text-xl leading-snug text-ink">
            Korea Mail Club is where I’ll share these ideas, the artwork behind them, and the postcards I create along the
            way.
          </p>
          <Postmark className="mt-8 w-44 text-rose" text="MADE WITH LOVE · IN KOREA ·" />
        </div>
      </div>
    </section>
  );
}
