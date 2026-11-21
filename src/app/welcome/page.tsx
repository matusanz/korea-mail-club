import { WelcomePage } from "@/features/welcome/components/WelcomePage";
import { siteConfig } from "@/shared/config/site";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: `Welcome — ${siteConfig.name}`,
  description: "Your email is confirmed. Welcome to Korea Mail Club.",
  path: "/welcome/",
  noindex: true,
});

export default function Page() {
  return <WelcomePage />;
}
