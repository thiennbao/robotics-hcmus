import SiteLayout from "layouts/SiteLayout";
import HomeWall from "./HomeWall";
import Description from "pages/AboutPage/Description";
import ImageRow from "./ImageRow";
import HotNews from "pages/NewsPage/HotNews";
import Special from "pages/AboutPage/Special";
import Courses from "pages/CoursesPage/Courses";
import Testimonial from "./Testimonial";
import Team from "pages/AboutPage/Team";
import Timetable from "pages/CoursesPage/Timetable";

const HomePage = () => {
  return (
    <SiteLayout>
      <HomeWall />
      <Description />
      <ImageRow />
      <HotNews />
      <Special />
      <Courses limit={8} />
      <Testimonial />
      <Team limit={4} />
      <Timetable />
    </SiteLayout>
  );
};

export default HomePage;
