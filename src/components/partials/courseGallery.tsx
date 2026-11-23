"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";

const CourseGallery = ({ gallery, imageAlts, ...props }: { gallery: string[]; imageAlts?: string[] } & HTMLAttributes<HTMLDivElement>) => {
  const track = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [canScroll, setCanScroll] = useState(false);
  const images = gallery.filter((image) => image.trim() && !failed.includes(image));

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setCanScroll(element.scrollWidth > element.clientWidth + 1);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [images.length]);

  const move = (direction: number) => {
    const element = track.current;
    const slide = element?.firstElementChild as HTMLElement | null;
    if (!element || !slide) return;
    const distance = slide.offsetWidth + 16;
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
    element.scrollTo({
      left: direction > 0 && atEnd ? 0 : element.scrollLeft + direction * distance,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    if (!canScroll || hovered || focused || touching || reducedMotion) return;
    const timer = window.setInterval(() => move(1), 4000);
    return () => window.clearInterval(timer);
  });

  if (!images.length) return null;

  return (
    <div {...props} role="region" aria-label="Hình ảnh khóa học" onMouseEnter={(event) => { setHovered(true); props.onMouseEnter?.(event); }} onMouseLeave={(event) => { setHovered(false); props.onMouseLeave?.(event); }} onFocus={(event) => { setFocused(true); props.onFocus?.(event); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); props.onBlur?.(event); }}>
      <div className="container">
        <h2 className="text-2xl font-bold text-[#14294b]">Hình ảnh khóa học</h2>
        <div className="relative mt-5">
          {canScroll && (
            <button type="button" aria-label="Ảnh trước" onClick={() => move(-1)} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/40 bg-black/40 px-4 py-3 font-bold text-white shadow-sm hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">←</button>
          )}
          <div ref={track} onTouchStart={() => setTouching(true)} onTouchEnd={(event) => { if (event.touches.length === 0) setTouching(false); }} onTouchCancel={() => setTouching(false)} className="flex touch-auto snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain">
            {images.map((image, index) => (
              <div key={`${image}-${index}`} className="aspect-[4/3] w-[75%] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[10px]">
                {/* Gallery URLs are supplied by the course and may come from arbitrary hosts. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={imageAlts?.[gallery.indexOf(image)] ?? `Hình ảnh khóa học ${index + 1}`} draggable={false} className="h-full w-full object-cover" onError={() => setFailed((current) => [...current, image])} />
              </div>
            ))}
          </div>
          {canScroll && (
            <button type="button" aria-label="Ảnh tiếp theo" onClick={() => move(1)} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md border border-white/40 bg-black/40 px-4 py-3 font-bold text-white shadow-sm hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1752b8]">→</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGallery;
