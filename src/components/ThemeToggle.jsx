import { motion, useReducedMotion } from "framer-motion";

export const ThemeToggle = ({ isDark, onToggle }) => {
  const reduceMotion = useReducedMotion();
  const targetTheme = isDark ? "light" : "dark";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="group fixed bottom-5 left-4 z-[65] inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-[#f5f0e8]/90 p-1 pr-3 text-slate-900 shadow-[0_14px_42px_rgba(15,23,42,0.18)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff62aa] lg:bottom-24 lg:left-5 dark:border-white/20 dark:bg-[#111116]/90 dark:text-white dark:shadow-[0_14px_42px_rgba(0,0,0,0.42)]"
      whileHover={reduceMotion ? {} : { y: -3, scale: 1.02 }}
      whileTap={reduceMotion ? {} : { scale: 0.97 }}
      aria-label={`Switch to ${targetTheme} theme`}
      aria-pressed={isDark}
      title={`Switch to ${targetTheme} theme`}
    >
      <motion.span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          isDark
            ? "bg-[#ffb449] text-[#17120a] shadow-[0_0_22px_rgba(255,180,73,0.4)]"
            : "bg-[#24242a] text-[#ffd28a] shadow-[0_0_20px_rgba(76,101,247,0.24)]"
        }`}
        animate={reduceMotion ? {} : { rotate: isDark ? 0 : -18 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        aria-hidden="true"
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.4 15.1A8.3 8.3 0 0 1 8.9 3.6 8.5 8.5 0 1 0 20.4 15.1Z" />
          </svg>
        )}
      </motion.span>

      <span className="text-left leading-none">
        <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/35">
          Appearance
        </span>
        <span className="mt-1 block text-[11px] font-black uppercase tracking-[0.08em]">
          {isDark ? "Dark mode" : "Light mode"}
        </span>
      </span>
    </motion.button>
  );
};
