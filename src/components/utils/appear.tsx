"use client";

import { HTMLMotionProps, UseInViewOptions, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const variants = {
  left: { hidden: { opacity: 0 }, appear: { opacity: [0, 1], x: ["100%", 0] } },
  right: { hidden: { opacity: 0 }, appear: { opacity: [0, 1], x: ["-100%", 0] } },
  up: { hidden: { opacity: 0 }, appear: { opacity: [0, 1], y: ["100%", 0] } },
  down: { hidden: { opacity: 0 }, appear: { opacity: [0, 1], y: ["-100%", 0] } },
};

interface Props extends HTMLMotionProps<"div"> {
  variant: keyof typeof variants;
  delay?: number;
  viewOption?: UseInViewOptions;
}

const Appear = ({ variant, delay = 0, viewOption, children, ...props }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, ...viewOption });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start("appear");
    }
  }, [isInView, animation]);

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial={"hidden"}
      animate={animation}
      transition={{ duration: 0.8, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Appear;
