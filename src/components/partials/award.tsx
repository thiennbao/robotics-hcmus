import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import Image from "next/image";

const Award = ({
  awards,
  title,
  ...props
}: { awards: { image: string; title: string }[] } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <h2 className="mb-4 text-2xl text-primary font-bold text-center">HOẠT ĐỘNG - GIẢI THƯỞNG</h2>
      <Carousel auto={4000} withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
        {awards.map((item) => (
          <div key={item.image} className="p-[6px]">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={450}
              className="h-full w-full aspect-video object-cover brightness-50"
            />
            <p className="text-center p-2 w-3/4 m-auto italic text-sm">{item.title}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Award;
