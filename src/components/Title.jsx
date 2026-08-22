import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Motion";

export const Title = ({
  title,
  eyebrow = "Portfolio",
  subtitle,
  align = "center",
  chapter,
}) => {
  const centered = align === "center";
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className={`mb-14 sm:mb-20 ${centered ? "text-center" : "text-left"}`}>
      <div className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {chapter && (
          <span className="grid h-10 w-10 place-items-center rounded-full border border-black/20 font-editorial text-xl text-slate-800 dark:border-white/30 dark:text-white">
            {chapter}
          </span>
        )}
        <p className="text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-600 dark:text-white/55">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-editorial text-6xl font-light uppercase leading-[0.78] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-7xl lg:text-[7rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        className={`mt-6 h-[2px] w-32 bg-gradient-to-r from-[#ff62aa] via-[#4c65f7] to-[#ffb449] shadow-[0_0_20px_rgba(255,98,170,0.45)] ${centered ? "mx-auto" : ""}`}
        style={{ transformOrigin: centered ? "center" : "left" }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
    </Reveal>
  );
};
