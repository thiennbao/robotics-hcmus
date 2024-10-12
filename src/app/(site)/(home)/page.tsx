import CourseCarousel from "@/components/partials/courseCarousel";
import Brief from "@/components/partials/brief";
import HomeWall from "@/components/partials/homeWall";
import NewsCarousel from "@/components/partials/newsCarousel";
import db from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const banners = await db.banner.findMany({ select: { desktopImg: true } });

  return {
    title: "Robotics & IoT HCMUS",
    description:
      "Câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Robotics & IoT HCMUS",
      description:
        "Câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [...banners.map((banner) => banner.desktopImg)],
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <HomeWall />
      <Brief className="min-h-screen flex py-24 -mb-24" />
      <CourseCarousel className="min-h-screen flex py-24 -mb-24" />
      <NewsCarousel className="min-h-screen py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
