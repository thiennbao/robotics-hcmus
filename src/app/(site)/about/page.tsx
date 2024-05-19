import PageWall from "@/components/pageWall";
import Description from "./_components/description";
import Quote from "./_components/quote";
import Features from "./_components/features";
import Testimonial from "./_components/testimonial";

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
