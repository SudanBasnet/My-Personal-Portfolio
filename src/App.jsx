import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Banner } from "./components/Banner";
import { Skill } from "./components/Skill";
import { Experience } from "./components/Experience";
import { Project } from "./components/Project";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { InteractiveEffects } from "./components/InteractiveEffects";
import { CommandPalette } from "./components/CommandPalette";
import { ThemeToggle } from "./components/ThemeToggle";
import EntryLoader from "./components/EntryLoader";
import useEntryLoader from "./hooks/useEntryLoader";

function App() {
  const showEntryLoader = useEntryLoader(true, 700);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme) return savedTheme === "dark";
    return true;
  });
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const backLayerTarget = useTransform(
    scrollY,
    [0, 3500],
    reduceMotion ? [0, 0] : [0, -280],
  );
  const midLayerTarget = useTransform(
    scrollY,
    [0, 3500],
    reduceMotion ? [0, 0] : [0, -480],
  );
  const backLayerY = useSpring(backLayerTarget, { stiffness: 35, damping: 20 });
  const midLayerY = useSpring(midLayerTarget, { stiffness: 55, damping: 24 });

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    const openCommandMenu = () => setIsCommandOpen(true);
    document.addEventListener("open-command-menu", openCommandMenu);
    return () => document.removeEventListener("open-command-menu", openCommandMenu);
  }, []);

  const toggleTheme = () => setIsDark((current) => !current);

  return (
    <div className={isDark ? "dark" : ""}>
      {showEntryLoader && <EntryLoader />}
      <div className="page-shell">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-[180%] rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-900 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <InteractiveEffects />
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onThemeToggle={toggleTheme}
        />
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -left-48 top-[18vh] h-[34rem] w-[34rem] rounded-full bg-pink-400/10 blur-3xl dark:bg-[#4c65f7]/10"
            style={{ y: backLayerY }}
          />
          <motion.div
            className="absolute -right-52 top-[75vh] h-[38rem] w-[38rem] rounded-full bg-orange-400/10 blur-3xl dark:bg-[#ff62aa]/10"
            style={{ y: midLayerY }}
          />
        </div>
        <motion.div
          className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-[#ff62aa] via-[#4c65f7] to-[#ffb449]"
          style={{ scaleX }}
        />
        <div className="relative z-10 lg:pb-[4.6rem]">
          <Navbar
            onCommandOpen={() => setIsCommandOpen(true)}
          />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <motion.a
            href="/immersive"
            className="group fixed bottom-5 right-4 z-[76] flex min-h-14 items-center gap-3 rounded-full border border-white/20 bg-[#09090c]/92 p-1.5 pr-5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.38),0_0_34px_rgba(178,92,250,0.22)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff62aa] lg:bottom-24 lg:right-5"
            whileHover={reduceMotion ? {} : { y: -4, scale: 1.025 }}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
            aria-label="Open the immersive 3D portfolio experience"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffd4e8_0%,#ff62aa_17%,#b25cfa_48%,#4c65f7_76%,#111126_100%)] shadow-[inset_-8px_-10px_18px_rgba(10,5,35,0.5),0_0_20px_rgba(255,98,170,0.42)] group-hover:animate-[spin_4s_linear_infinite] motion-reduce:group-hover:animate-none">
              <span className="absolute h-[3.6rem] w-[1.15rem] rotate-[62deg] rounded-full border border-white/60" />
              <span className="relative text-[10px] font-black tracking-[-0.04em]">3D</span>
            </span>
            <span className="text-left leading-none">
              <span className="block text-[8px] font-black uppercase tracking-[0.22em] text-[#ff8fc2]">
                Enter
              </span>
              <span className="mt-1.5 block text-xs font-black uppercase tracking-[0.08em]">
                3D Experience
              </span>
            </span>
            <span className="text-sm text-white/45 transition group-hover:translate-x-1 group-hover:text-white" aria-hidden="true">→</span>
          </motion.a>
          <main id="main-content">
            <Hero />
            <Banner />
            <Skill />
            <Experience />
            <Project />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
