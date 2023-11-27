import SiteLayout from "layouts/SiteLayout";
import HomeWall from "./HomeWall";
import Description from "../AboutPage/Description";
import CourseSlide from "./CourseSlide";
import BlogSlide from "./BlogSlide";
import ContactInfo from "../ContactPage/ContactInfo";

const HomePage = () => {
  return (
    <SiteLayout>
      <HomeWall />
      <Description />
      <CourseSlide />
      <BlogSlide />
      <ContactInfo />
    </SiteLayout>
  );
};

export default HomePage;
