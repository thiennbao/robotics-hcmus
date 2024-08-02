import NewsDetail from "@/components/partials/newsDetail";
import PageWall from "@/components/utils/pageWall";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const title = decodeURI(params.id);
  const news = await db.news.findUnique({ where: { title } });
  if (!news) return {};

  return {
    title: `${news?.title} | Robotics & IoT HCMUS`,
    description: `About the news ${news.title} at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM`,
    openGraph: {
      title: `${news?.title} | Robotics & IoT HCMUS`,
      description: `About the news ${news.title} at Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM`,
      type: "website",
      images: [news.thumbnail],
    },
  };
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) {
  const title = decodeURI(params.id);
  const news = await db.news.findUnique({ where: { title } });

  if (!news) notFound();

  return (
    <main>
      <PageWall title={news.title} image={news.thumbnail} />
      <NewsDetail news={news} search={searchParams.search} className="my-24" />
    </main>
  );
}
