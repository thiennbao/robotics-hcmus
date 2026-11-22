import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";
import { getPageConfig } from "@/lib/pageConfig";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageConfig("news");

  return {
    title: "Tin tức | Robotics & IoT HCMUS",
    description:
      "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Tin tức | Robotics & IoT HCMUS",
      description:
        "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [config.bannerImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tin tức | Robotics & IoT HCMUS",
      description:
        "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [config.bannerImage],
    },
  };
}

export default async function NewsPage({ searchParams }: { searchParams: { search: string; take: string } }) {
  const config = await getPageConfig("news");

  return (
    <main>
      <PageWall title="TIN TỨC" image={config.bannerImage} />
      <NewsArchive searchParams={searchParams} className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
