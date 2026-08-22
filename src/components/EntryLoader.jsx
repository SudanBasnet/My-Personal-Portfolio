import { motion, useReducedMotion } from "framer-motion";

const EntryLoader = ({ immersive = false }) => {
  const reduceMotion = useReducedMotion();

  return (
  <motion.div
    className={`fixed inset-0 z-[200] grid min-h-dvh place-items-center overflow-hidden px-6 text-center text-white ${
      immersive ? "bg-[#050505]" : "bg-[#09090c]"
    }`}
    role="status"
    aria-live="polite"
    aria-label={immersive ? "Entering the 3D world" : "Loading portfolio"}
    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04, filter: "blur(6px)" }}
    transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    <div
      className={`pointer-events-none absolute inset-0 ${
        immersive
          ? "bg-[radial-gradient(circle_at_50%_42%,rgba(76,101,247,0.24),transparent_27%),radial-gradient(circle_at_38%_58%,rgba(255,98,170,0.18),transparent_25%)]"
          : "bg-[radial-gradient(circle_at_50%_42%,rgba(255,98,170,0.16),transparent_24%),radial-gradient(circle_at_58%_60%,rgba(255,180,73,0.1),transparent_26%)]"
      }`}
      aria-hidden="true"
    />

    <div className="relative flex max-w-md flex-col items-center">
      <div className="relative mb-9 grid h-28 w-28 place-items-center" aria-hidden="true">
        <span className="absolute inset-0 animate-[spin_3.4s_linear_infinite] rounded-full border border-white/15 border-t-[#ff62aa] motion-reduce:animate-none" />
        <span className="absolute inset-3 animate-[spin_2s_linear_infinite_reverse] rounded-full border border-[#4c65f7]/35 border-r-[#80adff] motion-reduce:animate-none" />
        <span
          className={`absolute inset-7 rounded-full shadow-[0_0_38px_rgba(255,98,170,0.42)] ${
            immersive
              ? "bg-[radial-gradient(circle_at_32%_28%,#ffd4e8_0%,#ff62aa_18%,#b25cfa_48%,#4c65f7_76%,#111126_100%)]"
              : "bg-gradient-to-br from-[#ff62aa] via-[#b25cfa] to-[#ffb449]"
          }`}
        />
        <span className="relative text-xs font-black tracking-[-0.04em]">
          {immersive ? "3D" : "SB"}
        </span>
      </div>

      <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#ff8fc2]">
        Sudan Basnet / Portfolio
      </p>
      <p className="mt-4 text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
        {immersive ? "Entering the 3D world" : "Loading the portfolio"}
      </p>
      <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
        {immersive
          ? "Initialising systems, skills and motion."
          : "Preparing projects, experience and the workspace."}
      </p>

      <div className="mt-7 flex items-center gap-2" aria-hidden="true">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ff62aa] [animation-delay:-0.3s] motion-reduce:animate-none" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b25cfa] [animation-delay:-0.15s] motion-reduce:animate-none" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#80adff] motion-reduce:animate-none" />
      </div>
    </div>
  </motion.div>
  );
};

export default EntryLoader;
