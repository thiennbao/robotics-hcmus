import Carousel from "@/components/carousel";
import News from "../../news/_components/news";
import { HTMLAttributes } from "react";

const newsContent = {
  _id: "01232456789",
  title: "Lorem Lmao",
  thumbnail: "/picsum-3.png",
  date: new Date().toDateString(),
};

const NewsCarousel = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl font-bold before:content-['HOTEST'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          NEWS AND BLOGS
        </h2>
        <Carousel withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          <News newsContent={newsContent} className="m-4" />
          <News newsContent={newsContent} className="m-4" />
          <News newsContent={newsContent} className="m-4" />
          <News newsContent={newsContent} className="m-4" />
          <News newsContent={newsContent} className="m-4" />
          <News newsContent={newsContent} className="m-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;
