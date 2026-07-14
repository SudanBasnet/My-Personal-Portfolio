import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { revealVariants } from "../lib/motionVariants";

export const Reveal = ({ children, className = "", delay = 0, ...props }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={revealVariants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Stagger = ({ children, className = "", amount = 0.12, ...props }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({
  children,
  className = "",
  accent = "cyan",
  ...props
}) => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [90, -90]);
  const ringY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-45, 65]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-12, 18]);

  const tones = {
    cyan: "bg-[#4c65f7]/15 dark:bg-[#4c65f7]/10",
    violet: "bg-[#ff62aa]/15 dark:bg-[#ff62aa]/10",
    lime: "bg-[#ffb449]/18 dark:bg-[#f37133]/10",
  };

  return (
    <motion.section ref={sectionRef} className={`parallax-section ${className}`} {...props}>
      <motion.span
        aria-hidden="true"
        className={`parallax-orb -right-28 top-1/4 ${tones[accent] || tones.cyan}`}
        style={{ y: orbY }}
      />
      <motion.span
        aria-hidden="true"
        className="parallax-ring -left-20 bottom-16"
        style={{ y: ringY, rotate: ringRotate }}
      />
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
};
