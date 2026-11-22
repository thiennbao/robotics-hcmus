import CourseArchive from "@/components/partials/courseArchive";
import PageWall from "@/components/utils/pageWall";
import { getPageConfig } from "@/lib/pageConfig";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageConfig("courses");

  return {
    title: "Khóa học | Robotics & IoT HCMUS",
    description:
      "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Khóa học | Robotics & IoT HCMUS",
      description:
        "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [config.bannerImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Khóa học | Robotics & IoT HCMUS",
      description:
        "Khóa học tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [config.bannerImage],
    },
  };
}

export default async function CoursesPage({ searchParams }: { searchParams: { search: string } }) {
  const config = await getPageConfig("courses");

  return (
    <main>
      <PageWall title="KHÓA HỌC" image={config.bannerImage} />
      <CourseArchive search={searchParams.search} className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
