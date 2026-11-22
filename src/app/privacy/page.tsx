import { PrivacyPage } from "@/features/privacy/components/PrivacyPage";
import { siteConfig } from "@/shared/config/site";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: `Privacy notice — ${siteConfig.name}`,
  description: "How Korea Mail Club handles the details you share when registering for a postcard: what is collected, Tally and Google Sheets, cookies and analytics, retention and deletion.",
  path: "/privacy/",
});

export default function Page() {
  return <PrivacyPage />;
}
