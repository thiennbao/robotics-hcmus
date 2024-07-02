import NewsArchive from "@/components/partials/newsArchive";
import PageWall from "@/components/utils/pageWall";

export default function NewsPage() {
  return (
    <main>
      <PageWall title="NEWS AND BLOGS" image="/picsum-3.png" />
      <NewsArchive className="min-h-screen flex py-24" />
    </main>
  );
}
