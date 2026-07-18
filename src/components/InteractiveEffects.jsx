import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const particles = [
  ["8%", "18%", 6, 0],
  ["18%", "72%", 4, 1.4],
  ["34%", "36%", 5, 0.7],
  ["52%", "82%", 7, 2.1],
  ["68%", "22%", 4, 1.1],
  ["82%", "64%", 6, 2.8],
  ["92%", "34%", 5, 1.8],
];

export const InteractiveEffects = () => {
  const reduceMotion = useReducedMotion();
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;

    const moveCursor = (event) => {
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    };
    const activate = () => setCursor((current) => ({ ...current, active: true }));
    const deactivate = () => setCursor((current) => ({ ...current, active: false }));
    const magneticElements = [...document.querySelectorAll(".magnetic")];

    const cleanups = magneticElements.map((element) => {
      const move = (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const leave = () => {
        element.style.transform = "translate3d(0, 0, 0)";
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    window.addEventListener("pointermove", moveCursor);
    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("pointerenter", activate);
      element.addEventListener("pointerleave", deactivate);
    });

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.querySelectorAll("a, button").forEach((element) => {
        element.removeEventListener("pointerenter", activate);
        element.removeEventListener("pointerleave", deactivate);
      });
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [reduceMotion]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block">
        {particles.map(([left, top, size, delay]) => (
          <motion.span
            key={`${left}-${top}`}
            className="absolute rounded-full bg-[#4c65f7]/30 dark:bg-[#ff62aa]/25"
            style={{ left, top, width: size, height: size }}
            animate={reduceMotion ? {} : { y: [0, -24, 0], opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        className="pointer-events-none fixed z-[90] hidden rounded-full border border-[#ff62aa]/65 bg-[#ff62aa]/10 mix-blend-difference md:block"
        animate={{
          x: cursor.x - (cursor.active ? 24 : 16),
          y: cursor.y - (cursor.active ? 24 : 16),
          width: cursor.active ? 48 : 32,
          height: cursor.active ? 48 : 32,
          opacity: cursor.x < 0 ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.2 }}
      />
    </>
  );
};
