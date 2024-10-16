import Carousel from "../utils/carousel";
import db from "@/lib/db";
import Banner from "./banner";

const HomeWall = async () => {
  const banners = await db.banner.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="h-screen bg-gray-200">
      <Carousel auto={8000} withPrevNext withCircle className="h-full">
        {banners.map((banner) => (
          <Banner banner={banner} key={banner.name} />
        ))}
      </Carousel>
    </section>
  );
};

export default HomeWall;
