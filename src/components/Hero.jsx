import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import photo from "../assets/sudan.png";
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
  const headingWords = ["I", "keep", "teams", "running", "—and", "ideas", "shipping."];
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
        className="pointer-events-none absolute -left-40 top-12 -z-10 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10"
      ></motion.div>
      <motion.div
        animate={reduceMotion ? {} : { x: [0, -35, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10"
      ></motion.div>

      <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] w-[min(1180px,calc(100%-2rem))] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <motion.div style={{ y: copyY, opacity: heroOpacity }}>
          <motion.div
            custom={0.05}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="chip mb-7 w-fit border-lime-400/40 bg-lime-300/10 text-slate-700 dark:text-lime-100"
          >
            <span className="relative mr-2.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400"></span>
            </span>
            Open to Sydney opportunities
          </motion.div>

          <motion.p
            custom={0.12}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mb-4 text-sm font-black uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300"
          >
            Desktop Support Engineer × Developer
          </motion.p>

          <motion.h1
            custom={0.2}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-6xl lg:text-[4.7rem]"
          >
            {headingWords.map((word, index) => (
              <span key={word} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className={`mr-[0.22em] inline-block ${
                    word === "running"
                      ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                  initial={reduceMotion ? false : { y: "110%", rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.065,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            custom={0.3}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={entrance}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
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
              <i className="fa-solid fa-location-dot text-cyan-500"></i>
              Sydney, Australia
            </span>
            <a
              href="https://www.linkedin.com/in/sudan-basnet/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-500"
            >
              <i className="fa-brands fa-linkedin mr-2"></i>
              LinkedIn
            </a>
            <a
              href="https://github.com/SudanBasnet"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-500"
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
          className="relative mx-auto w-full max-w-[480px] pb-10 sm:px-8 lg:px-0"
        >
          <motion.div
            whileHover={reduceMotion ? {} : { rotate: 0.5, scale: 1.008 }}
            className="clean-border relative overflow-hidden rounded-[2.5rem] bg-white/50 p-3 backdrop-blur-xl dark:bg-white/5"
          >
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_25%,_rgba(34,211,238,0.35),_transparent_42%),linear-gradient(145deg,_#e0f2fe,_#eef2ff_55%,_#ddd6fe)] dark:bg-[radial-gradient(circle_at_50%_25%,_rgba(34,211,238,0.24),_transparent_40%),linear-gradient(145deg,_#101827,_#07111f_55%,_#17122b)]">
              <div className="absolute left-6 top-6 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-200">
                <i className="fa-solid fa-bolt mr-2 text-amber-400"></i>
                Support + Build
              </div>

              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
              <img
                src={photo}
                alt="Sudan Basnet"
                className="absolute bottom-0 left-1/2 h-[455px] -translate-x-1/2 object-contain object-bottom drop-shadow-[0_25px_25px_rgba(15,23,42,0.28)]"
              />
            </div>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -left-2 top-24 rounded-2xl p-3 shadow-xl sm:-left-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
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
            className="glass-panel absolute -right-2 bottom-0 rounded-2xl p-3 shadow-xl sm:-right-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400 text-white">
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

          <div className="glass-panel absolute bottom-5 left-2 rounded-2xl px-4 py-3 sm:left-8">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]"></span>
              Reliable. Curious. Ready.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
