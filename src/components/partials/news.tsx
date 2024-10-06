import { News as NewsModel } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

const News = ({ news, className, ...props }: { news: NewsModel } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx(className, "h-full flex flex-col")} {...props}>
      <Link href={`/news/${news.title}`}>
        <Image src={news.thumbnail} alt={news.title} width={800} height={800} className="aspect-[4/3] object-cover" />
        <div className="p-6">
          <p className="text-lg text-primary font-bold mb-2">
            {news.title.length > 100 ? `${news.title.slice(0, 100)}...` : news.title}
          </p>
          <p className="text-gray-600">
            {new Date(news.date).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default News;
