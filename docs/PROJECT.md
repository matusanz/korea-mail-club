# Korea Mail Club — Project

## Purpose and audience

A personal, non-commercial creative project by someone living in South Korea: sharing places, seasons, culture and
postcard artwork with people around the world who love Korea. The landing page's primary goal is **email signups
(MailerLite, double opt-in)** from Instagram/Facebook traffic. No e-commerce at this stage.

Journey: Instagram / Facebook → landing page → signup → MailerLite confirmation email → `/welcome/` → welcome email
→ occasional updates.

## Lifecycle

`active` — pre-launch (created 2026-11-22).

## Stack and structure

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, npm, Node 22.
- Output: **static export** (`out/`), served by Nginx. No server code: the form posts from the browser to MailerLite.
- Features: `home` (`src/features/home/`: Hero, Story, Pieces, PostcardFeature, Join + `SignupForm`, Note;
  `artwork.ts` image slots; `lib/signup.ts` validation + MailerLite) · `welcome` (post-confirmation page) ·
  `privacy` (privacy notice).
- Shared: `SiteHeader`, `SiteFooter`, `Wordmark`, `Artwork` (placeholder SVG illustrations), `Postcard`,
  `Stamp` (postmark, divider), `config/site.ts` (env-driven links), `lib/seo.ts`, `styles/globals.css` (tokens).
- Routes: `/`, `/privacy/`, `/welcome/` (noindex, not in sitemap), `404`, `/sitemap.xml`, `/robots.txt`,
  `/opengraph-image` (1200×630 PNG share card, rendered at build with `src/shared/assets/` Cormorant Garamond, OFL).

## Signup (MailerLite)

- The form posts to `https://assets.mailerlite.com/jsonp/<ACCOUNT_ID>/forms/<FORM_ID>/subscribe` — the same public
  endpoint as MailerLite's embed code — with `fields[email]`, optional `fields[name]`, `fields[country]`.
  IDs come from `NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID` / `NEXT_PUBLIC_MAILERLITE_FORM_ID` (public, not secrets).
  The API key is never used. No subscriber data is stored by the site.
- **Configured in MailerLite (not in code):** create group "Korea Mail Club"; create an *Embedded form* assigned to
  that group, containing the fields Email, Name and Country (Name/Country optional); turn on **double opt-in**;
  set the confirmation redirect to `<site>/welcome/`; set the welcome automation (trigger: subscriber joins the
  group) with `docs/email/welcome-email.html`.
- Behavior: client validation (email format, consent checkbox — not preselected), honeypot field, disabled button
  while sending, no resend for the same email twice in a visit, field + network error messages. Success shows
  "One little step closer to Korea" (check your inbox) — never "subscribed". Without IDs the form says the list
  isn't connected yet.

## Requirements and invariants

- Approved copy from the owner's brief (2026-11-22); first person; no pricing, scarcity, testimonials, counts,
  fake social proof or promises of physical mail. No lorem ipsum or placeholder links (smoke test).
- Social/contact links: `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`;
  hidden when empty (only http(s)/valid emails accepted).
- Indexing: `SITE_INDEXABLE=true` only for production builds; otherwise `noindex` + `robots.txt Disallow: /`.
- Accessibility: semantic sections, skip link, labelled inputs with `aria-invalid`/`aria-describedby`, focus moves
  to errors/success, visible focus rings, reduced motion respected, AA text contrast.

## Design

Korean stationery / editorial journal. Tokens in `globals.css`: ivory `#FAF7F2`, cream `#F2EBE2` (faint paper grain),
paper `#FFF`, ink `#332D29`, muted `#6E645C` (darkened from `#756B63` for AA), rose `#D7A39C`, sky `#AABBC7`,
terracotta `#B87567` (+ `#9A5A4C` for small text), line `#E7DED3`. Headings Cormorant Garamond 500; body DM Sans
(both via `next/font`, self-hosted at build). Postcards with white borders + soft shadow, envelope, perforated stamp,
postmark, airmail edge on the signup card. Charcoal pill buttons (no bright colors).

## Decisions and exceptions

- `docs/email/` holds the MailerLite welcome email (not code; pasted into MailerLite).
- `src/shared/assets/` holds the font file the build-time OG image needs (Satori can't read the variable font).
- Images: **placeholder illustrations** (original SVG, drawn for this repo) until the owner's palace postcard and
  photos are supplied; swap via `src/features/home/artwork.ts` + `public/images/`. No third-party images.
- No analytics or cookies at launch (privacy notice says so; update it if that changes).

## Deployment

Planned: same as Clínica/Personal — `out/` → Nginx container behind Traefik on the Hostinger VPS, released with
`~/bin/deploy-site korea`. Not set up; domain not chosen. Runbook: [`deploy/README.md`](../deploy/README.md).

## Current state

Landing page, welcome and privacy pages, signup logic with tests, share image and welcome email built
(2026-11-22). Awaiting: real artwork, MailerLite IDs, social/contact URLs, domain, deployment.
