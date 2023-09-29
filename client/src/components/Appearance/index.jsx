import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./Appearance.module.scss";

const Appearance = ({ lmao, type, animation = {}, children }) => {
  const { duration, timingFunction, delay, iterationCount, direction, fillMode } = animation;

  const [animated, setAnimated] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (!animated) {
      const handleScroll = () => {
        setAnimated(!!ref.current && ref.current.getBoundingClientRect().y < window.innerHeight - 100);
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [animated]);

  return (
    <div
      ref={ref}
      className={clsx(style.container, animated && style[type])}
      style={{
        animationDuration: duration || "1s",
        animationTimingFunction: timingFunction,
        animationDelay: delay,
        animationIterationCount: iterationCount,
        animationDirection: direction,
        animationFillMode: fillMode || "forwards",
      }}
    >
      {children}
    </div>
  );
};

export default Appearance;
