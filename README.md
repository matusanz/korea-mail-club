# Korea Mail Club

Landing page for Korea Mail Club — a personal creative project sharing postcards, photos and little discoveries
from South Korea — whose main job is turning visitors from Instagram/Facebook into confirmed MailerLite subscribers.

- **Project facts, decisions, setup:** [`docs/PROJECT.md`](docs/PROJECT.md)
- **Tasks and blockers:** [`docs/TODO.md`](docs/TODO.md)
- **Rules for coding agents:** [`AGENTS.md`](AGENTS.md)
- **Welcome email for MailerLite:** [`docs/email/welcome-email.html`](docs/email/welcome-email.html)

## Run and check

Requires Node 22 (`.nvmrc`). Copy `.env.example` to `.env.local` and fill in what you have (all optional for local work).

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + tests + build + smoke — must pass before committing
```

| Script | What it does |
|---|---|
| `npm run build` | Static export to `out/` |
| `npm run test` | Vitest unit tests (signup validation + MailerLite payload, config) |
| `npm run smoke` | Checks `out/`: every page exists, welcome is `noindex`, no placeholder text or empty links |

## Deployment

Static export served by Nginx on the VPS behind Traefik, released with `~/bin/deploy-site korea` once set up.
**Not deployed yet** — see [`deploy/README.md`](deploy/README.md). Never deploy without explicit approval.
