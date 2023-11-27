import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import CourseArchive from "./CourseArchive";
import { wallpapers } from "assets";

const CoursePage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="COURSES" background={wallpapers[2]} />
      <CourseArchive />
    </SiteLayout>
  )
}

export default CoursePage