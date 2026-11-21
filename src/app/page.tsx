import { HomePage } from "@/features/home/components/HomePage";
import { siteConfig } from "@/shared/config/site";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
