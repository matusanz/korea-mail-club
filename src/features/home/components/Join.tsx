import { SignupForm } from "./SignupForm";
import { StampMark } from "./Stationery";

export function Join() {
  return (
    <section id="join" aria-labelledby="join-title" className="paper border-y border-line/70">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="relative mx-auto max-w-2xl bg-paper px-6 py-12 shadow-card sm:px-14 sm:py-16">
          {/* airmail edge */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--color-rose) 0 14px, transparent 14px 22px, var(--color-sky) 22px 36px, transparent 36px 44px)",
            }}
          />
          <StampMark className="absolute right-5 top-6 hidden w-14 rotate-6 sm:block" />

          <div className="text-center">
            <p className="eyebrow">Let’s stay in touch</p>
            <h2 id="join-title" className="mt-5 text-4xl sm:text-[3.4rem]">
              A little Korea in your inbox.
            </h2>
            <div className="mx-auto mt-6 max-w-lg space-y-4 text-muted">
              <p>
                Join the Korea Mail Club mailing list for occasional notes from Korea, postcard news, new artwork, and
                little discoveries I want to share.
              </p>
              <p>No spam. Just thoughtful updates from this side of the world.</p>
            </div>
          </div>

          <div className="mt-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
