import CourseArchive from "@/components/partials/courseArchive";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Robotics & IoT HCMUS",
  description:
    "Courses at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
  openGraph: {
    title: "Courses | Robotics & IoT HCMUS",
    description:
      "Courses at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
    type: "website",
    images: ["/wallpaper-courses.png"],
  },
};

export default function CoursesPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="COURSES" image="/wallpaper-courses.png" />
      <CourseArchive search={searchParams.search} className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
