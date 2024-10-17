import db from "@/lib/db";
import Appear from "../utils/appear";
import News from "./news";
import { HTMLAttributes } from "react";
import SearchBar from "../utils/searchBar";
import LoadButton from "../utils/loadButton";

const NewsArchive = async ({
  searchParams,
  ...props
}: { searchParams: { search: string; take: string } } & HTMLAttributes<HTMLDivElement>) => {
  const take = Math.max(Number(searchParams.take) || 6, 1);

  const news = await db.news.findMany({
    where: { title: { contains: searchParams.search, mode: "insensitive" } },
    take,
    orderBy: { date: "desc" },
  });
  const count = await db.news.count({
    where: { title: { contains: searchParams.search, mode: "insensitive" } },
  });

  return (
    <section {...props}>
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold before:content-['DANH_SÁCH'] before:block before:text-primary before:text-[0.6em] before:font-normal">
            TIN TỨC
          </h2>
          <div className="lg:w-3/4 xl:w-1/2 mx-auto mt-12 mb-16">
            <SearchBar
              paramKey="search"
              className="w-full h-12 px-4 outline-none bg-gray-100 border rounded-lg transition focus:border-primary"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Appear key={item.title} variant="up" viewOption={{ amount: 0.4 }} delay={(index % 3) * 0.1}>
              <News news={item} className="shadow-[gray_0_0_4px] rounded-lg overflow-hidden" />
            </Appear>
          ))}
        </div>
        <div className="mt-4">
          <Appear variant="up" className="flex justify-center">
            {count > news.length && (
              <LoadButton
                paramKey="take"
                amount={6}
                className="w-32 h-10 mt-8 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white"
              >
                Tải thêm
              </LoadButton>
            )}
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default NewsArchive;
