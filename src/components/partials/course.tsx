import { Course as CourseModel } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

const Course = ({ course, className, ...props }: { course: CourseModel } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx(className, "h-full flex flex-col")} {...props}>
      <div>
        <Image
          src={course.thumbnail}
          alt={course.name}
          width={800}
          height={450}
          className="aspect-video object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between gap-6 p-6">
        <div>
          <Link href={`/courses/${course.name}`} className="text-xl text-primary font-bold mb-2 line-clamp-2">
            {course.name}
          </Link>
          <p className="line-clamp-4">{course.brief}</p>
        </div>
        <div>
          <Link href={`/courses/${course.name}`}>
            <button className="w-32 h-10 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white">
              Xem chi tiết
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
