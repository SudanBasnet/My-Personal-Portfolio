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
      <Stagger className="grid overflow-hidden rounded-[2rem] border border-black/15 bg-black text-white dark:border-white/15 md:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ y: -7, transition: { duration: 0.2 } }}
            className="relative border-b border-white/15 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-9"
          >
            <span className="absolute right-6 top-5 font-editorial text-3xl text-white/25">0{index + 1}</span>
            <div className="mb-10 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-[#ff8fc2]">
              <i className={item.icon}></i>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              {item.label}
            </p>
            <h3 className="mt-3 font-editorial text-5xl font-light leading-none text-white sm:text-6xl">
              <Counter value={item.value} suffix={item.suffix} />
            </h3>
            <p className="mt-4 text-sm font-semibold text-white/45">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </Stagger>
    </ParallaxSection>
  );
};
