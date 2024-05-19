import PageWall from "@/components/pageWall";
import CourseArchive from "./_components/courseArchive";

export default function CoursesPage() {
  return (
    <main>
      <PageWall title="COURSES" image="/picsum-2.png" />
      <CourseArchive className="min-h-screen flex py-24" />
    </main>
  );
}
