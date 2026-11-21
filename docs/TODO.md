# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- None. Branch: — (`main` = `1e81cc3` + this docs update; local only, no GitHub remote yet).

## Next priorities (launch)

1. [ ] 👤 **Tally cleanup** for form `4aKrAB` (`docs/forms/README.md`): delete "Untitled checkboxes field", make
       State optional, news checkbox optional/unticked, design (Inter, navy `#1D2335` button), connect the private
       Google Sheet "Korea Mail Club — Registrations".
2. [ ] 👤 **DNS:** A records for `koreamailclub.com` and `www.koreamailclub.com` → the VPS (none exist yet,
       checked 2026-11-22).
3. [ ] 👤 **Email:** MX records so `info@koreamailclub.com` receives mail (footer + privacy notice use it).
4. [ ] 🛠 **VPS setup + first release** (with approval, `deploy/README.md`): site folder `/opt/apps/korea-mail/`,
       Nginx container + Traefik router for both hosts (apex → 301 `www`), `korea` case in `~/bin/deploy-site`,
       `SITE_INDEXABLE=true ~/bin/deploy-site korea`.
5. [ ] 🛠 **Live checks:** routes/404/`/privacy` 301, `/opengraph-image` as `image/png`, favicon; Tally embed in a
       real browser (desktop, iPhone Safari, Instagram in-app browser) — height, blending, "Thank you for joining!"
       on submit; one real test registration reaches the Google Sheet; Facebook Sharing Debugger preview.
6. [ ] 🛠 **GitHub:** create private repo, push `main` + branches (with approval); CI in `.github/workflows/ci.yml`.

## Later / optional

- [ ] 👤 A truly seasonal photo for "Seasons & Moments" (now a Myeongdong street photo).
- [ ] 👤 Keep the original photos/stamp somewhere stable (they left Downloads) so `npm run images` can re-export them.
- [ ] 👤 Privacy notice: confirm wording; decide whether to name the person responsible (controller) for GDPR.
- [ ] 👤 Delete merged/empty branches `feat/postcard-registration`, `feat/visual-refresh` (needs approval).

## Done (2026-11-22)

- Landing page (6 sections, approved copy), privacy page, 404, share image, `npm run check` with smoke test.
- Modern white/navy/pastel design (Manrope + Inter), no gradients.
- Registration: Tally form `4aKrAB` + Google Sheets (owner's decision: addresses from everyone); MailerLite removed.
- Owner's palace illustrations, Unsplash theme photos, cherry blossom stamp logo/favicon (`npm run images`).
- Domain `www.koreamailclub.com`, Instagram, Facebook, `info@koreamailclub.com` configured.

## Blockers / decisions required

- Tally cleanup, DNS + MX records (owner).

## Last session

- 2026-11-22: built and merged everything into `main` (`4ee28a1` → `1e81cc3`): design, Tally registration, artwork,
  photos, logo. `npm run check` passes; checked at 1440px and 390px. Not deployed, not pushed.
