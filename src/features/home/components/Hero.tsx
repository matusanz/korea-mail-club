import { Postcard } from "@/shared/components/Postcard";
import { artwork } from "../artwork";
import { StampMark } from "./Stationery";

export function Hero() {
  const art = artwork.palacePostcard;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="rise max-w-xl">
          <p className="eyebrow">Postcards &amp; little discoveries from South Korea</p>
          <h1 id="hero-title" className="mt-5 text-[2.6rem] sm:text-6xl lg:text-[4.1rem]">
            A little piece of Korea, <span className="text-slate">from me to you.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[1.05rem] text-slate sm:text-lg">
            I live in South Korea, and I started Korea Mail Club to share the places, little discoveries, and everyday
            moments I love about being here. Through postcards, photos, and occasional notes, I hope to bring a bit of
            Korea into your day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#join" className="btn btn-primary">
              Join the Mail Club
            </a>
            <a href="#story" className="btn btn-ghost">
              Discover Our Story
            </a>
          </div>
          <p className="mt-10 flex items-center gap-3 text-sm font-medium text-slate">
            <span className="h-0.5 w-8 rounded-full bg-peach" aria-hidden="true" />
            From Seoul, with love.
          </p>
        </div>

        <div className="rise rise-delay relative mx-auto w-full max-w-[34rem] py-4">
          <span aria-hidden="true" className="absolute -right-10 -top-6 h-40 w-40 rounded-full bg-sun/40 blur-2xl" />
          <span aria-hidden="true" className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-pink/35 blur-2xl" />
          <Postcard scene={art.scene} src={art.src} alt={art.alt} tilt={2} priority className="relative hover:rotate-0" />
          <StampMark className="absolute -right-2 -top-2 w-[17%] rotate-6 sm:-right-4" />
        </div>
      </div>
    </section>
  );
}
