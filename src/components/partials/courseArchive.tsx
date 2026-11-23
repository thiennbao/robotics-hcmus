import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import CourseArchiveTrack from "./courseArchiveTrack";
import { demoCourses } from "@/lib/demoCourses";

const CourseArchive = async ({ search = "", ...props }: { search: string } & HTMLAttributes<HTMLDivElement>) => {
  const courses = await db.course.findMany({
    where: { name: { contains: search, mode: "insensitive" } },
    orderBy: { order: "asc" },
  });
  const matchingDemoCourses = demoCourses.filter((course) => course.title.toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi")));

  return (
    <section {...props} className={`bg-[#f6f5f4] py-[42px] font-[Arial,Helvetica,sans-serif] text-[#14294b] min-[701px]:pb-20 min-[701px]:pt-[58px] ${props.className ?? ""}`}>
      <div className="mx-auto max-w-[1280px] px-5 min-[701px]:px-9">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1752b8]">Robotics &amp; IoT HCMUS</p>
        <h1 className="my-3.5 text-[32px] font-bold leading-[1.12] tracking-[-0.04em] sm:text-5xl">Khám phá khóa học</h1>
        <p className="max-w-[700px] leading-relaxed text-[#52627a]">Tìm hiểu các khóa học tại câu lạc bộ Robotics &amp; IoT HCMUS.</p>

        <form action="/courses" method="get" role="search" className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="course-search" className="mb-2 block text-sm font-bold">Tìm kiếm khóa học</label>
            <input id="course-search" name="search" type="search" defaultValue={search} placeholder="Nhập tên khóa học" className="h-12 w-full rounded-lg border border-[#c8d9ef] bg-white px-4 text-base text-[#14294b] outline-none focus-visible:ring-2 focus-visible:ring-[#1752b8] focus-visible:ring-offset-2" />
          </div>
          <button type="submit" className="h-12 rounded-lg bg-[#1752b8] px-6 font-bold text-white transition hover:bg-[#123f8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">Tìm kiếm</button>
        </form>

        <nav aria-label="Danh mục khóa học" className="mb-[42px] mt-7 flex flex-wrap gap-[9px]">
          <a href="#all-courses" className="rounded-full border border-[#1752b8] bg-[#1752b8] px-[15px] py-2.5 text-[13px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">Tất cả khóa học</a>
        </nav>

        <CourseArchiveTrack count={courses.length}>
          {courses.map((course) => (
            <article key={course.name} className="group flex min-w-0 snap-start flex-col overflow-hidden rounded-xl border border-[#dce5f1] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,70,130,0.1)]">
              <Link href={`/courses/${encodeURIComponent(course.name)}`} tabIndex={-1} aria-hidden="true" className="overflow-hidden bg-[#e5effc]">
                <Image src={course.thumbnail} alt="" width={800} height={450} className="aspect-video w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col p-[18px]">
                <h3 className="mb-4 text-lg font-bold leading-[1.35]">
                  <Link href={`/courses/${encodeURIComponent(course.name)}`} className="hover:text-[#1752b8] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1752b8]">{course.name}</Link>
                </h3>
                {course.brief && <p className="mt-auto rounded-md bg-[#f6f5f4] px-3 py-2.5 text-[13px] leading-normal text-[#52627a]">{course.brief}</p>}
              </div>
            </article>
          ))}
        </CourseArchiveTrack>

        {courses.length === 0 && (
          <div className="rounded-xl border border-[#dce5f1] bg-white px-6 py-10 text-[#52627a]">
            <p>{search ? "Không tìm thấy khóa học phù hợp với từ khóa của bạn." : "Hiện chưa có khóa học nào."}</p>
            {search && <Link href="/courses" className="mt-4 inline-block font-bold text-[#1752b8] underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1752b8]">Xem tất cả khóa học</Link>}
          </div>
        )}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-12">
            <p className="mb-5 text-sm text-[#52627a]">Dữ liệu giả lập chỉ dành cho môi trường phát triển, không nhận đăng ký.</p>
            <CourseArchiveTrack id="demo-courses" title="Khóa học minh họa" count={matchingDemoCourses.length}>
              {matchingDemoCourses.map((course) => (
                <article key={course.id} className="group flex min-w-0 snap-start flex-col overflow-hidden rounded-xl border border-[#dce5f1] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,70,130,0.1)]">
                  <Link href={`/courses/${course.id}`} tabIndex={-1} aria-hidden="true" className="overflow-hidden bg-[#e5effc]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.images[0]} alt="" className="aspect-video w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col p-[18px]">
                    <span className="self-start rounded-full bg-[#f3edf6] px-[9px] py-[5px] text-xs font-bold text-[#674879]">Minh họa · {course.subject}</span>
                    <h3 className="mb-4 mt-[13px] text-lg font-bold leading-[1.35]">
                      <Link href={`/courses/${course.id}`} className="hover:text-[#1752b8] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1752b8]">{course.title}</Link>
                    </h3>
                    <div className="mt-auto rounded-md bg-[#f6f5f4] px-3 py-2.5 text-[13px] leading-normal text-[#52627a]">
                      <p>Trình độ <strong className="mt-[3px] flex items-center gap-2 text-sm"><span aria-hidden="true" className="flex h-5 shrink-0 items-end gap-0.5">{[1, 2, 3].map((bar) => <span key={bar} className={`w-1.5 rounded-sm ${bar <= course.levelBars ? "bg-[#7953a5]" : "bg-[#e4dced]"}`} style={{ height: `${bar * 5 + 4}px` }} />)}</span>{course.level}</strong></p>
                      <p className="mt-2">Độ tuổi phù hợp <strong className="mt-[3px] block text-sm">{course.age}</strong></p>
                    </div>
                  </div>
                </article>
              ))}
            </CourseArchiveTrack>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseArchive;
