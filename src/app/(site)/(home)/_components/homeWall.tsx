import Carousel from "@/components/carousel";
import Image from "next/image";

const HomeWall = () => {
  return (
    <section className="h-screen">
      <Carousel withPrevNext withCircle className="h-full">
        <Image
          src="/picsum-1.png"
          alt="Banner"
          width={1600}
          height={900}
          className="h-full w-full object-cover brightness-50"
        />
        <Image
          src="/picsum-2.png"
          alt="Banner"
          width={1600}
          height={900}
          className="h-full w-full object-cover brightness-50"
        />
        <Image
          src="/picsum-3.png"
          alt="Banner"
          width={1600}
          height={900}
          className="h-full w-full object-cover brightness-50"
        />
        <Image
          src="/picsum-4.png"
          alt="Banner"
          width={1600}
          height={900}
          className="h-full w-full object-cover brightness-50"
        />
      </Carousel>
    </section>
  );
};

export default HomeWall;
