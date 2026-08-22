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

    let activeMagnetic = null;

    const releaseMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.transform = "translate3d(0, 0, 0)";
      activeMagnetic = null;
    };

    const moveCursor = (event) => {
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));

      const magneticTarget = event.target.closest?.(".magnetic");
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
        magneticTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        activeMagnetic = magneticTarget;
      } else if (activeMagnetic) {
        releaseMagnetic();
      }
    };

    const handlePointerOver = (event) => {
      if (event.target.closest?.("a, button")) {
        setCursor((current) => ({ ...current, active: true }));
      }
    };
    const handlePointerOut = (event) => {
      const leavingInteractive = event.target.closest?.("a, button");
      const enteringInteractive = event.relatedTarget?.closest?.("a, button");
      if (leavingInteractive && !enteringInteractive) {
        setCursor((current) => ({ ...current, active: false }));
      }
    };

    // Delegated listeners (rather than binding per-element on mount) so
    // elements that mount later, e.g. the command palette or mobile nav,
    // are still magnetic/cursor-aware without a re-scan.
    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      releaseMagnetic();
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
