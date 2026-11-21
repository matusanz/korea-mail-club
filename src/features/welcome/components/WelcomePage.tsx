import Link from "next/link";
import { Postcard } from "@/shared/components/Postcard";
import { Postmark } from "@/shared/components/Stamp";

/**
 * Shown after someone clicks the confirmation link in MailerLite's double opt-in email
 * (MailerLite → form → Double opt-in → "Redirect to URL" = <site>/welcome/). Not linked
 * from the site and not indexed, so it only appears after a real confirmation.
 */
export function WelcomePage() {
  return (
    <section aria-labelledby="welcome-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div className="rise text-center lg:text-left">
          <p className="eyebrow">You’re confirmed</p>
          <h1 id="welcome-title" className="mt-5 text-5xl sm:text-6xl">
            Welcome to Korea Mail Club!
          </h1>
          <p className="mt-7 text-lg text-muted">
            I’m glad you’re here. I’ll share little discoveries, postcards, and updates from Korea whenever there’s
            something worth sending.
          </p>
          <p className="mt-8 font-serif text-2xl italic text-terracotta-ink">From Seoul, with love.</p>
          <Link href="/" className="btn btn-ghost mt-10">
            Back to Korea Mail Club
          </Link>
        </div>
        <div className="rise rise-delay relative mx-auto w-full max-w-md">
          <Postcard scene="palace" tilt={-2} />
          <Postmark className="absolute -bottom-6 right-0 w-40 text-muted/60" />
        </div>
      </div>
    </section>
  );
}
