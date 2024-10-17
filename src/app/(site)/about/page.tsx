import Award from "@/components/partials/award";
import Introduction from "@/components/partials/introduction";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | Robotics & IoT HCMUS",
  description:
    "Giới thiệu câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
  openGraph: {
    title: "Giới thiệu | Robotics & IoT HCMUS",
    description:
      "Giới thiệu câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    type: "website",
    images: ["/wallpaper-about.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="-mt-16 *:my-16 lg:-mt-20 lg:*:my-20">
      <PageWall title="GIỚI THIỆU" image="/wallpaper-about.png" />
      <Introduction />
      <Award />
    </main>
  );
}

export const dynamic = "force-dynamic";
