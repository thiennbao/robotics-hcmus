import CourseDetail from "@/components/partials/courseDetail";
import CourseGallery from "@/components/partials/courseGallery";
import CourseRegister from "@/components/partials/courseRegister";
import CourseDemo from "@/components/partials/courseDemo";
import { demoCourses } from "@/lib/demoCourses";
import Image from "next/image";
import Link from "next/link";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const name = decodeURIComponent(params.id);
  const demo = process.env.NODE_ENV === "development" ? demoCourses.find((course) => course.id === name) : undefined;
  if (demo) {
    return { title: `${demo.title} (minh họa) | Robotics & IoT HCMUS`, robots: { index: false, follow: false } };
  }
  const course = await db.course.findUnique({ where: { name } });
  if (!course) return {};

  return {
    title: `${course?.name} | Robotics & IoT HCMUS`,
    description: `Khóa học ${course?.name} tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM`,
    openGraph: {
      title: `${course?.name} | Robotics & IoT HCMUS`,
      description: `Khóa học ${course?.name} tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM`,
      type: "website",
      images: [course.thumbnail, ...course.gallery],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course?.name} | Robotics & IoT HCMUS`,
      description: `${course?.name} tại câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM`,
      images: [course.thumbnail, ...course.gallery],
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const name = decodeURIComponent(params.id);
  const demo = process.env.NODE_ENV === "development" ? demoCourses.find((course) => course.id === name) : undefined;
  if (demo) return <CourseDemo course={demo} />;

  const course = await db.course.findUnique({ where: { name } });

  if (!course) notFound();

  return (
    <main>
      <div aria-hidden="true" className="h-32 bg-[#14294b]" />
      <section className="border-b border-slate-200 bg-[#f6f5f4]">
        <div className="container grid items-center gap-8 pb-20 pt-10 md:grid-cols-[1.2fr_.8fr] md:gap-14 md:pb-24 md:pt-16">
          <div className="order-2 md:order-1">
            <nav aria-label="Đường dẫn" className="mb-7 text-sm text-slate-600">
              <Link href="/courses" className="font-semibold text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Khóa học
              </Link>
              <span aria-hidden="true"> / </span>
              <span>{course.name}</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-primary">Robotics &amp; IoT HCMUS</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#14294b] md:text-5xl">{course.name}</h1>
            {course.brief.trim() && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{course.brief}</p>}
            <a href="#dang-ky" className="mt-7 inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#163675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none">
              Đăng ký khóa học
            </a>
          </div>
          <div className="order-1 overflow-hidden rounded-xl shadow-[0_16px_36px_rgba(30,70,130,0.13)] md:order-2">
            <Image src={course.thumbnail} alt={course.name} width={1200} height={750} priority className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
      </section>
      {course.time.split(";").some((time) => time.trim()) && (
        <div className="container relative -mt-12">
          <dl aria-label="Thông tin khóa học" className="rounded-[10px] bg-white px-7 py-6 shadow-[0_10px_24px_rgba(20,41,75,0.15)]">
            <dt className="text-lg font-bold text-[#14294b]">{course.time.split(";").map((time) => time.trim()).filter(Boolean).join(" · ")}</dt>
            <dd className="mt-1 text-sm text-slate-600">Khung giờ</dd>
          </dl>
        </div>
      )}
      <CourseDetail course={course} />
      {course.gallery.length > 0 && (
        <CourseGallery gallery={course.gallery} className="overflow-hidden pb-16 md:pb-20" />
      )}
      <CourseRegister />
    </main>
  );
}
