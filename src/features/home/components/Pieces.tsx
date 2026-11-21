import { Artwork } from "@/shared/components/Artwork";
import { artwork } from "../artwork";

const themes = [
  {
    n: "01",
    title: "Places & Streets",
    text: "Quiet neighborhoods, busy city streets, hidden corners, and places worth remembering.",
    art: artwork.places,
  },
  {
    n: "02",
    title: "Seasons & Moments",
    text: "Cherry blossoms in spring, golden autumn leaves, snowy mornings, and everything in between.",
    art: artwork.seasons,
  },
  {
    n: "03",
    title: "Culture & Everyday Life",
    text: "Traditional details, favorite cafés, little discoveries, and the everyday things that make Korea special.",
    art: artwork.culture,
  },
  {
    n: "04",
    title: "Postcards & Art",
    text: "Small pieces of Korea, captured through photographs, illustrations, and postcards.",
    art: artwork.postcards,
  },
];

export function Pieces() {
  return (
    <section aria-labelledby="pieces-title" className="paper border-y border-line/70">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What I hope to share</p>
          <h2 id="pieces-title" className="mt-5 text-4xl sm:text-5xl">
            Little pieces of Korea
          </h2>
          <p className="mt-5 text-muted">
            There’s so much to love about Korea. Here are some of the little things I hope to share.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {themes.map((t) => (
            <li key={t.n}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden bg-paper p-2.5 shadow-soft transition-transform duration-500 hover:-translate-y-1 sm:aspect-[4/5]">
                  <Artwork scene={t.art.scene} src={t.art.src} alt={t.art.alt} />
                </div>
                <figcaption className="mt-5">
                  <p className="font-serif text-sm italic text-terracotta-ink">{t.n}</p>
                  <h3 className="mt-1 text-2xl">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.text}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
