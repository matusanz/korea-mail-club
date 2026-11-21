import Link from "next/link";
import { contactLinks, siteConfig } from "@/shared/config/site";

export const PRIVACY_UPDATED = "November 22, 2026";

export function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-5 text-5xl">Privacy notice</h1>
      <p className="mt-4 text-sm text-muted">Last updated {PRIVACY_UPDATED}</p>

      <div className="mt-10 space-y-10 text-muted [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:text-ink [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
        <p>
          {siteConfig.name} is a small personal creative project run by one person living in South Korea. This notice
          explains what happens to your information when you visit this website or join the mailing list.
        </p>

        <section>
          <h2>The mailing list</h2>
          <p>
            If you join, I use your details only to send you Korea Mail Club emails: occasional notes from Korea, postcard
            news, new artwork and little discoveries. I don’t sell or share your details for anyone else’s marketing.
          </p>
        </section>

        <section>
          <h2>What I collect</h2>
          <ul>
            <li>Your email address (required).</li>
            <li>Your first name and country, only if you choose to give them.</li>
            <li>
              Signup and confirmation records kept by MailerLite (such as the date, time and IP address of your signup and
              confirmation), which show that you asked to join.
            </li>
            <li>Email engagement information MailerLite may record, such as whether an email was opened or a link clicked.</li>
          </ul>
          <p className="mt-3">
            The signup form never asks for a postal address. If you are ever selected for, or ask to receive, a physical
            postcard, I’ll ask for your address separately and use it only to send that mail.
          </p>
        </section>

        <section>
          <h2>Consent and confirmation</h2>
          <p>
            You join by ticking the consent box and submitting the form. MailerLite then sends you a confirmation email; you
            are only added to the list after you click the link in it. The legal basis for these emails is your consent.
          </p>
        </section>

        <section>
          <h2>MailerLite</h2>
          <p>
            The mailing list is managed with{" "}
            <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
              MailerLite
            </a>
            , which stores subscriber details and sends the emails on my behalf. Your form details go directly from your
            browser to MailerLite; this website doesn’t keep its own copy. MailerLite may process data outside your country
            under its own safeguards, described in its privacy policy.
          </p>
        </section>

        <section>
          <h2>Unsubscribing and your choices</h2>
          <p>
            Every email has an unsubscribe link, and you can use it at any time. You can also ask me to access, correct or
            delete your details. I keep your details while you are subscribed and remove them when you ask me to.
          </p>
        </section>

        <section>
          <h2>This website</h2>
          <p>
            The website itself doesn’t use advertising or analytics cookies. The server keeps standard technical logs
            (such as IP address and pages requested) for security and to keep the site running.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            {contactLinks.email ? (
              <>
                Questions or requests about your information:{" "}
                <a href={`mailto:${contactLinks.email}`} className="text-ink underline underline-offset-4">
                  {contactLinks.email}
                </a>
                .
              </>
            ) : (
              <>Questions or requests about your information: simply reply to any Korea Mail Club email.</>
            )}
          </p>
        </section>

        <p>
          <Link href="/" className="text-ink underline underline-offset-4">
            ← Back to Korea Mail Club
          </Link>
        </p>
      </div>
    </article>
  );
}
