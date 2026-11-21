import { Picture } from "@/shared/components/Picture";
import { artwork } from "../artwork";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-28 lg:pt-20">
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

        <div className="rise rise-delay mx-auto w-full max-w-[38rem]">
          <Picture
            image={artwork.heroPostcard}
            sizes="(min-width: 1024px) 600px, (min-width: 640px) 80vw, 100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
