import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Courses from "./Courses";
import Timetable from "./Timetable";
import FooterImages from "components/FooterImages";

const CoursesPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="COURSES" />
      <Timetable />
      <Courses />
      <FooterImages />
    </SiteLayout>
  )
}

export default CoursesPage