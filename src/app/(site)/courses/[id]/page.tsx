import CourseDetail from "@/components/partials/courseDetail";
import CourseGallery from "@/components/partials/courseGallery";
import CourseRegister from "@/components/partials/courseRegister";
import PageWall from "@/components/utils/pageWall";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const name = decodeURIComponent(params.id);
  const course = await db.course.findUnique({ where: { name } });
  if (!course) return {};

  return {
    title: `${course?.name} | Robotics & IoT HCMUS`,
    description: `${course?.name} tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM`,
    openGraph: {
      title: `${course?.name} | Robotics & IoT HCMUS`,
      description: `${course?.name} tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM`,
      type: "website",
      images: [course.thumbnail],
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const name = decodeURIComponent(params.id);
  const course = await db.course.findUnique({ where: { name } });

  if (!course) notFound();

  return (
    <main className="-mt-16 *:my-16 lg:-mt-20 lg:*:my-20">
      <PageWall title={course.name} image={course.thumbnail} />
      <CourseDetail course={course} />
      <CourseGallery gallery={course.gallery} className="overflow-hidden" />
      <CourseRegister course={course} />
    </main>
  );
}
