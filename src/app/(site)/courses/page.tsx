import CourseArchive from "@/components/partials/courseArchive";
import { getFile } from "@/lib/storage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Khóa học | Robotics & IoT HCMUS",
    description:
      "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Khóa học | Robotics & IoT HCMUS",
      description:
        "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [await getFile("static/wallpaper-courses.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: "Khóa học | Robotics & IoT HCMUS",
      description:
        "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [await getFile("static/wallpaper-courses.png")],
    },
  };
}

export default function CoursesPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <div aria-hidden="true" className="h-32 bg-[#14294b]" />
      <CourseArchive search={searchParams.search} />
    </main>
  );
}

export const dynamic = "force-dynamic";
