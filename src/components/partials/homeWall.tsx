import Carousel from "../utils/carousel";

const HomeWall = () => {
  return (
    <section className="h-screen">
      <Carousel withPrevNext withCircle className="h-full">
        <img
          src="/picsum-1.png"
          alt="Banner 1"
          className="h-full w-full object-cover brightness-50"
        />
        <img
          src="/picsum-2.png"
          alt="Banner 2"
          className="h-full w-full object-cover brightness-50"
        />
        <img
          src="/picsum-3.png"
          alt="Banner 3"
          className="h-full w-full object-cover brightness-50"
        />
        <img
          src="/picsum-4.png"
          alt="Banner 4"
          className="h-full w-full object-cover brightness-50"
        />
      </Carousel>
    </section>
  );
};

export default HomeWall;
