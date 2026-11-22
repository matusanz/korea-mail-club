# Korea Mail Club — Project

## Purpose and audience

A personal, non-commercial creative project by someone living in South Korea: sharing places, seasons, culture and
postcard artwork with people around the world who love Korea. The landing page's primary goal is **free postcard
registrations** (Tally → private Google Sheet) from Instagram/Facebook traffic. No e-commerce at this stage.

Journey: Instagram / Facebook → landing page → registration (name, email, postal address, optional news) → if
selected: postcard.

## Lifecycle

`active` — pre-launch (created 2026-11-22).

## Stack and structure

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, npm, Node 22.
- Output: **static export** (`out/`), served by Nginx. No server code: registration is an embedded Tally form.
- Features: `home` (`src/features/home/`: Hero, Story, Pieces, PostcardFeature, Join + `TallyForm`, Note;
  `artwork.ts` image catalogue; `lib/tally.ts` embed URL + submit-event check) · `privacy` (privacy notice).
- Shared: `SiteHeader`, `SiteFooter`, `Wordmark`, `Picture` (responsive `<img srcset>`), `config/site.ts` (env-driven links), `lib/seo.ts`, `styles/globals.css` (tokens).
- Routes: `/`, `/privacy/`, `404`, `/sitemap.xml`, `/robots.txt`,
  `/icon.png`, `/apple-icon.png`, `/opengraph-image` (1200×630 PNG share card, rendered at build with `src/shared/assets/` Manrope, OFL).

## Registration (Tally + Google Sheets)

Replaced MailerLite (owner, 2026-11-22). Setup and form specs: [`docs/forms/README.md`](forms/README.md).

- **Public form `4aKrAB`** ("A little piece of Korea, delivered to you."): name, email, full postal address,
  required delivery consent, optional news checkbox → private sheet "Registrations". **Owner's decision
  (2026-11-22): addresses are collected from every registrant**, replacing the earlier "address only from selected
  people" plan; copy and privacy notice say so. Embedded in `#join` via
  `https://tally.so/embed/4aKrAB?hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1` and
  Tally's `embed.js` (fallback sets the iframe `src` after 2.5 s; `<noscript>` link). ID: `tallyRegistrationFormId`
  in `src/shared/config/site.ts` (override `NEXT_PUBLIC_TALLY_FORM_ID`).
- On Tally's `Tally.FormSubmitted` message (origin `https://tally.so`, same form ID) the site replaces the form with
  "Thank you for joining!" + text adjusted to the address already given ("it'll be on its way to the address you
  shared").
- Not used: MailerLite, newsletter automation, email campaigns, own database, accounts, payments.

## Requirements and invariants

- Approved copy from the owner's brief (2026-11-22); first person; no pricing, scarcity, testimonials, counts,
  fake social proof or promises of physical mail. No lorem ipsum or placeholder links (smoke test).
- Public identity (owner, 2026-11-22): site `https://www.koreamailclub.com` (canonical host, with `www`),
  Instagram `https://www.instagram.com/koreamailclub`, Facebook `https://www.facebook.com/profile.php?id=61596515290347`
  — defaults in `src/shared/config/site.ts`, overridable by env vars. Contact email
  `hello@koreamailclub.com`. Links are hidden when empty (only http(s)/valid emails accepted).
- Indexing: `SITE_INDEXABLE=true` only for production builds; otherwise `noindex` + `robots.txt Disallow: /`.
- Accessibility: semantic sections, skip link, labelled inputs with `aria-invalid`/`aria-describedby`, focus moves
  to errors/success, visible focus rings, reduced motion respected, AA text contrast.

## Design

**Modern Korean art & postcard brand** (owner's visual override, 2026-11-22 — replaces the first ivory/editorial
direction). White page, `mist #F7F7F7` secondary sections, navy `ink #1D2335` text, `slate #697190` secondary text;
supporting colours from the palace postcard: `peach #E7B89C`, `pink #D3B2AD`, `sun #F3DB95`, `accent #B4664B`
(peach deepened for small text, AA). Manrope 600/700 headings, Inter body (`next/font`, self-hosted). Colour comes from
the artwork, not tinted backgrounds. **No gradients, glows or blur** (owner, 2026-11-22); solid white header. 10px buttons, 12px inputs, rounded-2xl image cards. Avoid: ivory/beige/cream backgrounds,
serif display type, paper textures, brown palettes, ornate decoration.

## Decisions and exceptions

- `docs/forms/` holds the Tally form specs, Google Sheets setup, recipient email and deletion routine (not code).
- `src/shared/assets/` holds Manrope SemiBold (OFL) for the build-time OG image (Satori needs a static TTF).
- Images: the owner's four palace-gate illustrations (supplied 2026-11-22: "Sunset Palace Gate Postcard",
  "Gwanghwamun Gate at Sunset", "Korean Palace Sunset Stationery Scene", "Serene Gyeongbokgung Spring Courtyard").
  Originals stay outside the repo (owner's `Mail Club/` folder); `npm run images -- "<folder>"`
  (`scripts/optimize-images.mts`, sharp) crops, lifts the near-white background to pure white and writes two JPEG
  widths to `public/images/`. Placement: hero = postcard, Story = poster, Postcard section = stationery scene +
  roof close-up, share image = postcard.
- Theme photos (owner's choice, 2026-11-22) from **Unsplash** (Unsplash License: free use, no attribution required;
  credited in `artwork.ts`): 01 Places = Bukchon hanok lane (Jean Carlo Emer), 02 Seasons = Myeongdong street
  (Nik V), 03 Culture & Everyday = Seoul corner café (Bundo Kim); 04 Postcards & Art = stationery crop. Originals were in
  the owner's Downloads (moved since; the script skips missing files and keeps the web versions);
  `npm run images -- "<Mail Club>" "<folder with photos + stamp>"`.
- CTA labels: header and hero primary button say **"Get a Free Postcard"** (owner, 2026-11-22).
- **Logo / favicon** (owner, 2026-11-22): "Cherry Blossom Sunset Stamp Icon.png" (second source folder), cropped to the stamp by
  `npm run images` → `public/images/logo-stamp-{96,192}.png` (wordmark in header/footer, share image),
  `src/app/icon.png` (favicon, 128 px) and `src/app/apple-icon.png` (180 px on white for iOS).
- No analytics or cookies at launch (privacy notice says so; update it if that changes). Tally may set its own cookies inside the embed.
- Retention promised in the privacy notice: registrations (incl. addresses) while the project runs, deleted on request or when the project ends.

## Deployment

Planned: same as Clínica/Personal — `out/` → Nginx container behind Traefik on the Hostinger VPS, released with
`~/bin/deploy-site korea`. Domain: `www.koreamailclub.com` (DNS/VPS not set up yet). Runbook: [`deploy/README.md`](../deploy/README.md).

## Current state

*Pre-launch, not deployed.* `main` holds the complete site (merged 2026-11-22, `1e81cc3`): six-section landing page
with the approved copy, modern white/navy/pastel design, Tally registration (`4aKrAB` → Google Sheets), privacy
notice, owner's illustrations + Unsplash photos, stamp logo/favicon, share image. `npm run check` passes.
Local-only repository (no GitHub remote yet). Launch blockers: Tally form cleanup, DNS + MX records, VPS setup
(`docs/TODO.md`).
