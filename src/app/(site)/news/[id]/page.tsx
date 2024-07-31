import NewsDetail from "@/components/partials/newsDetail";
import PageWall from "@/components/utils/pageWall";
import db from "@/lib/db";
import { notFound } from "next/navigation";

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
