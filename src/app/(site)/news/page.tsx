import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức | Robotics & IoT HCMUS",
  description:
    "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
  openGraph: {
    title: "Tin tức | Robotics & IoT HCMUS",
    description:
      "Tin tức tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    type: "website",
    images: ["/wallpaper-news.png"],
  },
};

export default function NewsPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="TIN TỨC" image="/wallpaper-news.png" />
      <NewsArchive search={searchParams.search} className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
