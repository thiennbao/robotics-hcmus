import Competitions from "@/components/partials/competitions";
import PageWall from "@/components/utils/pageWall";
import { getPageConfig } from "@/lib/pageConfig";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageConfig("competitions");

  return {
    title: "Cuộc thi | Robotics & IoT HCMUS",
    description:
      "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Cuộc thi | Robotics & IoT HCMUS",
      description:
        "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [config.bannerImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cuộc thi | Robotics & IoT HCMUS",
      description:
        "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [config.bannerImage],
    },
  };
}

export default async function CompetitionsPage() {
  const config = await getPageConfig("competitions");

  return (
    <main>
      <PageWall title="CUỘC THI" image={config.bannerImage} />
      <Competitions className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
