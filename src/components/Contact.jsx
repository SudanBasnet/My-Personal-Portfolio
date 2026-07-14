import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Title } from "./Title";
import { ParallaxSection, Reveal } from "./Motion";

export const Contact = () => {
  const [celebrate, setCelebrate] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sdnbasnet5@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:sdnbasnet5@gmail.com";
    }
  };

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
    <ParallaxSection
      className="section-wrap min-h-[calc(100svh-4.5rem)]"
      id="contacts"
      accent="violet"
    >
      <Title
        title="Let’s Work Together"
        eyebrow="Start a conversation"
        chapter="05"
        subtitle="Have an opportunity where dependable support and practical technical thinking matter? I would be glad to hear about it."
      />

      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-black p-7 text-center text-white shadow-2xl shadow-black/25 sm:p-12 lg:p-16">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#ff62aa] to-[#ffb449]"
        />
        <p className="chip mx-auto mb-5 w-fit">Available for opportunities</p>
        <h3 className="font-editorial text-5xl font-light uppercase leading-[0.82] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
          Build something <span className="gradient-text-contra font-display font-black">reliable.</span>
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/55">
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
              className="btn magnetic border border-white/25 bg-transparent px-5 text-white hover:border-[#ff62aa] hover:bg-[#ff62aa]/10 hover:text-[#ff9bc7]"
            >
              <i className={social.icon}></i>
              {social.label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:sdnbasnet5@gmail.com"
            onClick={() => setCelebrate(true)}
            className="btn btn-primary magnetic overflow-visible"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-white/60"
              initial={false}
              animate={celebrate ? { scale: [1, 1.35], opacity: [0.8, 0] } : { scale: 1, opacity: 0 }}
              transition={{ duration: 0.55 }}
            />
            Send an email
            <i className="fa-solid fa-paper-plane ml-1"></i>
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
          <button
            type="button"
            onClick={copyEmail}
            className="btn magnetic min-w-40 border border-white/25 bg-transparent text-white hover:border-[#80adff] hover:bg-[#4c65f7]/15 hover:text-[#a9b8ff]"
            aria-live="polite"
          >
            <i className={`fa-solid ${copied ? "fa-check text-lime-500" : "fa-copy"}`}></i>
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>
        <p className="mt-4 text-sm font-semibold text-white/40">
          sdnbasnet5@gmail.com
        </p>
      </Reveal>
    </ParallaxSection>
  );
};
