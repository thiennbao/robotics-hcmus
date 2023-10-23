import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./Appearance.module.scss";

const Appearance = ({ type, animation = {}, className, children }) => {
  const { duration, timingFunction, delay, iterationCount, direction, fillMode } = animation;

  const [animated, setAnimated] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (!animated) {
      if (!!ref.current && ref.current.getBoundingClientRect().y < window.innerHeight - 100) {
        setAnimated(true)
      } else {
        const handleScroll = () => {
          setAnimated(
            !!ref.current && ref.current.getBoundingClientRect().y < window.innerHeight - 100
          );
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [animated]);

  return (
    <div
      ref={ref}
      className={clsx(className, style.container, animated && style[type])}
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
