import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { itemVariants } from "../lib/motionVariants";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
};

const destinations = [
  ["Home", "A quick introduction", "#hero", "fa-house"],
  ["Skills", "Tools I use every day", "#skills", "fa-screwdriver-wrench"],
  ["Experience", "Enterprise support background", "#experience", "fa-briefcase"],
  ["Projects", "Selected development work", "#projects", "fa-code"],
  ["About", "How I approach the work", "#about", "fa-user"],
  ["Contact", "Start a conversation", "#contacts", "fa-paper-plane"],
];

export const CommandPalette = ({ isOpen, onClose, onThemeToggle }) => {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new CustomEvent("open-command-menu"));
      }
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector("button")?.focus();
    }, 50);
    const trapFocus = (event) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const visit = (href) => {
    onClose();
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView(), 80);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-950/70 px-4 py-[6vh] backdrop-blur-md sm:py-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            tabIndex={-1}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="max-h-[88svh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-[2rem] border border-white/15 bg-white/95 shadow-2xl outline-none dark:bg-slate-950/95 sm:max-h-[76vh]"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/10">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff62aa]/15 text-[#c72f76] dark:text-[#ff8fc2]">
                <i className="fa-solid fa-compass"></i>
              </span>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-950 dark:text-white">Explore the portfolio</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Choose where you want to go</p>
              </div>
              <kbd className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-500 dark:border-white/10">ESC</kbd>
            </div>

            <motion.div
              className="grid gap-1 p-3 sm:grid-cols-2"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={listVariants}
            >
              {destinations.map(([label, detail, href, icon]) => (
                <motion.button
                  key={href}
                  type="button"
                  variants={itemVariants}
                  onClick={() => visit(href)}
                  className="group flex items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-[#ff62aa]/10 focus-visible:bg-[#ff62aa]/10 focus-visible:outline-none"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-gradient-to-br group-hover:from-[#ff62aa] group-hover:to-[#4c65f7] group-hover:text-white dark:bg-white/10 dark:text-slate-300">
                    <i className={`fa-solid ${icon}`}></i>
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-900 dark:text-white">{label}</span>
                    <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{detail}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 dark:border-white/10">
              <button type="button" onClick={onThemeToggle} className="text-xs font-black text-slate-600 transition hover:text-[#c72f76] dark:text-slate-300 dark:hover:text-[#ff8fc2]">
                <i className="fa-solid fa-circle-half-stroke mr-2"></i>Toggle theme
              </button>
              <span className="text-xs font-semibold text-slate-400">⌘/Ctrl + K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
