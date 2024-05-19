import Description from "../about/_components/description";
import ContactInfo from "../contact/_components/contactInfo";
import CourseCarousel from "./_components/courseCarousel";
import HomeWall from "./_components/homeWall";
import NewsCarousel from "./_components/newsCarousel";

export default function HomePage() {
  return (
    <main>
      <HomeWall />
      <Description className="min-h-screen flex py-24 -mb-24" />
      <CourseCarousel className="min-h-screen flex py-24 -mb-24" />
      <NewsCarousel className="min-h-screen py-24 -mb-24" />
      <ContactInfo className="min-h-screen flex py-24" />
    </main>
  );
}
