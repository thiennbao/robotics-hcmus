"use client";

import { Course } from "@prisma/client";
import clsx from "clsx";
import { HTMLAttributes, useState } from "react";

const CourseDetail = ({ course, ...props }: { course: Course } & HTMLAttributes<HTMLDivElement>) => {
  const [section, setSection] = useState<keyof Course>("overview");

  return (
    <section {...props}>
      <div className="container flex">
        <div className="flex-grow border border-slate-200 rounded-md flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-xl font-bold text-primary">Chi tiết khóa học</h3>
          </div>
          <div className="flex-grow flex">
            <div className="w-1/4 h-full border-r border-slate-200">
              <ul className="flex flex-col py-6 space-y-6 *:px-6 *:py-1 *:cursor-pointer *:border-l-4 *:font-bold">
                <li
                  onClick={() => setSection("overview")}
                  className={clsx(section === "overview" ? "border-primary text-primary" : "border-transparent")}
                >
                  Tổng quan khóa học
                </li>
                <li
                  onClick={() => setSection("organization")}
                  className={clsx(section === "organization" ? "border-primary text-primary" : "border-transparent")}
                >
                  Tổ chức khóa học
                </li>
                <li
                  onClick={() => setSection("description")}
                  className={clsx(section === "description" ? "border-primary text-primary" : "border-transparent")}
                >
                  Nội dung khóa học
                </li>
              </ul>
            </div>
            <div className="w-3/4 p-6">
              <div dangerouslySetInnerHTML={{ __html: course[section] }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
