import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import Image from "next/image";

const courseGallery = ({ gallery, ...props }: { gallery: string[] } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <Carousel withPrevNext auto itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
        {gallery.map((image) => (
          <div key={image} className="p-1">
            <Image
              key={image}
              src={image}
              alt={image}
              width={1600}
              height={900}
              className="h-full w-full aspect-video object-cover brightness-50"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default courseGallery;
