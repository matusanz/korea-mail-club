import Link from "next/link";
import { contactLinks, tallyConfig } from "@/shared/config/site";
import { TallyForm } from "./TallyForm";

/**
 * Postcard registration (docs/forms/README.md): public Tally form `4aKrAB` (name, email, postal
 * address, delivery consent, optional updates) → private Google Sheet.
 */
export function Join() {
  const formId = tallyConfig.registrationFormId;
  return (
    <section id="join" aria-labelledby="join-title">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white px-6 py-12 shadow-card sm:px-14 sm:py-16">

          <div className="relative text-center">
            <p className="eyebrow">Free to register</p>
            <h2 id="join-title" className="mt-4 text-4xl sm:text-5xl">
              Get a postcard from Korea.
            </h2>
            <div className="mx-auto mt-6 max-w-lg space-y-4 text-slate">
              <p>
                I’d love to send some of my postcards to people around the world. Share your name, email and mailing
                address to register for a real postcard from South Korea.
              </p>
              <p>
                Registration is free, but I can’t send a postcard to everyone, so receiving one isn’t guaranteed. Your
                address is used only to send your postcard.
              </p>
            </div>
          </div>

          <div className="relative mt-8">
            {formId ? (
              <TallyForm formId={formId} title="Get a postcard from Korea — registration form" />
            ) : (
              <div role="status" className="mx-auto max-w-md rounded-2xl bg-mist px-6 py-8 text-center">
                <p className="font-display text-lg font-semibold">Postcard registration opens very soon.</p>
                {contactLinks.instagram ? (
                  <p className="mt-2 text-sm text-slate">
                    Follow along on{" "}
                    <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
                      Instagram
                    </a>{" "}
                    to hear when it opens.
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <p className="relative mt-6 text-center text-xs text-slate">
            Free, no spam. You can ask me to delete your details anytime —{" "}
            <Link href="/privacy/" className="font-medium text-ink underline underline-offset-4">
              privacy notice
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
