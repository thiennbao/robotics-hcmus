"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function CourseArchiveTrack({ children, count, id = "all-courses", title = "Tất cả khóa học" }: { children: ReactNode; count: number; id?: string; title?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ overflow: false, previous: false, next: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setScrollState({ overflow: max > 1, previous: element.scrollLeft > 1, next: element.scrollLeft < max - 1 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update);
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [count]);

  const move = (direction: number) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <div className="mb-5 flex items-baseline gap-3 border-b border-[#dce5f1] pb-3.5">
        <h2 id={`${id}-heading`} className="text-[25px] font-bold tracking-tight">{title}</h2>
        <span className="text-[13px] text-[#52627a]">{count} khóa học</span>
        {scrollState.overflow && (
          <div className="ml-auto flex gap-2">
            <button type="button" onClick={() => move(-1)} disabled={!scrollState.previous} aria-controls={`${id}-track`} aria-label={`Khóa học ${title} trước`} className="h-[38px] w-[38px] rounded-md border border-[#dce5f1] bg-white text-[#1752b8] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">←</button>
            <button type="button" onClick={() => move(1)} disabled={!scrollState.next} aria-controls={`${id}-track`} aria-label={`Khóa học ${title} tiếp theo`} className="h-[38px] w-[38px] rounded-md border border-[#dce5f1] bg-white text-[#1752b8] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">→</button>
          </div>
        )}
      </div>
      <div ref={track} id={`${id}-track`} aria-label={title} tabIndex={scrollState.overflow ? 0 : -1} className="grid auto-cols-[84%] grid-flow-col snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain px-0.5 pb-[18px] pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8] min-[481px]:auto-cols-[calc((100%_-_20px)/2)] min-[481px]:gap-5 min-[701px]:auto-cols-[calc((100%_-_40px)/3)] min-[951px]:auto-cols-[calc((100%_-_60px)/4)]">
        {children}
      </div>
    </section>
  );
}
