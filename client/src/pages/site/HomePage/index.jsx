import SiteLayout from "layouts/SiteLayout";
import HomeWall from "./HomeWall";
import Description from "pages/site/AboutPage/Description";
import ImageRow from "./ImageRow";
import Event from "pages/site/NewsPage/Event";
import Special from "pages/site/AboutPage/Special";
import Courses from "pages/site/CoursesPage/Courses";
import Testimonial from "./Testimonial";
import Team from "pages/site/AboutPage/Team";
import Timetable from "pages/site/CoursesPage/Timetable";
import Map from "pages/site/ContactPage/Map";

const HomePage = () => {
  return (
    <SiteLayout>
      <HomeWall />
      <Description />
      <ImageRow />
      <Event />
      <Special />
      <Courses limit={8} />
      <Testimonial />
      <Team limit={4} />
      <Timetable />
      <Map />
    </SiteLayout>
  );
};

export default HomePage;
