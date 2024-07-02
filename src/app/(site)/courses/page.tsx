import CourseArchive from "@/components/partials/courseArchive";
import PageWall from "@/components/utils/pageWall";

export default function CoursesPage() {
  return (
    <main>
      <PageWall title="COURSES" image="/picsum-2.png" />
      <CourseArchive className="min-h-screen flex py-24" />
    </main>
  );
}
