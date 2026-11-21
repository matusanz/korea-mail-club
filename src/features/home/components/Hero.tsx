import { Postcard } from "@/shared/components/Postcard";
import { Postmark } from "@/shared/components/Stamp";
import { artwork } from "../artwork";
import { Envelope, StampMark } from "./Stationery";

export function Hero() {
  const art = artwork.palacePostcard;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="rise max-w-xl">
          <p className="eyebrow">Postcards &amp; little discoveries from South Korea</p>
          <h1 id="hero-title" className="mt-6 text-[2.75rem] sm:text-6xl lg:text-[4.6rem]">
            A little piece of Korea, <em className="font-normal italic text-terracotta-ink">from me to you.</em>
          </h1>
          <p className="mt-7 max-w-lg text-[1.05rem] text-muted sm:text-lg">
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
          <p className="mt-10 flex items-center gap-3 font-serif text-lg italic text-muted">
            <span className="h-px w-10 bg-rose" aria-hidden="true" />
            From Seoul, with love.
          </p>
        </div>

        <div className="rise rise-delay relative mx-auto w-full max-w-[34rem] py-6 lg:py-10">
          <Envelope className="absolute inset-x-[6%] bottom-0 top-[18%] -rotate-3" />
          <Postcard
            scene={art.scene}
            src={art.src}
            alt={art.alt}
            tilt={2}
            priority
            className="relative hover:rotate-0"
          />
          <StampMark className="absolute -right-2 -top-1 w-[19%] rotate-6 sm:-right-4" />
          <Postmark className="pointer-events-none absolute -bottom-2 left-[2%] w-[42%] text-muted/60" />
        </div>
      </div>
    </section>
  );
}
