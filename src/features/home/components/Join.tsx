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
          <div className="text-center">
            <p className="eyebrow">Free to register</p>
            <h2 id="join-title" className="mt-4 text-4xl sm:text-5xl">
              Get a postcard from Korea.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-slate">
              Register to receive a real postcard from South Korea. I can’t send one to everyone, and your address is only
              used for delivery.
            </p>
          </div>

          {/* divider between the intro and the (multi-page) Tally form */}
          <div aria-hidden="true" className="mt-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-peach ring-4 ring-sun/50" />
            <span className="h-px flex-1 bg-line" />
          </div>

          <div id="join-form" className="mt-6 scroll-mt-20">
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

          <p className="mt-6 text-center text-xs text-slate">
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
