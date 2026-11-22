# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- **Registration copy + VPS launch prompt** (`feat/registration-copy`, 2026-11-22).

## Next priorities (launch)

1. [x] 👤 **Tally cleanup** for form `4aKrAB` + Google Sheet (owner, 2026-11-22).
2. [ ] 👤 **DNS (Hostinger):** `koreamailclub.com` and `www` currently point to Hostinger's parking IP
       `2.57.91.91` (checked 2026-11-22) → change the apex A record to the VPS IP and `www` to the same (A or CNAME).
3. [ ] 👤 **Email:** MX records so `hello@koreamailclub.com` receives mail (footer + privacy notice use it).
4. [ ] 👤 **VPS setup:** give `deploy/VPS-LAUNCH-PROMPT.md` to the assistant with VPS access (after DNS).
5. [ ] 🛠 **`deploy-site korea`** case on the deployment Mac + first release `SITE_INDEXABLE=true ~/bin/deploy-site korea`
       (with approval).
6. [ ] 🛠 **Live checks:** routes/404/`/privacy` 301, `/opengraph-image` as `image/png`, favicon; Tally embed in a
       real browser (desktop, iPhone Safari, Instagram in-app browser) — height, blending, "Thank you for joining!"
       on submit; one real test registration reaches the Google Sheet; Facebook Sharing Debugger preview.
7. [ ] 🛠 **GitHub** `https://github.com/matusanz/korea-mail-club` (public; remote `origin` added 2026-11-22): merge
       its one-line "Initial commit" README into `main` (keep ours), push `main` + branches (with approval).

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
- Domain `www.koreamailclub.com`, Instagram, Facebook, `hello@koreamailclub.com` configured.

## Blockers / decisions required

- DNS A records → VPS, MX records (owner).

## Last session

- 2026-11-22: built and merged everything into `main` (`4ee28a1` → `1e81cc3`): design, Tally registration, artwork,
  photos, logo. `npm run check` passes; checked at 1440px and 390px. Not deployed, not pushed.
