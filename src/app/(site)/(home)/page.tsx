import ContactInfo from "@/components/partials/contactInfo";
import CourseCarousel from "@/components/partials/courseCarousel";
import Description from "@/components/partials/description";
import HomeWall from "@/components/partials/homeWall";
import NewsCarousel from "@/components/partials/newsCarousel";
import db from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const banners = await db.banner.findMany({ select: { image: true } });

  return {
    title: "Robotics & IoT HCMUS",
    description: "Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
    openGraph: {
      title: "Robotics & IoT HCMUS",
      description: "Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
      type: "website",
      images: [...banners.map((banner) => banner.image)],
    },
  };
}

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
