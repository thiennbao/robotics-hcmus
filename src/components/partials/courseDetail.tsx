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

interface Props extends HTMLAttributes<HTMLDivElement> {
  course: {
    name: string;
    thumbnail: string;
    description: string;
    objective: string;
    age: string;
    lesson: string;
    duration: string;
    requirement: string;
    photos: string[];
  };
}

const CourseDetail = ({ course, ...props }: Props) => {
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
                <BsInfoCircle className="text-2xl text-primary" />
              </div>
              <div>Description: {course.description}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsCheck2All className="text-2xl text-primary" />
              </div>
              <div>Objectives: {course.objective}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsPerson className="text-2xl text-primary" />
              </div>
              <div>Age: {course.age}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsJournal className="text-2xl text-primary" />
              </div>
              <div>Lessons: {course.lesson}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsClock className="text-2xl text-primary" />
              </div>
              <div>Duration: {course.duration}</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsExclamationCircle className="text-2xl text-primary" />
              </div>
              <div>Requirement: {course.requirement}</div>
            </Appear>
          </div>
        </div>
        <div className="lg:w-5/12 overflow-hidden">
          <Appear variant="left" className="h-full">
            <Carousel withPrevNext className="h-full">
              {course.photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt="Course photo"
                  width={900}
                  height={900}
                  className="h-full object-cover"
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
