# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- **Postcard registration + visual refresh** (`feat/postcard-registration`, 2026-11-22, not committed): modern
  white/pastel design; MailerLite replaced by Tally form `4aKrAB` + Google Sheets (`docs/forms/README.md`); privacy rewritten.

## Next priorities

- [x] 👤 Artwork: four palace-gate illustrations added (2026-11-22) via `npm run images`.
- [x] 👤 Theme photos (Unsplash) for Places, Seasons, Culture (2026-11-22).
- [x] 👤 Logo/favicon: cherry blossom stamp (2026-11-22).
- [ ] 👤 Optional: a truly seasonal image for "Seasons & Moments" (now a Myeongdong street photo).
- [x] 👤 Public Tally form `4aKrAB` embedded, collecting addresses from everyone (owner's decision, 2026-11-22).
- [ ] 👤 **Tally cleanup** (`docs/forms/README.md`): delete "Untitled checkboxes field", State optional, news
      checkbox optional/unticked, design colours/font, connect the private Google Sheet.
- [ ] 🛠 Check the embed in a real browser (desktop, iPhone Safari, Instagram in-app browser): height, blending,
      thank-you message on submit — headless screenshots can't render it.
- [x] 👤 Domain `www.koreamailclub.com`, Instagram and Facebook (owner, 2026-11-22) → `src/shared/config/site.ts`.
- [x] 👤 Contact email `info@koreamailclub.com` (owner, 2026-11-22).
- [ ] 👤 Privacy notice: confirm wording; decide whether to name the person responsible (controller) for GDPR.
- [ ] 👤 Make sure `info@koreamailclub.com` receives mail (MX records) before launch.
- [ ] 👤 DNS for `koreamailclub.com` (hosted on the same VPS as the other sites; no A records yet on 2026-11-22) → VPS (A records for `www` and apex) → 🛠 VPS setup + `deploy-site korea` (deploy/README.md), with approval; apex → 301 `www`.
- [ ] 🛠 After connecting: real test registration end to end (site → Tally → Google Sheet → thank-you message).
- [ ] 🛠 GitHub repo + push (with approval); CI is in `.github/workflows/ci.yml`. From now on: task branches per V4.

## Blockers / decisions required

- Tally form cleanup, artwork, DNS records (no A records exist yet, 2026-11-22).

## Last session

- 2026-11-22: commits `d95d915`, `9fcbca7`; then Unsplash theme photos, CTAs → "Get a Free Postcard", unused spring
  illustration removed from the site; stamp logo + favicon. `npm run check` passes.
