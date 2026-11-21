import { Artwork } from "@/shared/components/Artwork";
import { Postcard } from "@/shared/components/Postcard";
import { artwork } from "../artwork";
import { StampMark } from "./Stationery";

export function PostcardFeature() {
  const art = artwork.palacePostcard;
  return (
    <section id="postcards" aria-labelledby="postcards-title" className="bg-mist">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-28">
        <div className="relative mx-auto w-full max-w-[36rem]">
          {/* back of the postcard, peeking out behind */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-4 rotate-3 rounded-[3px] bg-white shadow-soft">
            <div className="absolute bottom-[12%] left-1/2 top-[12%] w-px bg-line" />
            <div className="absolute right-[6%] top-[10%] h-[22%] w-[13%] rounded-sm border border-dashed border-line" />
            {[52, 64, 76].map((t) => (
              <div key={t} className="absolute left-[56%] right-[8%] h-px bg-line" style={{ top: `${t}%` }} />
            ))}
          </div>
          <Postcard scene={art.scene} src={art.src} alt={art.alt} tilt={-2.5} className="relative" />
          <StampMark className="absolute -right-2 top-[28%] w-[15%] -rotate-3" />
          {/* close-up detail of the same artwork */}
          <figure className="absolute -bottom-10 -left-2 w-[32%] sm:-left-6">
            <div className="aspect-square overflow-hidden rounded-full border-[5px] border-white bg-mist shadow-card">
              <div className="h-full w-full origin-[52%_42%] scale-[2.4]">
                <Artwork scene={art.scene} src={art.src} alt="" />
              </div>
            </div>
            <figcaption className="sr-only">Close-up of the postcard’s roof details</figcaption>
          </figure>
        </div>

        <div className="max-w-xl pt-8 lg:pt-0">
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
