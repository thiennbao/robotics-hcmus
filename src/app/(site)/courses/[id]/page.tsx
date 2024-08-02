import CourseDetail from "@/components/partials/courseDetail";
import CourseRegister from "@/components/partials/courseRegister";
import PageWall from "@/components/utils/pageWall";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const name = decodeURI(params.id);
  const course = await db.course.findUnique({ where: { name } });
  if (!course) return {};

  return {
    title: `${course?.name} | Robotics & IoT HCMUS`,
    description: `About the course ${course?.name} at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM`,
    openGraph: {
      title: `${course?.name} | Robotics & IoT HCMUS`,
      description: `About the course ${course?.name} at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM`,
      type: "website",
      images: [course.thumbnail],
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const name = decodeURI(params.id);
  const course = await db.course.findUnique({ where: { name } });

  if (!course) notFound();

  return (
    <main>
      <PageWall title={course.name} image={course.thumbnail} />
      <CourseDetail course={course} className="min-h-screen flex py-24" />
      <CourseRegister course={course} />
    </main>
  );
}
