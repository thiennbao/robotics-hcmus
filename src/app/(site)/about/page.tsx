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
    <main>
      <PageWall title="GIỚI THIỆU" image="/wallpaper-about.png" />
      <Introduction className="min-h-screen flex py-24 -mb-24" />
      <Award
        awards={[
          { image: "/about-gallery-0.png", title: "Lorem ipsum odor amet" },
          { image: "/about-gallery-1.png", title: "Consectetuer adipiscing elit" },
          { image: "/about-gallery-2.png", title: "Non eget per volutpat mi facilisi" },
          { image: "/about-gallery-3.png", title: "Suscipit bibendum odio morbi" },
          { image: "/about-gallery-4.png", title: "Amet vel fringilla ultrices" },
          { image: "/about-gallery-5.png", title: "Tempor ridiculus ultrices" },
          { image: "/about-gallery-6.png", title: "Tristique scelerisque nascetur" },
          { image: "/about-gallery-7.png", title: "Venenatis orci morbi habitant non dolor magna" },
          { image: "/about-gallery-8.png", title: "Dignissim fusce rutrum malesuada mattis sit elementum" },
          {
            image: "/about-gallery-9.png",
            title: "Lobortis pretium tempus sociosqu tortor morbi convallis efficitur ligula proin",
          },
        ]}
        className="container mt-24 mb-12 overflow-hidden"
      />
    </main>
  );
}

export const dynamic = "force-dynamic";
