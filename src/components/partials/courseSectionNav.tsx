"use client";

import { useEffect, useState } from "react";

type Section = { id: string; title: string };

export default function CourseSectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);
      const current = elements.reduce<HTMLElement | null>(
        (active, element) => element.getBoundingClientRect().top <= 100 ? element : active,
        null,
      );
      setActiveId(
        current
          ? (current.getBoundingClientRect().bottom > 80 ? current.id : null)
          : (elements[0] && elements[0].getBoundingClientRect().top < window.innerHeight ? elements[0].id : null),
      );
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav aria-label="Nội dung khóa học" className="flex flex-wrap gap-2 border-b border-slate-200 pb-5 text-sm font-bold text-primary">
      {sections.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeId === id ? "location" : undefined}
          onClick={() => setActiveId(id)}
          className={`rounded-md px-4 py-2.5 transition-colors hover:text-[#163675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${activeId === id ? "bg-gray-100" : ""}`}
        >
          {title}
        </a>
      ))}
    </nav>
  );
}
