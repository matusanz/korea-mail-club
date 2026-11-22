import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { analyticsConfig, siteConfig } from "@/shared/config/site";
import "@/shared/styles/globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-manrope", display: "swap" });

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

/** Google Tag Manager, as provided by the owner (2026-11-22). Omitted when no valid container ID is configured. */
const gtmInit = "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      {analyticsConfig.gtmId && (
        <head>
          <script async src={`https://www.googletagmanager.com/gtm.js?id=${analyticsConfig.gtmId}`} />
          <script dangerouslySetInnerHTML={{ __html: gtmInit }} />
        </head>
      )}
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
