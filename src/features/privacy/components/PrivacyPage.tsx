import Link from "next/link";
import { contactLinks, siteConfig } from "@/shared/config/site";

export const PRIVACY_UPDATED = "November 22, 2026";

const ext = { target: "_blank", rel: "noopener noreferrer", className: "text-ink underline underline-offset-4" } as const;

export function PrivacyPage() {
  const email = contactLinks.email;
  const contact = email ? (
    <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">
      {email}
    </a>
  ) : (
    "the contact link in the footer"
  );

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-4 text-5xl">Privacy notice</h1>
      <p className="mt-4 text-sm text-slate">Last updated {PRIVACY_UPDATED}</p>

      <div className="mt-10 space-y-10 text-slate [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-ink [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
        <p>
          {siteConfig.name} is a small, free, personal creative project run by one person living in South Korea. This
          notice explains what happens to your information when you register for a postcard or visit this website.
        </p>

        <section>
          <h2>What I collect, and why</h2>
          <p>When you register for a postcard, the form asks for:</p>
          <ul className="mt-2">
            <li>Your first and last name, and your email address.</li>
            <li>Your mailing address: address lines, postal code, city, state or region, and country.</li>
            <li>Your confirmation that the address may be used to arrange postcard delivery.</li>
            <li>Optionally, whether you’d like occasional news about Korea Mail Club.</li>
          </ul>
          <p className="mt-3">
            I use these details only to choose recipients for postcard mailings, send your postcard, and contact you about
            it. Your email is used for project news only if you ticked that separate, optional box. Registering doesn’t
            mean you’ll receive a postcard.
          </p>
        </section>

        <section>
          <h2>Who processes it</h2>
          <ul>
            <li>
              <a href="https://tally.so/help/privacy-policy" {...ext}>
                Tally
              </a>{" "}
              provides the forms. When you submit one, your answers are sent from your browser to Tally, which stores them
              for me. The form is loaded from Tally’s servers.
            </li>
            <li>
              Submissions are copied to a private Google Sheet in my{" "}
              <a href="https://policies.google.com/privacy" {...ext}>
                Google
              </a>{" "}
              account. Only I can access it, and it is never shared or published.
            </li>
          </ul>
          <p className="mt-3">
            These services may store data outside your country, under their own safeguards described in their privacy
            policies. This website keeps no database or copy of your details. I don’t sell your information or share it
            with anyone else for their marketing.
          </p>
        </section>

        <section>
          <h2>Legal basis</h2>
          <p>
            I process your details because you chose to register (your consent). Optional project updates are sent only
            if you ticked that box. You can withdraw consent at any time.
          </p>
        </section>

        <section>
          <h2>How long I keep it</h2>
          <ul>
            <li>
              Registrations, including addresses, are kept while the postcard project is running, so you can be included
              in upcoming mailings, or until you ask me to delete them.
            </li>
            <li>If the project ends, I’ll delete all registrations and addresses I still hold.</li>
          </ul>
        </section>

        <section>
          <h2>Your choices: access, changes and deletion</h2>
          <p>
            Email {contact} at any time to see the details I hold about you, correct them, stop project updates, or have
            everything deleted. I’ll remove your details from Tally and the Google Sheet. Any news email will also let
            you opt out.
          </p>
        </section>

        <section>
          <h2>This website</h2>
          <p>
            The website itself doesn’t use advertising or analytics cookies. The registration form is embedded from Tally,
            which may set the cookies it needs to work. The server keeps standard technical logs (such as IP address and
            pages requested) for security and to keep the site running.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions or requests about your information: {contact}.</p>
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
