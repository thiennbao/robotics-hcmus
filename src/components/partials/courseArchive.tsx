import db from "@/lib/db";
import Appear from "../utils/appear";
import Course from "./course";
import { HTMLAttributes } from "react";

const CourseArchive = async ({ search, ...props }: { search: string } & HTMLAttributes<HTMLDivElement>) => {
  const courses = await db.course.findMany({
    where: { name: { contains: search, mode: "insensitive" } },
    orderBy: { order: "asc" },
  });

  return (
    <section {...props}>
      <div className="container grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <Appear key={course.name} variant="up" viewOption={{ amount: 0.4 }} delay={(index % 3) * 0.1}>
            <Course course={course} className="shadow-[gray_0_0_4px] rounded-lg overflow-hidden" />
          </Appear>
        ))}
      </div>
    </section>
  );
};

export default CourseArchive;
