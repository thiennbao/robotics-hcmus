import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | Robotics & IoT HCMUS",
  description:
    "News and blogs at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
  openGraph: {
    title: "News | Robotics & IoT HCMUS",
    description:
      "News and blogs at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
    type: "website",
    images: ["/wallpaper-news.png"],
  },
};

export default function NewsPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="NEWS AND BLOGS" image="/wallpaper-news.png" />
      <NewsArchive search={searchParams.search} className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
