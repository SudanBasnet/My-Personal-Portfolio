import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import photo from "../assets/sudan-optimized.avif";
import resume from "../assets/Sudan_Basnet_Resume.pdf";

export const Hero = () => {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -38]);
  const portraitY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -95]);
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.94],
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);
  const headingLines = [
    { text: "Keeping teams", editorial: true },
    { text: "RUNNING", editorial: false },
    { text: "and ideas", editorial: true },
    { text: "SHIPPING.", editorial: false },
  ];
  const entrance = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden"
      id="hero"
    >
      <motion.div
        className="hero-grid pointer-events-none absolute -inset-y-28 inset-x-0 -z-20"
        style={{ y: gridY }}
      ></motion.div>
      <motion.div
        animate={reduceMotion ? {} : { x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-12 -z-10 h-96 w-96 rounded-full bg-[#ff62aa]/20 blur-3xl dark:bg-[#4c65f7]/20"
      ></motion.div>
      <motion.div
        animate={reduceMotion ? {} : { x: [0, -35, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-[#ffb449]/25 blur-3xl dark:bg-[#ff62aa]/15"
      ></motion.div>

      <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] w-[min(1240px,calc(100%-2rem))] items-center gap-14 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:py-20">
        <motion.div style={{ y: copyY, opacity: heroOpacity }}>
          <motion.div
            custom={0.05}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="chip mb-7 w-fit border-[#ffb449]/50 bg-[#ffb449]/10 text-slate-700 dark:text-[#ffd89a]"
          >
            <span className="relative mr-2.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb449] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffb449]"></span>
            </span>
            Open to Sydney opportunities
          </motion.div>

          <motion.p
            custom={0.12}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#d73b84] dark:text-[#ff8fc2]"
          >
            Desktop Support Engineer × Developer
          </motion.p>

          <motion.h1
            custom={0.2}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="max-w-4xl text-slate-950 dark:text-white"
          >
            {headingLines.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`inline-block uppercase tracking-[-0.065em] ${
                    line.editorial
                      ? "font-editorial text-[3.5rem] font-light italic leading-[0.72] sm:text-[5.5rem] lg:text-[6.5rem]"
                      : "gradient-text-contra text-[3.35rem] font-black leading-[0.88] sm:text-[5.25rem] lg:text-[6.25rem]"
                  }`}
                  initial={reduceMotion ? false : { y: "110%", rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.065,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            custom={0.3}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mt-8 max-w-xl text-base leading-7 text-slate-600 dark:text-white/65 sm:text-lg sm:leading-8"
          >
            I&apos;m Sudan, a Sydney-based IT professional blending 3+ years of
            enterprise support experience with modern web development. I solve
            the urgent issue, document the fix, and build better ways forward.
          </motion.p>

          <motion.div
            custom={0.4}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#projects" className="btn btn-primary magnetic">
              Explore my work
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </span>
            </a>
            <a href={resume} download className="btn btn-secondary magnetic">
              <i className="fa-solid fa-file-arrow-down"></i>
              Download résumé
            </a>
          </motion.div>

          <motion.div
            custom={0.48}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-slate-500 dark:text-slate-400"
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-[#ff62aa]"></i>
              Sydney, Australia
            </span>
            <a
              href="https://www.linkedin.com/in/sudan-basnet/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#ff62aa]"
            >
              <i className="fa-brands fa-linkedin mr-2"></i>
              LinkedIn
            </a>
            <a
              href="https://github.com/SudanBasnet"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#80adff]"
            >
              <i className="fa-brands fa-github mr-2"></i>
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 45, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: portraitY, scale: portraitScale }}
          className="relative mx-auto aspect-square w-full max-w-[500px] pb-6 sm:px-8 lg:px-0"
        >
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? {} : { y: [0, -16, 0], x: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-5 top-3 h-28 w-28 rounded-full bg-gradient-to-br from-[#ffd94f] to-[#f37133] shadow-[0_0_55px_rgba(255,180,73,0.45)] sm:right-0 sm:h-36 sm:w-36"
          />
          <motion.div
            whileHover={reduceMotion ? {} : { rotate: 0.5, scale: 1.008 }}
            className="contra-orbit clean-border relative aspect-square overflow-hidden rounded-full bg-gradient-to-br from-white/25 via-white/5 to-black/20 p-2 backdrop-blur-xl"
          >
            <div className="relative aspect-square overflow-hidden rounded-full bg-[#d8d0c6] dark:bg-[#181819]">
              <div className="absolute left-6 top-6 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-200">
                <i className="fa-solid fa-bolt mr-2 text-amber-400"></i>
                Support + Build
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/35 to-transparent"></div>
              <img
                src={photo}
                alt="Sudan Basnet"
                width="1000"
                height="1000"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -left-2 top-24 z-20 rounded-full p-3 shadow-xl sm:-left-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#4c65f7] text-white">
                <i className="fa-solid fa-headset"></i>
              </span>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Enterprise support
                </p>
                <p className="text-sm font-black text-slate-950 dark:text-white">
                  3+ years
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -right-2 bottom-0 z-20 rounded-full p-3 shadow-xl sm:-right-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff62aa] text-white">
                <i className="fa-solid fa-code"></i>
              </span>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Developer toolkit
                </p>
                <p className="text-sm font-black text-slate-950 dark:text-white">
                  React + MERN
                </p>
              </div>
            </div>
          </motion.div>

          <div className="glass-panel absolute bottom-5 left-8 hidden rounded-2xl px-4 py-3 sm:block">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <span className="h-2 w-2 rounded-full bg-[#ffb449] shadow-[0_0_12px_#ffb449]"></span>
              Reliable. Curious. Ready.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
