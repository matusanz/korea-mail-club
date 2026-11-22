/**
 * Google Tag Manager bootstrap (owner's snippet, 2026-11-22). GTM loads Google Analytics, Meta Pixel and TikTok
 * Pixel for every visitor — no consent banner (owner's decision, 2026-11-22; tag setup: docs/PROJECT.md → Analytics).
 *
 * gtm.js is injected by this inline script rather than rendered as a JSX <script async src>, because React hoists
 * those above inline scripts; this keeps the owner's `gtag('js', …)` start command ahead of gtm.js.
 */
export const gtmInitScript = (gtmId: string) =>
  [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    "var kmcGtm = document.createElement('script');",
    `kmcGtm.async = true; kmcGtm.src = 'https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}';`,
    "document.head.appendChild(kmcGtm);",
  ].join("\n");
