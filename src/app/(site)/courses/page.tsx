import CourseArchive from "@/components/partials/courseArchive";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khóa học | Robotics & IoT HCMUS",
  description:
    "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
  openGraph: {
    title: "Khóa học | Robotics & IoT HCMUS",
    description:
      "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    type: "website",
    images: ["/wallpaper-courses.png"],
  },
};

export default function CoursesPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="KHÓA HỌC" image="static/wallpaper-courses.png" />
      <CourseArchive search={searchParams.search} className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
