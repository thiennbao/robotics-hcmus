import Carousel from "../utils/carousel";
import db from "@/lib/db";
import Image from "next/image";

const HomeWall = async () => {
  const banners = await db.banner.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="aspect-video lg:aspect-auto lg:h-screen bg-gray-200">
      <Carousel auto={8000} withPrevNext withCircle className="h-full">
        {banners.map((banner) => (
          <Image
            key={banner.name}
            src={banner.image}
            alt={banner.name}
            width={1600}
            height={900}
            className="h-full w-full object-cover brightness-50"
          />
        ))}
      </Carousel>
    </section>
  );
};

export default HomeWall;
