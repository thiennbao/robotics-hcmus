import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import Image from "next/image";

const Award = (props: HTMLAttributes<HTMLDivElement>) => {
  const awards = [
    { image: "/about-award-1.png", title: "Lorem ipsum odor amet" },
    { image: "/about-award-2.png", title: "Consectetuer adipiscing elit" },
    { image: "/about-award-3.png", title: "Non eget per volutpat mi facilisi" },
    { image: "/about-award-4.png", title: "Suscipit bibendum odio morbi" },
    { image: "/about-award-5.png", title: "Amet vel fringilla ultrices" },
    { image: "/about-award-6.png", title: "Tempor ridiculus ultrices" },
    { image: "/about-award-7.png", title: "Tristique scelerisque nascetur" },
    { image: "/about-award-8.png", title: "Venenatis orci morbi habitant non dolor magna" },
    { image: "/about-award-9.png", title: "Dignissim fusce rutrum malesuada mattis sit elementum" },
    { image: "/about-award-10.png", title: "Lobortis pretium tempus sociosqu tortor morbi" },
  ];

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl text-primary font-bold text-center">HOẠT ĐỘNG - GIẢI THƯỞNG</h2>
        <Carousel auto={4000} withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          {awards.map((item) => (
            <div key={item.image} className="p-[6px]">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={450}
                className="h-full w-full aspect-video object-cover rounded-md"
              />
              <p className="text-center p-2 w-3/4 m-auto italic text-sm">{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Award;
