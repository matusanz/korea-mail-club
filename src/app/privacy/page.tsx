import { PrivacyPage } from "@/features/privacy/components/PrivacyPage";
import { siteConfig } from "@/shared/config/site";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: `Privacy notice — ${siteConfig.name}`,
  description: "How Korea Mail Club and MailerLite handle the details you share when joining the mailing list.",
  path: "/privacy/",
});

export default function Page() {
  return <PrivacyPage />;
}
