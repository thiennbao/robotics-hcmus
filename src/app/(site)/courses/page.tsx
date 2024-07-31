import CourseArchive from "@/components/partials/courseArchive";
import PageWall from "@/components/utils/pageWall";

export default function CoursesPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="COURSES" image="/wallpaper-courses.png" />
      <CourseArchive search={searchParams.search} className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
