import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { gtmInitScript } from "@/shared/config/gtm";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      {/* Google Tag Manager (owner, 2026-11-22): GA4, Meta Pixel and TikTok Pixel for every visitor. */}
      {analyticsConfig.gtmId && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: gtmInitScript(analyticsConfig.gtmId) }} />
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
