import { News as NewsModel } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

const News = ({ news, className, ...props }: { news: NewsModel } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx(className, "h-full flex flex-col")} {...props}>
      <div>
        <Image src={news.thumbnail} alt={news.title} width={800} height={450} className="aspect-video object-cover" />
      </div>
      <div className="flex-grow flex flex-col justify-between gap-6 p-6">
        <div>
          <Link href={`/news/${news.title}`} className="text-xl text-primary font-bold mb-2 line-clamp-3">
            {news.title}
          </Link>
          <p className="line-clamp-4">
            {new Date(news.date).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <Link href={`/news/${news.title}`}>
            <button className="w-32 h-10 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white">
              Xem chi tiết
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
