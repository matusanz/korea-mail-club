# Prompt — set up Korea Mail Club on the VPS

Copy everything below the line into the assistant that has shell access to the VPS. It covers the **server side
only**. DNS, the Mac-side `deploy-site` script and the first upload are separate steps (see the end).

Fill in `<VPS_IP>` first. It's the same IP as the other sites; `~/bin/deploy-site` on the deployment Mac has it.

---

You are helping me launch a new **static website** on my existing Hostinger VPS. It must follow exactly the same
pattern as my existing static sites (e.g. `/opt/apps/clinica/` → https://web.leanaquintanilla.com and
`/opt/apps/personal-website/` → https://josesanchezq.com): a Next.js static export served by an **Nginx container**
behind the **existing Traefik** (HTTPS). There is no Node.js process, no database and no secrets.

## The site

| Item | Value |
|---|---|
| Name / Compose project | `korea-mail` |
| Site folder | `/opt/apps/korea-mail/` |
| Static files (uploaded later from my Mac with rsync) | `/opt/apps/korea-mail/web/current/` |
| Release backups (created by my deploy script) | `/opt/apps/korea-mail/deploy-backups/` |
| Container | `korea-mail-web-1` |
| Canonical URL | `https://www.koreamailclub.com` |
| Also served | `https://koreamailclub.com` → **301** to `https://www.koreamailclub.com` (same path) |
| Traefik | external network `root_default`, entrypoint `websecure`, cert resolver `mytlschallenge` |
| Source repo (reference only) | https://github.com/matusanz/korea-mail-club |

## Hard rules

- **Do not touch** any other site or container, the root Traefik Compose project, n8n, PostgreSQL volumes,
  `games-stack`, or any existing router, middleware, certificate or network. Only create things under
  `/opt/apps/korea-mail/`.
- **Read before you write.** Before creating anything, inspect how `/opt/apps/clinica/` is laid out (`ls -la`,
  `compose.yaml`, `.env`, `nginx/default.conf`, file owner and permissions) and **mirror it**: same owner/group as
  the `deploy` user's other site folders, same Nginx image (check with `docker inspect clinica-web-1 --format '{{.Config.Image}}'`),
  same mount style. If something differs from what I describe here, follow the live pattern and tell me.
- Check for collisions first: no existing container, router or middleware named `korea-mail`, and no router already
  matching `koreamailclub.com` (`docker ps --format '{{.Names}}'` and `docker inspect` labels).
- Never print `.env` values of other projects. Back up any file before changing it.
- Don't run `docker compose down` on anything except `korea-mail`, and don't restart Traefik.
- Stop and ask me if a step fails or anything is unclear. Don't improvise around errors.

## Steps

### 0. Pre-checks (read-only)

```bash
dig +short A koreamailclub.com
dig +short A www.koreamailclub.com     # both must return <VPS_IP> before TLS can be issued
ls -la /opt/apps/ /opt/apps/clinica/
cat /opt/apps/clinica/compose.yaml
docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}'
docker network ls | grep root_default
```

If DNS doesn't point to `<VPS_IP>` yet, you can still do steps 1–4, but **don't start the container (step 5)**
until it does. Let's Encrypt would fail and could be rate-limited.

### 1. Folders

```bash
sudo mkdir -p /opt/apps/korea-mail/{nginx,web/current,deploy-backups}
sudo chown -R deploy:deploy /opt/apps/korea-mail     # use the same owner as /opt/apps/clinica
```

### 2. Temporary placeholder (replaced by the first real release)

My deploy script backs up `web/current` before uploading, so it must exist and contain an `index.html` and `404.html`:

```bash
cat > /opt/apps/korea-mail/web/current/index.html <<'EOF'
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Korea Mail Club</title></head>
<body style="font-family:system-ui,sans-serif;color:#1D2335;display:grid;place-items:center;min-height:100vh;margin:0">
<p>Korea Mail Club — coming soon.</p></body></html>
EOF
cp /opt/apps/korea-mail/web/current/index.html /opt/apps/korea-mail/web/current/404.html
```

### 3. Nginx config — `/opt/apps/korea-mail/nginx/default.conf`

```nginx
# Korea Mail Club — static export (out/), served behind Traefik. Reference copy: deploy/nginx.conf in the repo.
server {
    listen 80;
    server_name www.koreamailclub.com koreamailclub.com;
    server_tokens off;

    root /usr/share/nginx/site/current;
    index index.html;
    absolute_redirect off;

    gzip on;
    gzip_vary on;
    gzip_comp_level 5;
    gzip_min_length 1024;
    gzip_types text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml;

    # Share preview image is exported without an extension: serve it as PNG, before the slash rewrite.
    location = /opengraph-image {
        default_type image/png;
        add_header Cache-Control "public, max-age=86400";
        try_files $uri =404;
    }

    location ^~ /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    location / {
        rewrite ^([^.]*[^/])$ $1/ permanent;   # /privacy → /privacy/ (the site uses trailing slashes)
        try_files $uri $uri/index.html =404;
    }

    location ~ /\. {
        return 404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

### 4. Compose — `/opt/apps/korea-mail/compose.yaml`

Use the Nginx image tag the other static sites use (from the pre-checks) in place of `nginx:alpine` if it differs.

```yaml
name: korea-mail
services:
  web:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./web:/usr/share/nginx/site:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=root_default"
      - "traefik.http.routers.korea-mail.rule=Host(`www.koreamailclub.com`) || Host(`koreamailclub.com`)"
      - "traefik.http.routers.korea-mail.entrypoints=websecure"
      - "traefik.http.routers.korea-mail.tls=true"
      - "traefik.http.routers.korea-mail.tls.certresolver=mytlschallenge"
      - "traefik.http.routers.korea-mail.service=korea-mail"
      - "traefik.http.routers.korea-mail.middlewares=korea-mail-apex-to-www"
      - "traefik.http.middlewares.korea-mail-apex-to-www.redirectregex.regex=^https?://koreamailclub\\.com/(.*)"
      - "traefik.http.middlewares.korea-mail-apex-to-www.redirectregex.replacement=https://www.koreamailclub.com/$${1}"
      - "traefik.http.middlewares.korea-mail-apex-to-www.redirectregex.permanent=true"
      - "traefik.http.services.korea-mail.loadbalancer.server.port=80"

networks:
  proxy:
    external: true
    name: root_default
```

(`./web` is mounted, not `./web/current`, so a release that replaces `current` is picked up without restarting. The
Nginx root is `/usr/share/nginx/site/current`. This is the same as Clínica.)

### 5. Validate and start (only once DNS points to `<VPS_IP>`)

```bash
cd /opt/apps/korea-mail
docker compose config --quiet && echo "compose OK"
docker compose up -d
docker exec korea-mail-web-1 nginx -t
docker compose ps
```

### 6. Verify from outside

```bash
curl -sI https://www.koreamailclub.com/ | head -5           # 200, valid certificate
curl -sI https://koreamailclub.com/privacy/ | grep -i -E '^(HTTP|location)'   # 301 → https://www.koreamailclub.com/privacy/
curl -sI http://www.koreamailclub.com/ | grep -i -E '^(HTTP|location)'        # 301/308 → https (root Traefik)
curl -s -o /dev/null -w '%{http_code}\n' https://www.koreamailclub.com/does-not-exist/   # 404
echo | openssl s_client -servername www.koreamailclub.com -connect www.koreamailclub.com:443 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

Also confirm the other sites still answer (e.g. `curl -sI https://web.leanaquintanilla.com/ | head -1`).

### 7. Record

Create `/opt/apps/korea-mail/SITE.md` in the same style as the other sites: domains, container, Traefik router and
middleware names, image, folder layout, date, status "live (placeholder)", and how releases happen
(`~/bin/deploy-site korea` from my Mac, rsync into `web/current/`, backups in `deploy-backups/`).

### 8. Report back

Tell me: every command you ran that changed something, the final `compose.yaml` and `default.conf`, the results of
step 6, the image tag used, and anything that differed from these instructions.

---

## After the server is ready (on the deployment Mac, not on the VPS)

1. Add a `korea` case to `~/bin/deploy-site` (back up the script first):
   ```bash
   korea)
     BASE='/opt/apps/korea-mail'
     DOMAIN='https://www.koreamailclub.com/'
     REPO='Korea-Mail'          # folder name of the local clone
     ;;
   ```
   and add `korea` to the usage line.
2. First real release, from the repo on an up-to-date `main`:
   `npm ci && npm run check && SITE_INDEXABLE=true ~/bin/deploy-site korea`
3. Run the live checks in `deploy/README.md`.
