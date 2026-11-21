# Korea Mail Club

Landing page for Korea Mail Club — a personal creative project sharing postcards, photos and little discoveries
from South Korea — where visitors from Instagram/Facebook register (free) to receive a postcard from Korea, via an embedded Tally form.

- **Project facts, decisions, setup:** [`docs/PROJECT.md`](docs/PROJECT.md)
- **Tasks and blockers:** [`docs/TODO.md`](docs/TODO.md)
- **Rules for coding agents:** [`AGENTS.md`](AGENTS.md)
- **Tally forms + Google Sheets setup:** [`docs/forms/README.md`](docs/forms/README.md)

## Run and check

Requires Node 22 (`.nvmrc`). Public settings live in `src/shared/config/site.ts`; `.env.example` lists optional overrides.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + tests + build + smoke — must pass before committing
```

| Script | What it does |
|---|---|
| `npm run build` | Static export to `out/` |
| `npm run test` | Vitest unit tests (Tally embed URL + submit event, config) |
| `npm run images -- "<folder>"` | Rebuilds `public/images/` from the owner's original artwork (crop, white background, two widths) |
| `npm run smoke` | Checks `out/`: every page exists, Tally registration form embedded, no placeholders or retired integrations |

## Deployment

Static export served by Nginx on the VPS behind Traefik, released with `~/bin/deploy-site korea` once set up.
**Not deployed yet** — see [`deploy/README.md`](deploy/README.md). Never deploy without explicit approval.
