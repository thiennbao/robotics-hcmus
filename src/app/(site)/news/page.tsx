import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";
import { getFile } from "@/lib/storage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tin tức | Robotics & IoT HCMUS",
    description:
      "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Tin tức | Robotics & IoT HCMUS",
      description:
        "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [await getFile("static/wallpaper-news.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tin tức | Robotics & IoT HCMUS",
      description:
        "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [await getFile("static/wallpaper-news.png")],
    },
  };
}

export default function NewsPage({ searchParams }: { searchParams: { search: string; take: string } }) {
  return (
    <main>
      <PageWall title="TIN TỨC" image="static/wallpaper-news.png" />
      <NewsArchive searchParams={searchParams} className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
