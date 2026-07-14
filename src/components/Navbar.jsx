import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contacts" },
];

export const Navbar = ({ onCommandOpen }) => {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigationTargetRef = useRef(null);
  const navigationTimerRef = useRef(null);

  const navigateTo = (event, href, closeMenu = false) => {
    event.preventDefault();
    const targetId = href.slice(1);
    const target = document.querySelector(href);

    navigationTargetRef.current = targetId;
    setActiveSection(targetId);
    if (closeMenu) setIsOpen(false);

    target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);

    window.clearTimeout(navigationTimerRef.current);
    navigationTimerRef.current = window.setTimeout(() => {
      navigationTargetRef.current = null;
    }, 1200);
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    let frameId;

    const updateActiveSection = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        if (navigationTargetRef.current) {
          setActiveSection(navigationTargetRef.current);
          frameId = undefined;
          return;
        }

        const pageBottom = window.scrollY + window.innerHeight;
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        );
        const contactSection = sections.at(-1);
        const contactTop = contactSection?.getBoundingClientRect().top ?? Infinity;
        const isAtBottom = pageBottom >= documentHeight - 64;
        const isContactInReadingZone = contactTop <= window.innerHeight * 0.45;

        if (isAtBottom || isContactInReadingZone) {
          setActiveSection("contacts");
        } else {
          const marker = window.innerHeight * 0.32;
          const current = sections.reduce(
            (active, section) => (
              section.getBoundingClientRect().top <= marker ? section : active
            ),
            sections[0],
          );
          if (current) setActiveSection(current.id);
        }

        frameId = undefined;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (frameId) window.cancelAnimationFrame(frameId);
      window.clearTimeout(navigationTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-[70] border-b border-black/10 bg-[#f5f0e8]/80 backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
      <nav className="relative mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center justify-between py-3">
        <a
          href="#hero"
          onClick={(event) => navigateTo(event, "#hero")}
          className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4c65f7]"
        >
          <span className="relative grid h-11 w-11 place-items-center rounded-full border border-black/20 bg-black text-sm font-black text-white shadow-[0_8px_28px_rgba(255,98,170,0.2)] transition duration-300 group-hover:rotate-45 dark:border-white/25 dark:bg-white dark:text-black">
            <i className="fa-solid fa-star-of-life text-sm"></i>
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

        <div className="fixed inset-x-0 bottom-0 z-[85] hidden grid-cols-6 border-t border-white/10 bg-[#242424]/95 shadow-[0_-12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:grid">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative flex min-h-[4.6rem] items-center justify-center gap-3 border-r border-black/20 px-3 text-sm font-bold uppercase tracking-[-0.02em] transition duration-300 last:border-r-0 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#ffb449] ${
                activeSection === item.href.slice(1)
                  ? "bg-[#111116] text-[#ffd28a] shadow-[inset_0_0_42px_rgba(255,98,170,0.24),inset_0_-18px_42px_rgba(76,101,247,0.18)]"
                  : "bg-[#2d2d2d] text-white hover:bg-[#383838]"
              }`}
              onClick={(event) => navigateTo(event, item.href)}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
            >
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="active-chapter"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#ff62aa] via-[#4c65f7] to-[#ffb449]"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="font-editorial text-2xl font-normal leading-none opacity-70">0{index + 1}</span>
              <span className="overflow-hidden"><span className="inline-block transition duration-300 group-hover:-translate-y-0.5">{item.label}</span></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCommandOpen}
            className="hidden min-h-10 items-center gap-2 rounded-full border border-black/20 bg-transparent px-3 text-xs font-black text-slate-600 transition hover:border-[#ff62aa] hover:text-[#d93983] dark:border-white/20 dark:text-slate-300 dark:hover:border-[#ff62aa] dark:hover:text-[#ff8fc2] md:flex"
            aria-label="Open quick navigation"
          >
            <i className="fa-solid fa-compass"></i>
            <span>Navigate</span>
            <kbd className="rounded-md border border-black/15 px-1.5 py-0.5 text-[10px] dark:border-white/15">⌘K</kbd>
          </button>
          <a
            href="#contacts"
            onClick={(event) => navigateTo(event, "#contacts")}
            className="btn btn-primary magnetic hidden min-h-10 px-5 py-2 md:inline-flex"
          >
            Let&apos;s talk
            <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="icon-btn lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
            className="clean-border absolute left-0 right-0 top-[4.25rem] rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => navigateTo(event, item.href, true)}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                className={`block rounded-2xl px-4 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4c65f7] ${
                  activeSection === item.href.slice(1)
                    ? "bg-[#111116] text-[#ffd28a] shadow-[inset_0_0_30px_rgba(255,98,170,0.18)]"
                    : "text-slate-700 hover:bg-slate-950 hover:text-white dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacts"
              onClick={(event) => navigateTo(event, "#contacts", true)}
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
