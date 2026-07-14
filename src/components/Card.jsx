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

export const Card = ({
  image,
  github,
  url,
  title,
  description,
  tech = [],
  type,
  focus,
  index = 0,
  featured = false,
  mediaFit = "cover",
}) => {
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
      className={`group overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b0b0c] text-white shadow-2xl shadow-black/20 ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.16fr_0.84fr]" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-slate-900 ${featured ? "min-h-[300px] md:min-h-[470px]" : "aspect-[16/10]"}`}
        style={{ transform: "translateZ(20px)" }}
      >
        <motion.img
          src={image}
          alt={`${title} preview`}
          style={{ y: imageY, scale: 1.08 }}
          loading="lazy"
          decoding="async"
          className={`h-[112%] w-full transition duration-700 ${mediaFit === "contain" ? "object-contain p-8 sm:p-12" : "object-cover"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          {url && (
            <span className="flex items-center gap-2 rounded-full border border-[#ffb449]/40 bg-[#f37133]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffd89a] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb449] shadow-[0_0_10px_#ffb449]"></span>
              Live
            </span>
          )}
        </div>
      </div>
      <div className={`relative flex flex-col p-6 sm:p-7 ${featured ? "justify-center md:p-10" : ""}`} style={{ transform: "translateZ(28px)" }}>
        <span className="pointer-events-none absolute right-5 top-2 font-editorial text-[7rem] font-light leading-none text-white/[0.045]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="relative mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#ff8fc2]">
          {type}
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/65"
            >
              {item}
            </span>
          ))}
        </div>

        <div>
          <div>
            <h3 className={`${featured ? "text-5xl sm:text-6xl" : "text-4xl"} font-editorial font-light leading-[0.9] tracking-[-0.04em] text-white`}>
              {title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/55">
              {description}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/45">
            <i className="fa-solid fa-bullseye text-[#80adff]"></i>
            Focus: {focus}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="btn magnetic min-h-11 border border-white/25 bg-transparent px-5 py-2.5 text-white hover:-translate-y-1 hover:border-[#ff62aa] hover:bg-[#ff62aa] hover:text-black"
            >
              <i className="fa-brands fa-github"></i>
              Source code
            </a>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary magnetic min-h-11 px-5 py-2.5"
              >
                Live demo
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
