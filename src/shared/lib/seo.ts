import type { Metadata } from "next";
import { isIndexable, siteConfig } from "@/shared/config/site";

/** Page metadata with an absolute canonical URL; `noindex` for private pages and non-production builds. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const index = isIndexable && !noindex;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: !noindex },
  };
}
