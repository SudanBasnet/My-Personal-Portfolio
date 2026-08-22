import { motion, useReducedMotion } from "framer-motion";
import { Stagger } from "./Motion";
import { itemVariants } from "../lib/motionVariants";

export const Footer = () => {
  const reduceMotion = useReducedMotion();
  const links = [
    ["Home", "#hero"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["About", "#about"],
    ["Contact", "#contacts"],
  ];

  const socials = [
    ["LinkedIn", "https://www.linkedin.com/in/sudan-basnet/"],
    ["GitHub", "https://github.com/SudanBasnet"],
    ["Email", "mailto:sdnbasnet5@gmail.com"],
  ];

  return (
    <>
      <footer className="border-t border-white/10 bg-black py-16 text-white sm:py-24">
        <Stagger
          className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr]"
          amount={0.3}
        >
          <motion.div variants={itemVariants}>
            <div className="font-editorial text-6xl font-light uppercase leading-none text-white sm:text-7xl">
              Sudan <span className="gradient-text-contra font-display font-black">Basnet</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/45">
              Enterprise Desktop Support Engineer in Sydney with experience
              across global client environments, Microsoft 365, Intune, Active
              Directory, ITSM, and practical full-stack projects.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/35">
              Menu
            </h3>
            <div className="mt-4 grid gap-2">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="w-fit text-sm font-semibold text-white/65 transition hover:translate-x-1 hover:text-[#ff8fc2]"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/35">
              Socials
            </h3>
            <div className="mt-4 grid gap-2">
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="w-fit text-sm font-semibold text-white/65 transition hover:translate-x-1 hover:text-[#80adff]"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </Stagger>

        <div className="mx-auto mt-16 w-[min(1240px,calc(100%-2rem))] border-t border-white/10 pt-6 text-sm font-semibold text-white/35">
          &copy; 2026 Sudan Basnet. All rights reserved.
        </div>
      </footer>
      <motion.a
        href="#hero"
        className="icon-btn magnetic fixed bottom-20 right-5 z-[75] h-12 w-12 border-[#ff62aa]/50 bg-[#ff62aa] text-black shadow-[0_0_28px_rgba(255,98,170,0.45)] hover:bg-[#ff8fc2] dark:bg-[#ff62aa] dark:text-black lg:bottom-44"
        aria-label="Back to top"
        whileHover={reduceMotion ? {} : { y: -4, scale: 1.08 }}
        whileTap={reduceMotion ? {} : { scale: 0.92 }}
      >
        <motion.i
          className="fa-solid fa-angle-up"
          animate={reduceMotion ? {} : { y: [0, -2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.i>
      </motion.a>
    </>
  );
};
