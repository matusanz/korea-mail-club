import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
