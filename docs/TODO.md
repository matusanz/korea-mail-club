# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- **Postcard registration + visual refresh** (`feat/postcard-registration`, 2026-11-22, not committed): modern
  white/pastel design; MailerLite replaced by Tally form `4aKrAB` + Google Sheets (`docs/forms/README.md`); privacy rewritten.

## Next priorities

- [x] 👤 Artwork: four palace-gate illustrations added (2026-11-22) via `npm run images`.
- [ ] 👤 More varied artwork for the four themes (streets, seasons, café/culture, postcards) — they reuse crops of
      the same gate for now; add files to `scripts/optimize-images.mts` + `src/features/home/artwork.ts`.
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

- 2026-11-22: committed `d95d915` (visual refresh + Tally). Then: real artwork placed (`npm run images`), share image
  from the real postcard, all gradients/glows/blur removed. `npm run check` passes; checked 1440px and 390px.
