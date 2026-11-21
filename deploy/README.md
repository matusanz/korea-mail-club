# Deployment — Korea Mail Club

**Status: not deployed.** Domain not chosen yet. Nothing below has been run; each step needs explicit approval.

Static export (`out/`) served by Nginx on the existing Hostinger VPS behind the existing Traefik HTTPS — the same
pattern as Clínica and Personal. No Node.js, no secrets, no database in production. Pushing `main` never deploys.

## First setup (once, with approval)

1. **Domain:** choose it, point DNS (A record) at the VPS, set `NEXT_PUBLIC_SITE_URL` in `.env.local`.
2. **Site draft on the VPS** (VPS deployment standard v2, inactive until approved):
   `bash ~/vps-deploy-standard/new-site.sh korea-mail <domain> static public` → move/adapt to
   `/opt/apps/korea-mail/` like the other sites; copy [`nginx.conf`](nginx.conf) to `nginx/default.conf`
   (set `server_name`). Pin the Nginx image. Traefik: network `root_default`, entrypoint `websecure`,
   resolver `mytlschallenge`. Do not touch other sites, n8n or the root Traefik Compose project.
3. **`deploy-site`:** add a `korea` case to the machine-local `~/bin/deploy-site` (back it up first):
   ```bash
   korea)
     BASE='/opt/apps/korea-mail'
     DOMAIN='https://<domain>/'
     REPO='Korea-Mail'
     ;;
   ```
4. **First release:** `npm ci && npm run check`, then `SITE_INDEXABLE=true ~/bin/deploy-site korea`.
   `/opt/apps/korea-mail/web/current/` must exist before the first run (the script backs it up).
5. **MailerLite:** set the double opt-in "redirect after confirmation" URL to `https://<domain>/welcome/`
   and send one real test signup end to end (docs/PROJECT.md → Signup).

## Routine release

```bash
npm ci && npm run check
SITE_INDEXABLE=true ~/bin/deploy-site korea     # without the variable the build is noindex
```

After each release check: `/` and `/privacy/` → 200; `/privacy` → 301; `/nope/` → 404;
`/opengraph-image` → 200 `image/png`; `/welcome/` has `noindex`; `robots.txt` and `sitemap.xml` load;
a test signup reaches MailerLite. Preview the share card with Facebook's Sharing Debugger.

## Rollback

`~/bin/deploy-site korea rollback` restores the last backup in `/opt/apps/korea-mail/deploy-backups/`.
It does not undo Nginx or Traefik changes.
