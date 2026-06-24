import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export const Counter = ({ value, suffix = "", duration = 1200 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) return undefined;

    let frame;
    const start = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, reduceMotion, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};
