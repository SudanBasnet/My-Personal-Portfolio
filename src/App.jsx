import { useState } from "react";
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

function App() {
  const [isDark, setIsDark] = useState(true);
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

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="page-shell">
        <InteractiveEffects />
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -left-48 top-[18vh] h-[30rem] w-[30rem] rounded-full bg-cyan-300/10 blur-3xl dark:bg-cyan-500/[0.07]"
            style={{ y: backLayerY }}
          />
          <motion.div
            className="absolute -right-52 top-[75vh] h-[34rem] w-[34rem] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/[0.07]"
            style={{ y: midLayerY }}
          />
        </div>
        <motion.div
          className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300"
          style={{ scaleX }}
        />
        <div className="relative z-10">
          <Navbar isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
          <main>
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
