import Description from "@/components/partials/description";
import Features from "@/components/partials/features";
import Quote from "@/components/partials/quote";
import Testimonial from "@/components/partials/testimonial";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Robotics & IoT HCMUS",
  description:
    "About Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
  openGraph: {
    title: "About | Robotics & IoT HCMUS",
    description:
      "About Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
    type: "website",
    images: ["/wallpaper-about.png"],
  },
};

export default function AboutPage() {
  return (
    <main>
      <PageWall title="ABOUT US" image="/wallpaper-about.png" />
      <Description className="min-h-screen flex py-24 -mb-24" />
      <Quote className="min-h-screen flex py-24 -mb-24" />
      <Features className="min-h-screen flex py-24 -mb-24" />
      <Testimonial className="min-h-screen flex py-24 -mb-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
