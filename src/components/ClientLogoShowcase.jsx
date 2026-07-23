import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { clientCompanies } from "../data/clientCompanies";

const springConfig = { stiffness: 120, damping: 18, mass: 0.7 };

const cardEntrance = {
  hidden: { opacity: 0, y: 32, rotateX: -10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: index * 0.065,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ClientLogoShowcase = ({ immersive = false }) => {
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, springConfig);
  const springY = useSpring(tiltY, springConfig);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltX.set(y * -5);
    tiltY.set(x * 7);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      className={`client-logo-showcase relative mb-[clamp(4rem,7vw,7rem)] overflow-hidden rounded-[2rem] border p-[clamp(1.25rem,3vw,2.5rem)] ${
        immersive
          ? "border-black/15 bg-white/45 text-[#050505]"
          : "border-black/15 bg-white/30 text-slate-950 shadow-[0_30px_80px_rgba(44,37,52,0.08)] backdrop-blur-sm dark:border-white/15 dark:bg-white/[0.035] dark:text-white"
      }`}
      aria-labelledby={immersive ? "ip-client-logos-title" : "client-logos-title"}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#ff62aa]/25"
        animate={
          reduceMotion ? undefined : { rotate: 360, scale: [1, 1.08, 1] }
        }
        transition={{
          rotate: { duration: 24, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <div className="relative z-10 mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.2em] text-[#d12f79]">
            Enterprise client constellation
          </p>
          <h3
            id={immersive ? "ip-client-logos-title" : "client-logos-title"}
            className="mt-3 font-editorial text-[clamp(2.2rem,4vw,4rem)] font-light leading-none tracking-[-0.045em]"
          >
            Trusted across global environments.
          </h3>
        </div>
        <p
          className={`max-w-md text-sm leading-6 ${
            immersive ? "text-[#625d65]" : "text-slate-600 dark:text-white/55"
          }`}
        >
          Organisations supported through enterprise assignments, with JLL as
          the current client.
        </p>
      </div>

      <motion.div
        className="client-logo-grid relative z-10 grid gap-3 [perspective:1200px]"
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
              }
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        {clientCompanies.map((company, index) => (
          <motion.article
            key={company.name}
            custom={index}
            variants={cardEntrance}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -12,
                    rotateX: index % 2 === 0 ? 6 : -6,
                    rotateY: index % 2 === 0 ? -7 : 7,
                    scale: 1.035,
                  }
            }
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl border p-4 [transform-style:preserve-3d] ${
              immersive
                ? "border-black/15 bg-[#fffdf8]"
                : "border-black/10 bg-[#fffdf8] shadow-[0_18px_35px_rgba(21,18,25,0.08)] dark:border-white/10"
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ff62aa] via-[#b25cfa] to-[#4c65f7] transition-transform duration-500 group-hover:scale-x-100"
            />
            {company.current && (
              <span className="absolute right-2 top-2 z-10 rounded-full bg-[#ff62aa] px-2 py-1 text-[0.5rem] font-black uppercase tracking-[0.12em] text-[#14060d]">
                Current
              </span>
            )}
            <div
              className="flex min-h-16 items-center justify-center rounded-xl bg-white px-3 py-4"
              style={{ transform: "translateZ(28px)" }}
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-full max-w-[150px] object-contain"
              />
            </div>
            <div
              className="mt-4"
              style={{ transform: "translateZ(18px)" }}
            >
              <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-[#756f78]">
                {company.sector}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};
