import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import Image from "next/image";

const courseGallery = ({ gallery, ...props }: { gallery: string[] } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <Carousel withPrevNext auto={4000} itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-[6px]">
          {gallery.map((image) => (
            <div key={image} className="p-[6px]">
              <Image
                key={image}
                src={image}
                alt={image}
                width={1600}
                height={900}
                className="h-full w-full aspect-video object-cover brightness-50 rounded-md"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default courseGallery;
