import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import style from "./Appear.module.scss";

const Appear = ({ variant, animation = {}, children }) => {
  const { duration, timingFunction, delay, iterationCount, direction, fillMode } = animation;

  const [animate, setAnimate] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (!animate) {
      if (!!ref.current && 0 < ref.current.getBoundingClientRect().y && ref.current.getBoundingClientRect().y < window.innerHeight - 100) {
        setAnimate(true);
      } else {
        const handleScroll = () => {
          setAnimate(
            !!ref.current && 0 < ref.current.getBoundingClientRect().y && ref.current.getBoundingClientRect().y < window.innerHeight - 100
          );
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [animate]);

  return (
    <div
      ref={ref}
      className={clsx(style.container, animate && style[variant])}
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

export default Appear;
