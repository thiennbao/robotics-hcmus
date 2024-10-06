import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import News from "./news";
import db from "@/lib/db";

const NewsCarousel = async (props: HTMLAttributes<HTMLDivElement>) => {
  const news = await db.news.findMany({ orderBy: { date: "desc" }, take: 12 });

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl text-primary font-bold">TIN TỨC</h2>
        <Carousel withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          {news.map((item) => (
            <div key={item.title} className="p-4 h-full">
              <News news={item} className="shadow-[gray_0_0_4px] rounded-lg overflow-hidden" />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;
