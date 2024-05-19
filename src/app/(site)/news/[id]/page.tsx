import PageWall from "@/components/pageWall";
import NewsDetail from "./_components/newsDetail";

export default function NewsDetailPage() {
  // Fetch course data from database
  const news = {
    title: "Lorem Lmao",
    thumbnail: "/picsum-3.png",
    content:
      "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
    photos: ["/picsum-3.png", "/picsum-3.png"],
  };

  return (
    <main>
      <PageWall title={news.title} image={news.thumbnail} />
      <NewsDetail news={news} className="my-24" />
    </main>
  );
}
