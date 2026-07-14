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

function App() {
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
      <div className="page-shell">
        <a href="#main-content" className="skip-link">Skip to content</a>
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
