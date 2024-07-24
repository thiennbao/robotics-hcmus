import db from "@/lib/db";
import Appear from "../utils/appear";
import Course from "./course";
import { HTMLAttributes } from "react";
import SearchBar from "../utils/searchBar";

const CourseArchive = async ({
  search,
  ...props
}: { search: string } & HTMLAttributes<HTMLDivElement>) => {
  const courses = await db.course.findMany({
    where: { name: { contains: search, mode: "insensitive" } },
  });

  return (
    <section {...props}>
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold before:content-['COURSE'] before:block before:text-primary before:text-[0.6em] before:font-normal">
            Archives
          </h2>
          <div className="lg:w-3/4 xl:w-1/2 mx-auto mt-12 mb-16">
            <SearchBar
              paramKey="search"
              className="w-full h-12 px-4 outline-none bg-gray-100 border rounded-lg transition focus:border-primary"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Appear
              key={course.name}
              variant="up"
              viewOption={{ amount: 0.4 }}
              delay={(index % 3) * 0.1}
            >
              <Course
                course={course}
                className="shadow-[gray_0_0_4px] rounded-lg overflow-hidden"
              />
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseArchive;
