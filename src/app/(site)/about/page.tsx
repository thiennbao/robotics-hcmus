import Activity from "@/components/partials/activity";
import Introduction from "@/components/partials/introduction";
import PageWall from "@/components/utils/pageWall";
import { getFile } from "@/lib/storage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Giới thiệu | Robotics & IoT HCMUS",
    description:
      "Giới thiệu câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Giới thiệu | Robotics & IoT HCMUS",
      description:
        "Giới thiệu câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [await getFile("static/wallpaper-about.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới thiệu | Robotics & IoT HCMUS",
      description:
        "Giới thiệu câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [await getFile("static/wallpaper-about.png")],
    },
  };
}

export default function AboutPage() {
  return (
    <main className="-mt-16 *:my-16 lg:-mt-20 lg:*:my-20">
      <PageWall title="GIỚI THIỆU" image="static/wallpaper-about.png" />
      <Introduction />
      <Activity />
    </main>
  );
}

export const dynamic = "force-dynamic";
