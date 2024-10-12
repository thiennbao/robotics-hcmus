import Introduction from "@/components/partials/introduction";
import Testimonial from "@/components/partials/testimonial";
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
    <main>
      <PageWall title="GIỚI THIỆU" image="/wallpaper-about.png" />
      <Introduction className="min-h-screen flex py-24 -mb-24" />
      <Testimonial className="min-h-screen flex pt-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
