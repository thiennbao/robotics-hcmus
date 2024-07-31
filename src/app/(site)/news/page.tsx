import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";

export default function NewsPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <main>
      <PageWall title="NEWS AND BLOGS" image="/wallpaper-news.png" />
      <NewsArchive search={searchParams.search} className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
