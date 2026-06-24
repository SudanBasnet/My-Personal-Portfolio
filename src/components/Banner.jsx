import { motion } from "framer-motion";
import { ParallaxSection, Stagger } from "./Motion";
import { itemVariants } from "../lib/motionVariants";
import { Counter } from "./Counter";

export const Banner = () => {
  const highlights = [
    {
      icon: "fa-solid fa-graduation-cap",
      label: "Education",
      value: 1,
      suffix: " Master’s",
      detail: "Information Technology",
    },
    {
      icon: "fa-solid fa-headset",
      label: "Enterprise Support",
      value: 3,
      suffix: "+ Years",
      detail: "M365, AD, Intune, Autopilot",
    },
    {
      icon: "fa-solid fa-building-shield",
      label: "Client Environments",
      value: 6,
      suffix: " Global",
      detail: "Enterprise client environments",
    },
  ];

  return (
    <ParallaxSection className="section-wrap pt-0" accent="violet">
      <Stagger className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ y: -7, transition: { duration: 0.2 } }}
            className="clean-border glass-panel rounded-3xl p-6"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
              <i className={item.icon}></i>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
              {item.label}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
              <Counter value={item.value} suffix={item.suffix} />
            </h3>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </Stagger>
    </ParallaxSection>
  );
};
