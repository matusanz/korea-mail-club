import { Picture, type ArtImage } from "@/shared/components/Picture";
import { artwork } from "../artwork";

/** Each theme shows a different crop of the artwork (zoom + focal point). */
type Theme = { n: string; title: string; text: string; image: ArtImage; zoom: number; focus: string; alt: string };

const themes: Theme[] = [
  {
    n: "01",
    title: "Places & Streets",
    text: "Quiet neighborhoods, busy city streets, hidden corners, and places worth remembering.",
    image: artwork.gatePoster,
    zoom: 1.7,
    focus: "50% 74%",
    alt: "Detail: people walking across the plaza in front of the palace gate",
  },
  {
    n: "02",
    title: "Seasons & Moments",
    text: "Cherry blossoms in spring, golden autumn leaves, snowy mornings, and everything in between.",
    image: artwork.springCourtyard,
    zoom: 1.8,
    focus: "12% 14%",
    alt: "Detail: cherry blossom branches and falling petals against a pastel sky",
  },
  {
    n: "03",
    title: "Culture & Everyday Life",
    text: "Traditional details, favorite cafés, little discoveries, and the everyday things that make Korea special.",
    image: artwork.springCourtyard,
    zoom: 2.6,
    focus: "50% 56%",
    alt: "Detail: painted dancheong beams and tiled eaves of the palace roof",
  },
  {
    n: "04",
    title: "Postcards & Art",
    text: "Small pieces of Korea, captured through photographs, illustrations, and postcards.",
    image: artwork.stationery,
    zoom: 1.5,
    focus: "18% 75%",
    alt: "Detail: a cherry blossom postage stamp beside the Korea Mail Club postcard",
  },
];

export function Pieces() {
  return (
    <section aria-labelledby="pieces-title">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">What I hope to share</p>
          <h2 id="pieces-title" className="mt-4 text-4xl sm:text-5xl">
            Little pieces of Korea
          </h2>
          <p className="mt-5 text-slate">There’s so much to love about Korea. Here are some of the little things I hope to share.</p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {themes.map((t) => (
            <li key={t.n}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-mist sm:aspect-[4/5]">
                  <Picture
                    image={{ ...t.image, alt: t.alt }}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    style={{ objectPosition: t.focus, scale: String(t.zoom), transformOrigin: t.focus }}
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent">{t.n}</p>
                  <h3 className="mt-1.5 text-xl">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">{t.text}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
