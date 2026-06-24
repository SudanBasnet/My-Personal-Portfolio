import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { itemVariants } from "../lib/motionVariants";

export const Card = ({ image, github, url, title, description, tech = [] }) => {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 18]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateXValue.set(y * -7);
    rotateYValue.set(x * 7);
  };

  const resetTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants}
      whileHover={{ y: -8 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="clean-border glass-panel group overflow-hidden rounded-3xl"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-900" style={{ transform: "translateZ(20px)" }}>
        <motion.img
          src={image}
          alt={`${title} preview`}
          style={{ y: imageY, scale: 1.08 }}
          className="h-[112%] w-full object-cover"
        />
      </div>
      <div className="p-6" style={{ transform: "translateZ(28px)" }}>
        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="icon-btn magnetic border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
              aria-label={`${title} GitHub repository`}
            >
            <i className="fa-brands fa-github"></i>
            </a>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="icon-btn magnetic"
                aria-label={`${title} live site`}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
