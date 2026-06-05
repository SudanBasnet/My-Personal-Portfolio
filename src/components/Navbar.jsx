import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70">
      <nav className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-center justify-between py-4">
        <a href="#hero" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
            SB
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-slate-950 dark:text-white">
              Sudan Basnet
            </span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Enterprise Desktop Support / Developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 p-1 shadow-lg shadow-slate-200/40 dark:border-white/10 dark:bg-white/5 dark:shadow-none md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onThemeToggle}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:text-cyan-500 dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-none"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-200/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-none md:hidden"
            aria-expanded={isOpen}
            aria-label="Open navigation menu"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="led-border absolute left-4 right-4 top-[4.75rem] rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95 md:hidden">
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
          </div>
        )}
      </nav>
    </header>
  );
};
