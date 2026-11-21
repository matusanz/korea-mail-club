# Korea Mail Club — TODO

Legend: 👤 needs the owner · 🛠 development work

## Current task

- None. Branch: — (initial build committed on `main` as the repository bootstrap, 2026-11-22).

## Next priorities

- [ ] 👤 **Artwork:** send the palace postcard illustration (hero, postcard section, share image) and 4–5 own photos
      or illustrations for Story + the four themes. 🛠 then add to `public/images/`, set `src`/`alt` in
      `src/features/home/artwork.ts`, regenerate the OG image from the real postcard.
- [ ] 👤 **MailerLite setup** (docs/PROJECT.md → Signup): group, embedded form with Email/Name/Country,
      double opt-in on, redirect → `<site>/welcome/`; send account ID + form ID.
- [ ] 👤 Welcome automation with `docs/email/welcome-email.html`; check MailerLite's required footer (sender address).
- [ ] 👤 Instagram URL, Facebook URL, contact email → `.env.local`.
- [ ] 👤 Privacy notice: confirm wording; decide whether to name the person responsible (controller) for GDPR.
- [ ] 👤 Domain choice → 🛠 VPS setup + `deploy-site korea` (deploy/README.md), with approval.
- [ ] 🛠 After connecting: real test signup end to end (form → confirm email → /welcome/ → welcome email).
- [ ] 🛠 GitHub repo + push (with approval); CI is in `.github/workflows/ci.yml`. From now on: task branches per V4.

## Blockers / decisions required

- MailerLite IDs, artwork and domain (above).

## Last session

- 2026-11-22: built the full landing page (6 sections), welcome + privacy pages, MailerLite signup (static, no
  secrets) with unit tests, OG image, welcome email, deploy runbook + Nginx config. `npm run check` passes;
  checked at 1440px and 390px (no horizontal overflow).
