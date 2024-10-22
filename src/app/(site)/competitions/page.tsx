import Competitions from "@/components/partials/competitions";
import PageWall from "@/components/utils/pageWall";
import { getFile } from "@/lib/storage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cuộc thi | Robotics & IoT HCMUS",
    description:
      "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Cuộc thi | Robotics & IoT HCMUS",
      description:
        "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [await getFile("static/wallpaper-competitions.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cuộc thi | Robotics & IoT HCMUS",
      description:
        "Cuộc thi tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [await getFile("static/wallpaper-competitions.png")],
    },
  };
}

export default function CompetitionsPage() {
  return (
    <main>
      <PageWall title="CUỘC THI" image="static/wallpaper-competitions.png" />
      <Competitions className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
