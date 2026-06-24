import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contacts" },
];

export const Navbar = ({ isDark, onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
      <nav className="relative mx-auto flex w-[min(1180px,calc(100%-2rem))] items-center justify-between py-3">
        <a href="#hero" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-300 to-lime-300 text-sm font-black text-slate-950 shadow-[0_8px_25px_rgba(34,211,238,0.3)] transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            SB
          </span>
          <span>
            <span className="block text-sm font-black tracking-wide text-slate-950 dark:text-white">
              Sudan Basnet
            </span>
            <span className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">
              IT Support • Web Developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 shadow-lg shadow-slate-200/40 dark:border-white/10 dark:bg-white/5 dark:shadow-none lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 -z-10 rounded-full bg-slate-950 shadow-md dark:bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={activeSection === item.href.slice(1) ? "text-white dark:text-slate-950" : ""}>
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contacts" className="btn btn-primary magnetic hidden min-h-10 px-5 py-2 md:inline-flex">
            Let&apos;s talk
            <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          </a>
          <button
            type="button"
            onClick={onThemeToggle}
            className="icon-btn magnetic"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="icon-btn lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="clean-border absolute left-0 right-0 top-[4.25rem] rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-950 hover:text-white dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacts"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary magnetic mt-2 w-full"
            >
              Let&apos;s work together
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
