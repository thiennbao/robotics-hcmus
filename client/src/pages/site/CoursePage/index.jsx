import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import CourseArchive from "./CourseArchive";
import { wallpaper_courses } from "assets";

const CoursePage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="COURSES" background={wallpaper_courses} />
      <CourseArchive />
    </SiteLayout>
  );
};

export default CoursePage;
