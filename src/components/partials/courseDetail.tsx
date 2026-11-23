import { Course } from "@prisma/client";
import CourseSectionNav from "./courseSectionNav";

const CourseDetail = ({ course }: { course: Course }) => {
  const sections = [
    { id: "tong-quan", title: "Tổng quan khóa học", content: course.overview },
    { id: "to-chuc", title: "Tổ chức khóa học", content: course.organization },
    { id: "noi-dung", title: "Nội dung khóa học", content: course.description },
  ].filter(({ content }) => content.replace(/<\/?(?:p|div|span|br)\b[^>]*>/gi, "").replace(/&nbsp;|&#160;|\s/gi, "").length > 0);

  if (!sections.length) return null;

  return (
    <div className="container py-12 md:py-16">
      <CourseSectionNav sections={sections.map(({ id, title }) => ({ id, title }))} />
      <div className="max-w-4xl">
        {sections.map(({ id, title, content }) => (
          <section key={id} id={id} className="scroll-mt-24 pt-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#14294b] md:text-3xl">{title}</h2>
            <div
              className="break-words leading-relaxed text-slate-700 [&_a]:text-primary [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-6 [&_ol]:list-decimal [&_p]:mb-4 [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </section>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
