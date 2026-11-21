import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes the whole site to `out/`, served by Nginx on the VPS
 * (no Node server). The signup form posts from the browser straight to MailerLite's public
 * form endpoint, so no server-side code or secrets are needed (docs/PROJECT.md).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // No image server in a static export; images in public/ are pre-sized.
  images: { unoptimized: true },
};

export default nextConfig;
