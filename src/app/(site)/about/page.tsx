import Description from "@/components/partials/description";
import Features from "@/components/partials/features";
import Quote from "@/components/partials/quote";
import Testimonial from "@/components/partials/testimonial";
import PageWall from "@/components/utils/pageWall";

export default function AboutPage() {
  return (
    <main>
      <PageWall title="ABOUT US" image="/picsum-1.png" />
      <Description className="min-h-screen flex py-24 -mb-24" />
      <Quote className="min-h-screen flex py-24 -mb-24" />
      <Features className="min-h-screen flex py-24 -mb-24" />
      <Testimonial className="min-h-screen flex py-24 -mb-24" />
    </main>
  );
}
