import Image from "next/image";
import Appear from "../utils/appear";
import Carousel from "../utils/carousel";
import { HTMLAttributes } from "react";
import { BsDot } from "react-icons/bs";

const Slide = ({
  content,
  photo,
  name,
  position,
}: {
  content: string;
  photo: string;
  name: string;
  position: string;
}) => {
  return (
    <div className="w-4/5 md:w-3/4 xl:w-3/5 py-16 m-auto">
      <h2 className="mb-8 text-3xl font-bold">Nhận xét từ khách hàng</h2>
      <i className="block mx-auto mb-8 text-xl">{content}</i>
      <div className="flex items-center justify-center">
        <Image
          src={photo}
          alt="Customer photo"
          width={64}
          height={64}
          className="aspect-square object-cover rounded-full mr-4"
        />
        <span>{name}</span>
        <BsDot />
        <span>{position}</span>
      </div>
    </div>
  );
};

const Testimonial = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="text-light bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/about-testimonial.png)] bg-cover bg-center overflow-hidden">
        <Appear
          variant="left"
          viewOption={{ amount: 0.4 }}
          className="h-full flex items-center backdrop-blur-sm text-center"
        >
          <Carousel withPrevNext withCircle className="pb-16">
            <Slide
              content="Venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac"
              photo="/about-testimonial-person-1.png"
              name="Beringar Schmidt"
              position="Customer"
            />
            <Slide
              content="Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque."
              photo="/about-testimonial-person-2.png"
              name="Kiefer Sachs"
              position="Customer"
            />
            <Slide
              content="Freiheit ohne Gesetze bedeutet Anarchie, Gesetze ohne Freiheit bedeutet Tyrannei"
              photo="/about-testimonial-person-3.png"
              name="Tanya von Degurechaff"
              position="Customer"
            />
          </Carousel>
        </Appear>
      </div>
    </section>
  );
};

export default Testimonial;
