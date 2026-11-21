# AGENTS.md — Korea Mail Club

Authoritative instructions for AI coding assistants in this repo (JCode Unified Web Standard V4).
Read this, `README.md`, `docs/PROJECT.md` and `docs/TODO.md` before working.

## Hard rules

- Work only inside this repository. Never touch `finance-mind` or `development-standards`.
- Never deploy or change the VPS. Pushing to GitHub or passing CI is not permission to deploy.
- Preserve existing content, routes, UI and behavior unless the task explicitly changes them.
- Never commit secrets, `.env` files or build output (`.next/`, `out/`).

## Coding principles

1. **Think first.** State important assumptions; ask when a requirement is genuinely ambiguous.
2. **Simplicity first.** Smallest change that works; no speculative abstractions or dependencies.
3. **Surgical changes.** Touch only files relevant to the task; no drive-by redesigns.
4. **Verify.** Run `npm run check`, and check pages in a browser (390 / 768 / 1440px) when UI changes.

## Stack and structure

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, npm. **Static export** (`out/`).
- `src/app/` — thin routes: metadata + render one feature component; sitemap, robots, OG image.
- `src/features/<feature>/` — `home` (landing sections + Tally registration embed), `privacy`.
- `src/shared/` — header/footer, `Picture`, config (`config/site.ts`), SEO helper, styles.
- Imports flow `app → features → shared` only (ESLint boundaries). No barrel files. `@/` alias.
- Server Components by default; `'use client'` only for the Tally embed.
- New public page: unique `title`/`description`, canonical, add it to `src/app/sitemap.ts`.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + tests + build + smoke of out/ — must pass
```

## Git workflow (solo, no pull requests)

- Commit identity must be `Jose Sanchez <dev@josesanchezq.com>`; verify before committing.
- One branch per task: `feat/`, `fix/`, `refactor/`, `chore/`, `docs/` + short name. Never work on `main`.
- Before committing: `npm run check`, review `git diff` for unintended files/secrets, update `docs/TODO.md`.
- **Ask before committing.** Ask before merging or deleting branches.
- **Merge = push:** approved merge (`git merge --no-ff`) into `main` is pushed right away with the branch;
  verify with `git ls-remote --heads origin main`. Never force-push, reset or discard work.

## Project-specific rules

- **Brand voice:** first person, one person living in Korea. Never add pricing, "drops", scarcity, countdowns,
  paid plans, testimonials, subscriber counts, fake social feeds, or claims that monthly mail already exists.
  Do not invent biography details. Copy is approved by the owner — change it only when asked.
- **No placeholders in public HTML:** social/contact links come from env vars and are hidden when empty
  (`src/shared/config/site.ts`); `npm run smoke` fails on lorem ipsum, empty or `#` links.
- **Registration:** Tally + private Google Sheets only (`docs/forms/README.md`). No MailerLite, newsletters,
  campaigns, own database, accounts or payments. Never promise a postcard: registering is interest only.
- **Images:** only the owner's artwork (or images with established rights), added via `npm run images` and
  `src/features/home/artwork.ts`. No gradients, glows or blur in the UI.
- The public Tally form `4aKrAB` collects postal addresses from every registrant (owner's decision, 2026-11-22);
  keep the `#join` copy, thank-you text and privacy notice consistent with what the form collects.
