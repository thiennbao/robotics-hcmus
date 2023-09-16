import SiteLayout from "layouts/SiteLayout";
import HomeWall from "./HomeWall";
import Description from "pages/AboutPage/Description";
import ImageRow from "components/ImageRow";
import Courses from "pages/CoursesPage/Courses";

import course1 from "assets/course-1.jpg";
import course2 from "assets/course-2.jpg";
import course3 from "assets/course-3.jpg";
import course4 from "assets/course-4.jpg";
import Special from "pages/AboutPage/Special";
import Testimonial from "./Testimonial";
import Team from "pages/AboutPage/Team";
import HotNews from "pages/NewsPage/HotNews";

const HomePage = () => {
  return (
    <SiteLayout>
      <HomeWall />
      <Description />
      <ImageRow
        images={[course1, course2, course3, course4]}
        height="80vh"
        brightness="0.4"
        contents={["WEDO", "SPIKE PRIME", "MINDSTORMS", "ARDUINO"]}
        fontSize="30px"
      />
      <HotNews />
      <Special />
      <Courses limit={8} />
      <Testimonial />
      <Team />
      <ImageRow
        images={[course1, course2, course3, course4, course1]}
        brightness="0.4"
        fontSize="30px"
      />
    </SiteLayout>
  );
};

export default HomePage;
