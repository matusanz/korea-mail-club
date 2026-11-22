# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- None. Next: release `main` and set up the GTM tags (below).

## Next priorities (launch)

1. [x] 👤 **Tally cleanup** for form `4aKrAB` + Google Sheet (owner, 2026-11-22).
2. [x] 👤 **DNS (Hostinger):** `koreamailclub.com` and `www` currently point to Hostinger's parking IP
       `2.57.91.91` (checked 2026-11-22) → change the apex A record to the VPS IP and `www` to the same (A or CNAME).
3. [ ] 👤 **Email:** MX records so `hello@koreamailclub.com` receives mail (footer + privacy notice use it).
4. [x] 👤 **VPS setup:** give `deploy/VPS-LAUNCH-PROMPT.md` to the assistant with VPS access (after DNS).
5. [x] 🛠 **`deploy-site korea`** case added to `~/bin/deploy-site` on the deployment Mac (2026-11-22;
       `BASE=/opt/apps/korea-mail`, rollback `~/bin/deploy-site korea rollback`).
5b. [ ] 🛠 **Release `main`** (GTM + analytics, PageSpeed fixes, `/llms.txt`, privacy notice): `npm run check`, then
       `SITE_INDEXABLE=true ~/bin/deploy-site korea` (with approval); re-run PageSpeed afterwards.
5c. [ ] 👤 **GTM tags** in container `GTM-WG4L52DL`: GA4 (*Google Tag*, Initialization – All Pages), Meta Pixel
       (community template "Facebook Pixel", PageView, All Pages), TikTok Pixel (template "TikTok Pixel", Page View,
       All Pages); check in GTM Preview, then Submit → Publish. Needs 5b live first.
5d. [ ] 👤 **Google Search Console:** verify the domain and submit `https://www.koreamailclub.com/sitemap.xml`.
6. [ ] 🛠 **Live checks:** routes/404/`/privacy` 301, `/opengraph-image` as `image/png`, favicon; Tally embed in a
       real browser (desktop, iPhone Safari, Instagram in-app browser) — height, blending, "Thank you for joining!"
       on submit; one real test registration reaches the Google Sheet; Facebook Sharing Debugger preview.
7. [ ] 🛠 **GitHub** `https://github.com/matusanz/korea-mail-club` (public; remote `origin` added 2026-11-22): merge
       its one-line "Initial commit" README into `main` (keep ours), push `main` + branches (with approval).

## Later / optional

- [ ] 👤 A truly seasonal photo for "Seasons & Moments" (now a Myeongdong street photo).
- [ ] 👤 Unsplash photo originals are gone: their WebP files were re-encoded from the web JPEGs. Re-download them
      (IDs in `src/features/home/artwork.ts`) for best quality, then `npm run images`.
- [ ] 👤 Keep the original photos/stamp somewhere stable (they left Downloads) so `npm run images` can re-export them.
- [ ] 👤 Privacy notice: confirm wording; decide whether to name the person responsible (controller) for GDPR.
- [ ] 👤 Analytics run without consent (owner's decision): if EU/UK visitors matter later, add a consent banner for
      those regions only (Google Consent Mode region defaults).
- [ ] 👤 Delete merged/empty branches `feat/postcard-registration`, `feat/visual-refresh` (needs approval).

## Done (2026-11-22)

- Landing page (6 sections, approved copy), privacy page, 404, share image, `npm run check` with smoke test.
- Modern white/navy/pastel design (Manrope + Inter), no gradients.
- Registration: Tally form `4aKrAB` + Google Sheets (owner's decision: addresses from everyone); MailerLite removed.
- Owner's palace illustrations, Unsplash theme photos, cherry blossom stamp logo/favicon (`npm run images`).
- Domain `www.koreamailclub.com`, Instagram, Facebook, `hello@koreamailclub.com` configured.
- GTM `GTM-WG4L52DL` (`feat/gtm`); PageSpeed fixes: WebP, inlined CSS, AA contrast, `/llms.txt` (`feat/performance`).
- Analytics for every visitor, no banner (`feat/analytics`): GTM bootstrap in `src/shared/config/gtm.ts`; privacy
  notice names GA4, Meta Pixel, TikTok Pixel and how to limit them.
- VPS live at `/opt/apps/korea-mail` (`korea-mail-web-1`, nginx:alpine behind Traefik, HTTPS, apex → www 301),
  placeholder page served; `deploy-site korea` case added.

## Blockers / decisions required

- MX records (owner).
- GTM tags (5c) need the release (5b) first.

## Last session

- 2026-11-22: VPS + `deploy-site korea`; GTM, PageSpeed fixes (WebP, inlined CSS, contrast), `/llms.txt`, analytics
  without banner + privacy notice — all merged into `main` and pushed. Checked at 390/768/1440px (headless Chrome).
  Not released yet (5b).
