import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Title } from "./Title";
import { ParallaxSection, Reveal } from "./Motion";

export const Contact = () => {
  const [celebrate, setCelebrate] = useState(false);
  const confetti = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    x: ((index * 47) % 240) - 120,
    y: -70 - ((index * 31) % 90),
    rotate: (index * 67) % 240,
    color: ["#22d3ee", "#a78bfa", "#a3e635", "#fbbf24"][index % 4],
  }));

  useEffect(() => {
    if (!celebrate) return undefined;
    const timer = window.setTimeout(() => setCelebrate(false), 900);
    return () => window.clearTimeout(timer);
  }, [celebrate]);

  const socials = [
    {
      icon: "fa-brands fa-square-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sudan-basnet/",
    },
    {
      icon: "fa-brands fa-github",
      label: "GitHub",
      href: "https://github.com/SudanBasnet",
    },
    {
      icon: "fa-solid fa-envelope",
      label: "Email",
      href: "mailto:sdnbasnet5@gmail.com",
    },
  ];

  return (
    <ParallaxSection className="section-wrap" id="contacts" accent="violet">
      <Title title="Contact" />

      <Reveal className="clean-border glass-panel relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-7 text-center sm:p-10">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
        <p className="chip mx-auto mb-5 w-fit">Available for opportunities</p>
        <h3 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
          Let’s build something reliable, useful, and clean.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          I am open to enterprise Desktop Support, IT Support, End-User
          Computing, and hybrid support/development opportunities where
          reliability, documentation, and practical software thinking matter.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              className="btn btn-secondary magnetic px-5"
            >
              <i className={social.icon}></i>
              {social.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:sdnbasnet5@gmail.com"
          onClick={() => setCelebrate(true)}
          className="btn btn-primary magnetic mt-8 overflow-visible"
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-white/60"
            initial={false}
            animate={celebrate ? { scale: [1, 1.35], opacity: [0.8, 0] } : { scale: 1, opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
          sdnbasnet5@gmail.com
          <i className="fa-solid fa-paper-plane ml-3"></i>
          <AnimatePresence>
            {celebrate && (
              <span className="pointer-events-none absolute left-1/2 top-1/2">
                {confetti.map((piece) => (
                  <motion.span
                    key={piece.id}
                    className="absolute h-2 w-1 rounded-full"
                    style={{ backgroundColor: piece.color }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: piece.x,
                      y: piece.y,
                      rotate: piece.rotate,
                      opacity: 0,
                      scale: 0.6,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                ))}
              </span>
            )}
          </AnimatePresence>
        </a>
      </Reveal>
    </ParallaxSection>
  );
};
