import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Banner } from "./components/Banner";
import { Skill } from "./components/Skill";
import { Experience } from "./components/Experience";
import { Project } from "./components/Project";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="page-shell">
        <Navbar isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <Hero />
        <Banner />
        <Skill />
        <Experience />
        <Project />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
