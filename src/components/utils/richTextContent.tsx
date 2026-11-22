"use client";

import clsx from "clsx";
import { MouseEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

export const RichTextContent = ({
  html,
  className,
}: {
  html: string;
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target || target.tagName !== "IMG") return;

    const img = target as HTMLImageElement;
    const src = img.getAttribute("src") || img.src;
    if (!src) return;

    const figure = img.closest("figure.ql-image-figure");
    const caption = figure?.querySelector("figcaption")?.textContent?.trim() || "";

    setActiveImage({
      src,
      alt: img.getAttribute("alt") || caption || "Hình ảnh",
      caption,
    });
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={clsx("rich-text-content", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
        >
          <button
            type="button"
            aria-label="Đóng xem ảnh"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            className="fixed top-5 right-5 z-10 p-2.5 rounded-full bg-gray-900/80 border border-gray-600/80 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <IoClose className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[90vh] flex flex-col items-center cursor-default"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            {activeImage.caption && (
              <p className="mt-3 px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-700/80 text-sm md:text-base text-gray-100 text-center max-w-3xl">
                {activeImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
