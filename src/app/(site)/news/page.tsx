import PageWall from "@/components/pageWall";
import NewsArchive from "./_components/newsArchive";

export default function NewsPage() {
  return (
    <main>
      <PageWall title="NEWS AND BLOGS" image="/picsum-3.png" />
      <NewsArchive className="min-h-screen flex py-24" />
    </main>
  );
}
