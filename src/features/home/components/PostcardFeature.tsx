import { Picture } from "@/shared/components/Picture";
import { artwork } from "../artwork";

export function PostcardFeature() {
  return (
    <section id="postcards" aria-labelledby="postcards-title" className="bg-mist">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
        <div className="relative mx-auto w-full max-w-[40rem]">
          <Picture
            image={artwork.stationery}
            sizes="(min-width: 1024px) 620px, 100vw"
            className="h-auto w-full rounded-2xl mix-blend-multiply"
          />
          {/* close-up of the postcard's roof details */}
          <figure className="absolute -bottom-8 right-2 w-[28%] sm:right-6">
            <div className="aspect-square overflow-hidden rounded-full border-[5px] border-white bg-white shadow-card">
              <Picture
                image={artwork.heroPostcard}
                sizes="200px"
                decorative
                className="h-full w-full object-cover"
                style={{ objectPosition: "48% 40%", scale: "2.6", transformOrigin: "48% 40%" }}
              />
            </div>
            <figcaption className="sr-only">Close-up of the postcard’s painted roof details</figcaption>
          </figure>
        </div>

        <div className="max-w-xl pt-6 lg:pt-0">
          <p className="eyebrow text-accent">Made with love in Korea</p>
          <h2 id="postcards-title" className="mt-4 text-4xl sm:text-5xl">
            A postcard from Korea
          </h2>
          <div className="mt-8 space-y-5 text-slate">
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
          <p className="mt-8 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
            Korea Mail Club is where I’ll share these ideas, the artwork behind them, and the postcards I create along the
            way.
          </p>
        </div>
      </div>
    </section>
  );
}
