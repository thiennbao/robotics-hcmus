import Carousel from "@/components/carousel";
import Course from "../../courses/_components/course";
import { HTMLAttributes } from "react";

// Temp content
const courseContent = {
  _id: "01232456789",
  name: "Lorem Lmao",
  thumbnail: "/picsum-2.png",
  description:
    "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
};

const CourseCarousel = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl font-bold before:content-['OUR_HOT'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          COURSES
        </h2>
        <Carousel
          withPrevNext
          itemsOnScreen={{ df: 1, md: 2, xl: 3 }}
          className="-mx-4"
        >
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
          <Course
            courseContent={courseContent}
            className="shadow-[lightgray_0_0_2px] m-4"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default CourseCarousel;
