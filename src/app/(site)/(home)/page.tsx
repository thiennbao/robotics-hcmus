import ContactInfo from "@/components/partials/contactInfo";
import CourseCarousel from "@/components/partials/courseCarousel";
import Description from "@/components/partials/description";
import HomeWall from "@/components/partials/homeWall";
import NewsCarousel from "@/components/partials/newsCarousel";

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

export const dynamic = "force-dynamic";
