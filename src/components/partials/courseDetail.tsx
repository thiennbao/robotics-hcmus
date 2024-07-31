import { Course } from "@prisma/client";
import Appear from "../utils/appear";
import Carousel from "../utils/carousel";
import Image from "next/image";
import { HTMLAttributes } from "react";
import {
  BsCheck2All,
  BsClock,
  BsExclamationCircle,
  BsInfoCircle,
  BsJournal,
  BsPerson,
} from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";

const CourseDetail = ({
  course,
  ...props
}: { course: Course } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div>
            <h2 className="mb-8 text-3xl font-bold before:content-['COURSE_DETAILS'] before:block before:text-primary before:text-[0.6em] before:font-normal">
              {course.name}
            </h2>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsInfoCircle className="text-xl text-primary" />
              </div>
              <div>Description: {course.description}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsCheck2All className="text-xl text-primary" />
              </div>
              <div>Objectives: {course.objective}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsPerson className="text-xl text-primary" />
              </div>
              <div>Age: {course.age}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsJournal className="text-xl text-primary" />
              </div>
              <div>Lessons: {course.lesson}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsClock className="text-xl text-primary" />
              </div>
              <div>Time: {course.time}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <IoCalendarClearOutline className="text-xl text-primary" />
              </div>
              <div>Expected opening date: {course.openDate}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsExclamationCircle className="text-xl text-primary" />
              </div>
              <div>Requirement: {course.requirement}</div>
            </Appear>
          </div>
        </div>
        <div className="lg:w-5/12 overflow-hidden">
          <Appear variant="left" className="h-full">
            <Carousel withPrevNext withCircle className="h-full">
              {course.gallery.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt="Course photo"
                  width={900}
                  height={900}
                  className="w-auto h-full object-cover rounded-lg"
                />
              ))}
            </Carousel>
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
