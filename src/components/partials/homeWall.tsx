import Carousel from "../utils/carousel";
import Image from "next/image";
import db from "@/lib/db";

const HomeWall = async () => {
  const banners = await db.banner.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="h-screen bg-gray-200">
      <Carousel withPrevNext withCircle className="h-full">
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
