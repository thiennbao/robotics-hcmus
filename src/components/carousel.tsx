"use client";

import { Children, HTMLAttributes, useEffect, useState } from "react";
import {
  FaCaretLeft,
  FaCaretRight,
  FaCircle,
  FaRegCircle,
} from "react-icons/fa";

interface Props extends HTMLAttributes<HTMLDivElement> {
  itemsOnScreen?:
    | number
    | { df: number; sm?: number; md?: number; lg?: number; xl?: number };
  withPrevNext?: boolean;
  withCircle?: boolean;
}

const Carousel = ({
  itemsOnScreen = 1,
  withPrevNext = false,
  withCircle = false,
  className = "",
  children,
  ...props
}: Props) => {
  const childrenLength = Children.count(children);
  const [slide, setSlide] = useState(0);
  const [items, setItems] = useState(0);

  useEffect(() => {
    if (typeof itemsOnScreen === "number") {
      setItems(itemsOnScreen);
    } else {
      const { df, sm, md, lg, xl } = itemsOnScreen;
      // Detect resizing
      const handleResize = () => {
        if (xl && window.innerWidth > 1280) {
          // Min width 1280px
          setItems(xl);
        } else if (lg && window.innerWidth > 1024) {
          // Min width 1024px
          setItems(lg);
        } else if (md && window.innerWidth > 768) {
          // Min width 768px
          setItems(md);
        } else if (sm && window.innerWidth > 640) {
          // Min width 640px
          setItems(sm);
        } else {
          // Min width 0px
          setItems(df);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      // Clear up event
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [itemsOnScreen, setItems]);

  return (
    <div className={`${className} relative overflow-hidden`} {...props}>
      {!!items && (
        <div
          className="h-full flex transition duration-300"
          style={{
            width: `${(childrenLength * 100) / items}%`,
            transform: `translateX(${(-slide * 100) / childrenLength}%)`,
          }}
        >
          {Children.map(children, (child) => (
            <div
              className="h-full"
              style={{ width: `${100 / childrenLength}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
      {withPrevNext && (
        <div>
          <div
            className="absolute top-1/2 left-2 md:left-8 -translate-y-1/2 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition cursor-pointer"
            onClick={() =>
              setSlide(slide === 0 ? childrenLength - items : slide - 1)
            }
          >
            <FaCaretLeft className="text-2xl -translate-x-0.5" />
          </div>
          <div
            className="absolute top-1/2 right-2 md:right-8 -translate-y-1/2 p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition cursor-pointer"
            onClick={() =>
              setSlide(slide === childrenLength - items ? 0 : slide + 1)
            }
          >
            <FaCaretRight className="text-2xl translate-x-0.5" />
          </div>
        </div>
      )}
      {withCircle && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex *:mx-1 *:cursor-pointer text-sm">
          {Children.map(children, (child, index) =>
            slide <= index && index <= slide + items - 1 ? (
              <FaCircle />
            ) : (
              <FaRegCircle onClick={() => setSlide(index)} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
