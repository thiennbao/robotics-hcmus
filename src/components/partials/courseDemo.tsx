import Link from "next/link";
import type { DemoCourse } from "@/lib/demoCourses";
import CourseGallery from "./courseGallery";
import CourseSectionNav from "./courseSectionNav";

export default function CourseDemo({ course }: { course: DemoCourse }) {
  return (
    <main>
      <div aria-hidden="true" className="h-40 bg-[#14294b] md:h-32" />
      <div className="bg-[#102e62] px-5 py-2 text-center text-xs font-bold text-[#dce9ff]">KHÓA HỌC MINH HỌA · DỮ LIỆU GIẢ LẬP · KHÔNG NHẬN ĐĂNG KÝ</div>
      <section className="border-b border-slate-200 bg-[#f6f5f4]">
        <div className="container grid items-center gap-8 pb-20 pt-10 md:grid-cols-[1.2fr_.8fr] md:gap-14 md:pb-24">
          <div className="order-2 md:order-1">
            <nav aria-label="Đường dẫn" className="mb-7 text-sm text-slate-600"><Link href="/courses" className="font-semibold text-primary hover:underline">Khóa học</Link> / Minh họa</nav>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-primary">{course.subject} · Minh họa</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#14294b] md:text-5xl">{course.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{course.brief}</p>
            <a href="#chuong-trinh" className="mt-7 inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-[#163675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Khám phá chương trình</a>
          </div>
          {/* Fictional illustration, not a photograph of a real course. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.images[0]} alt={course.imageAlt} className="order-1 aspect-[16/10] w-full rounded-xl object-cover shadow-[0_16px_36px_rgba(30,70,130,0.13)] md:order-2" />
        </div>
      </section>
      <div className="container relative -mt-12">
        <dl aria-label="Thông tin khóa học minh họa" className="grid grid-cols-2 rounded-[10px] bg-white py-2 shadow-[0_10px_24px_rgba(20,41,75,0.15)] md:grid-cols-4 md:py-6">
          {[["Trình độ", course.level], ["Độ tuổi", course.age], ["Chủ đề", course.subject], ["Thời lượng", course.duration]].map(([label, value], index) => <div key={label} className="border-[#dce5f1] px-5 py-4 even:border-l md:py-1 md:[&:not(:first-child)]:border-l"><dt className="text-sm text-slate-600">{label}</dt><dd className="mt-1 flex items-center gap-2 text-lg font-bold text-[#14294b]">{index === 0 && <span aria-hidden="true" className="flex h-5 items-end gap-0.5">{[1, 2, 3].map((bar) => <span key={bar} className={`w-1.5 rounded-sm ${bar <= course.levelBars ? "bg-[#7953a5]" : "bg-[#e4dced]"}`} style={{ height: `${bar * 5 + 4}px` }} />)}</span>}{value}</dd></div>)}
        </dl>
      </div>
      <div className="container pb-12 pt-10"><div className="max-w-4xl">
        <CourseSectionNav sections={[{ id: "noi-dung", title: "Nội dung" }, { id: "ky-nang", title: "Kỹ năng" }, { id: "ket-qua", title: "Kết quả" }, { id: "chuong-trinh", title: "Chương trình học" }]} />
        <section id="noi-dung" className="scroll-mt-24 pt-10"><h2 className="text-2xl font-bold text-[#14294b]">Nội dung</h2><p className="mt-4 leading-relaxed text-slate-600">{course.overview}</p></section>
        <section id="ky-nang" className="scroll-mt-24 pt-10"><h2 className="text-2xl font-bold text-[#14294b]">Kỹ năng</h2><ul className="mt-5 flex flex-wrap gap-2.5">{course.skills.map((skill) => <li key={skill} className="rounded-full bg-[#f3edf6] px-4 py-2.5 text-sm font-bold text-[#674879]">{skill}</li>)}</ul></section>
        <section id="ket-qua" className="scroll-mt-24 pt-10"><h2 className="text-2xl font-bold text-[#14294b]">Kết quả</h2><p className="mt-4 leading-relaxed text-slate-600">{course.outcome}</p></section>
        <section id="chuong-trinh" className="scroll-mt-24 pt-10"><h2 className="text-2xl font-bold text-[#14294b]">Chương trình học</h2><p className="mt-4 leading-relaxed text-slate-600">Các chủ đề dưới đây chỉ minh họa cách trình bày chương trình.</p><div className="mt-5 rounded-[10px] border border-[#dce5f1] px-4 md:px-6">{course.topics.map(([title, description], index) => <details key={title} className="group border-[#dce5f1] [&:not(:first-child)]:border-t"><summary className="flex cursor-pointer list-none items-center gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={course.images[index]} alt="" className="aspect-video w-20 shrink-0 rounded-md object-cover md:w-28" /><span className="min-w-0 flex-1"><span className="block text-lg font-bold text-[#14294b] underline underline-offset-4">{title}</span><span className="mt-1 block text-sm text-slate-600">Chủ đề {index + 1} · Minh họa</span></span><span aria-hidden="true" className="mr-1 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-primary group-open:rotate-[225deg]" /></summary><p className="pb-6 leading-relaxed text-slate-600">{description}</p></details>)}</div></section>
      </div></div>
      <CourseGallery gallery={course.images} imageAlts={course.images.map((_, index) => `${course.imageAlt}, hình ${index + 1}`)} className="overflow-hidden pb-12" />
      <section className="container pb-16" aria-labelledby="demo-faq-heading"><div className="max-w-4xl"><h2 id="demo-faq-heading" className="text-2xl font-bold text-[#14294b]">Câu hỏi thường gặp</h2><p className="mt-2 text-sm text-slate-600">Câu hỏi và câu trả lời minh họa</p><div className="mt-5 rounded-[10px] border border-[#dce5f1] px-5 md:px-7">{course.faq.map(([question, answer]) => <details key={question} className="group border-[#dce5f1] [&:not(:first-child)]:border-t"><summary className="flex cursor-pointer list-none items-center gap-4 py-5 font-bold text-[#14294b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"><span aria-hidden="true" className="ml-1 h-2.5 w-2.5 shrink-0 rotate-45 border-b-2 border-r-2 border-primary group-open:rotate-[225deg]" />{question}</summary><p className="pb-6 leading-relaxed text-slate-600">{answer}</p></details>)}</div></div></section>
      <section className="container pb-16"><div className="max-w-4xl rounded-[10px] bg-[#e7f0ff] p-7"><h2 className="text-2xl font-bold text-[#14294b]">Đây là khóa học minh họa</h2><p className="mt-3 leading-relaxed text-slate-600">Nội dung trên là giả lập và không dành cho đăng ký. Xem các khóa học thực tế trong danh mục.</p><Link href="/courses" className="mt-5 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-[#163675]">Xem danh mục khóa học</Link></div></section>
    </main>
  );
}
