import { Artwork } from "@/shared/components/Artwork";
import { artwork } from "../artwork";

export function Story() {
  const art = artwork.story;
  return (
    <section id="story" aria-labelledby="story-title" className="bg-mist">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[0.85fr_1fr] md:gap-16 lg:py-28">
        <figure className="order-2 md:order-1">
          <div className="mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl shadow-soft md:max-w-none">
            <Artwork scene={art.scene} src={art.src} alt={art.alt} />
          </div>
          <figcaption className="mt-4 text-center text-sm text-slate">A quiet street, somewhere in Seoul.</figcaption>
        </figure>

        <div className="order-1 max-w-xl md:order-2">
          <p className="eyebrow">Our story</p>
          <h2 id="story-title" className="mt-4 text-4xl sm:text-5xl">
            A little story from Korea
          </h2>
          <div className="mt-8 space-y-5 text-slate">
            <p>Living in Korea means discovering something new all the time.</p>
            <p>
              Sometimes it’s a quiet street tucked away in Seoul. Sometimes it’s a little café, an old building, a beautiful
              view, or something ordinary that makes the day memorable.
            </p>
            <p>I wanted to find a simple way to share those moments with people who love Korea as much as I do.</p>
            <p>That’s how Korea Mail Club began.</p>
            <p>
              A small creative project to share the Korea I get to experience, one postcard and little discovery at a time.
            </p>
          </div>
          <p className="mt-9 border-l-[3px] border-peach pl-5 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            Nothing complicated. Just a little something from Korea, shared with love.
          </p>
        </div>
      </div>
    </section>
  );
}
