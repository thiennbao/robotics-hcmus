import Appear from "@/components/appear";
import Carousel from "@/components/carousel";
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
      <h2 className="mb-8 text-3xl font-bold before:content-['CUSTOMER_TESTIMONIAL'] before:block before:text-primary before:text-[0.6em] before:font-normal">
        What they say about us
      </h2>
      <i className="block mx-auto mb-8 text-xl">{content}</i>
      <div className="flex items-center justify-center">
        <img
          src={photo}
          alt="Customer photo"
          className="w-16 aspect-square object-cover rounded-full mr-4"
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
      <div className="text-light bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/picsum-1.png)] bg-cover bg-center overflow-hidden">
        <Appear
          variant="left"
          viewOption={{ amount: 0.4 }}
          className="h-full flex items-center backdrop-blur-sm text-center"
        >
          <Carousel withPrevNext withCircle className="pb-16">
            <Slide
              content="Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque."
              photo="/picsum-1.png"
              name="Lorem Lmao"
              position="Customer"
            />
            <Slide
              content="Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque."
              photo="/picsum-1.png"
              name="Lorem Lmao"
              position="Customer"
            />
            <Slide
              content="Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque."
              photo="/picsum-1.png"
              name="Lorem Lmao"
              position="Customer"
            />
          </Carousel>
        </Appear>
      </div>
    </section>
  );
};

export default Testimonial;