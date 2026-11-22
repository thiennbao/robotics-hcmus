import { AboutManager } from "@/components/admin/aboutManager";
import { getPageConfig } from "@/lib/pageConfig";

export const dynamic = "force-dynamic";

export default async function AboutDashboardPage() {
  const config = await getPageConfig("about");

  return <AboutManager initialBanner={config.bannerImage} initialContent={config.content} />;
}
