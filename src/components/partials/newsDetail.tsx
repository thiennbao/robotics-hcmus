import { News } from "@prisma/client";
import Appear from "../utils/appear";
import Link from "next/link";
import { HTMLAttributes } from "react";
import SearchBar from "../utils/searchBar";
import db from "@/lib/db";
import Image from "next/image";
import clsx from "clsx";

const NewsDetail = async ({
  news,
  search,
  ...props
}: { news: News; search: string } & HTMLAttributes<HTMLDivElement>) => {
  const otherNews = await db.news.findMany({
    where: { title: { contains: search, mode: "insensitive" } },
    orderBy: { date: "desc" },
    take: 12,
  });

  return (
    <section {...props}>
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12">
        <div className="col-span-2">
          <p className="text-primary text-md">
            {news.date.toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="mb-8 text-2xl font-bold">{news.title}</h2>
          <div
            className={clsx(
              "[&_h1]:text-2xl [&_h1]:mb-4 [&_h1]:font-bold",
              "[&_h2]:text-xl [&_h2]:mb-2 [&_h2]:font-bold",
              "[&_h2]:text-lg [&_h3]:mb-1 [&_h3]:font-bold",
              "[&_.ql-syntax]:bg-[#23241f] [&_.ql-syntax]:text-[#f8f8f2]",
              "[&_a]:text-primary",
              "[&_img]:w-full [&_img]:md:w-1/2 [&_img]:m-auto [&_img]:aspect-video [&_img]:object-cover [&_img]:rounded-md",
              "[&_ol]:list-decimal [&_ol]:px-8",
              "[&_ul]:list-disc [&_ul]:px-8",
              "[&_.ql-align-center]:text-center",
              "[&_.ql-align-right]:text-right",
              "[&_.ql-align-justify]:text-justify"
            )}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
        <div className="overflow-hidden p-2">
          <SearchBar
            paramKey="search"
            className="w-full h-12 px-4 outline-none bg-gray-100 border rounded-lg transition focus:border-primary"
          />
          <div>
            {otherNews.map((news) => (
              <Appear key={news.title} variant="left" className="my-4">
                <Link
                  href={`/news/${news.title}`}
                  className="grid grid-cols-4 shadow-[gray_0_0_4px] rounded-lg overflow-hidden"
                >
                  <div>
                    <Image
                      src={news.thumbnail}
                      alt="News"
                      width={160}
                      height={160}
                      className="h-full aspect-square object-cover"
                    />
                  </div>
                  <div className="col-span-3 h-full px-4 py-2 flex flex-col justify-between">
                    <p className="text-primary mb-2 h-12 overflow-hidden">{news.title}</p>
                    <p className="text-gray-600 text-sm text-right">
                      {news.date.toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </Appear>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
