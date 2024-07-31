import CourseDetail from "@/components/partials/courseDetail";
import CourseRegister from "@/components/partials/courseRegister";
import PageWall from "@/components/utils/pageWall";
import db from "@/lib/db";
import { notFound } from "next/navigation";

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
