import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import Course from "./course";
import db from "@/lib/db";

const CourseCarousel = async (props: HTMLAttributes<HTMLDivElement>) => {
  const courses = await db.course.findMany();

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl font-bold before:content-['OUR_HOT'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          COURSES
        </h2>
        <Carousel withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          {courses.map((course) => (
            <div key={course.name} className="p-4 h-full">
              <Course course={course} className="shadow-[gray_0_0_4px] rounded-lg overflow-hidden" />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CourseCarousel;
