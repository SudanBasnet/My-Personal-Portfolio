import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Title } from "./Title";
import { ParallaxSection, Reveal, Stagger } from "./Motion";
import { itemVariants } from "../lib/motionVariants";

const skills = [
  { icon: "devicon-html5-plain", name: "HTML5" },
  { icon: "devicon-css3-plain", name: "CSS3" },
  { icon: "devicon-javascript-plain", name: "JavaScript" },
  { icon: "devicon-react-original", name: "React" },
  { icon: "devicon-github-original", name: "GitHub" },
  { icon: "devicon-azure-plain", name: "Azure" },
  { icon: "fa-solid fa-cloud-arrow-up", name: "Autopilot" },
  { icon: "devicon-windows8-original", name: "Windows 11" },
  { icon: "fa-solid fa-users-gear", name: "Active Directory" },
  { icon: "fa-solid fa-shield-halved", name: "Intune" },
  { icon: "fa-solid fa-envelope-open-text", name: "Microsoft 365" },
  { icon: "fa-solid fa-ticket", name: "ServiceNow" },
  { icon: "fa-solid fa-network-wired", name: "Networking" },
  { icon: "fa-solid fa-video", name: "Teams Rooms" },
];

const capabilityGroups = [
  {
    icon: "fa-headset",
    title: "End-user support",
    detail: "L1/L2 triage, break/fix, IMACD and user-focused resolution",
  },
  {
    icon: "fa-laptop-file",
    title: "Endpoint management",
    detail: "Intune, Autopilot, Windows deployment and device lifecycle",
  },
  {
    icon: "fa-users-gear",
    title: "Identity & collaboration",
    detail: "Active Directory, Azure AD, Microsoft 365, Teams and VPN",
  },
  {
    icon: "fa-list-check",
    title: "Service operations",
    detail: "ServiceNow, SLA priorities, documentation and escalation",
  },
];

const bubbleTones = [
  "from-[#ff62aa] to-[#b25cfa]",
  "from-[#4c65f7] to-[#80adff]",
  "from-[#f37133] to-[#ffb449]",
  "from-[#b25cfa] to-[#4c65f7]",
  "from-[#ff507f] to-[#f37133]",
];

const orbitConfig = [
  { inset: "inset-[3%]", duration: 42, direction: 1, startAngle: 0, tilt: 62, depth: -35 },
  { inset: "inset-[15%]", duration: 33, direction: -1, startAngle: 18, tilt: 67, depth: 0 },
  { inset: "inset-[29%]", duration: 24, direction: 1, startAngle: 27, tilt: 58, depth: 30 },
];

export const Skill = () => {
  const cosmosRef = useRef(null);
  const cosmosIsInView = useInView(cosmosRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();
  const orbitGroups = [skills.slice(0, 5), skills.slice(5, 10), skills.slice(10)];

  return (
    <ParallaxSection className="section-wrap" id="skills" accent="cyan">
      <Title
        title="Skills & Toolkit"
        eyebrow="Two disciplines, one mindset"
        chapter="01"
        subtitle="Enterprise support capability paired with a practical modern web-development toolkit."
      />

      <div ref={cosmosRef}>
        <Reveal
          className={`skill-cosmos ${cosmosIsInView ? "is-running" : ""} relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#050506] px-3 py-8 text-white shadow-[0_35px_100px_rgba(0,0,0,0.3)] sm:p-8`}
        >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(243,113,51,0.12),transparent_22%),radial-gradient(circle_at_20%_20%,rgba(255,98,170,0.12),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(76,101,247,0.13),transparent_26%)]"
        />
        <div aria-hidden="true" className="skill-starfield pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative z-10 mb-5 flex items-center justify-between gap-4 px-3 sm:px-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Interactive capability map</p>
            <p className="mt-2 font-editorial text-3xl font-light text-white sm:text-4xl">My technical universe</p>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#ffb449] shadow-[0_0_12px_#ffb449]" />
            Explore the orbit
          </span>
        </div>

        <div
          className="skill-orbit-scene relative mx-auto hidden aspect-square w-full max-w-[760px] md:block"
          role="list"
          aria-label="Skills orbiting the Skills and Toolkit sun"
        >
          {orbitGroups.map((group, ringIndex) => {
            const config = orbitConfig[ringIndex];
            const orbitStyle = {
              "--orbit-duration": `${config.duration}s`,
              "--orbit-direction": config.direction === 1 ? "normal" : "reverse",
              "--orbit-tilt": `${config.tilt}deg`,
              "--orbit-counter-tilt": `${-config.tilt}deg`,
              "--orbit-depth": `${config.depth}px`,
            };

            return (
              <div
                key={config.inset}
                className={`skill-orbit-shell absolute ${config.inset}`}
                style={orbitStyle}
              >
                <div className="skill-orbit-track relative h-full w-full">
                  <span className="skill-orbit-beacon absolute left-1/2 top-0 h-2 w-2 rounded-full bg-white/80 shadow-[0_0_16px_white]" />
                  {group.map((skill, index) => {
                    const angle =
                      (index / group.length) * Math.PI * 2 -
                      Math.PI / 2 +
                      (config.startAngle * Math.PI) / 180;
                    const left = 50 + Math.cos(angle) * 47;
                    const top = 50 + Math.sin(angle) * 47;
                    const skillIndex = skills.indexOf(skill);

                    return (
                      <div
                        key={skill.name}
                        role="listitem"
                        className="skill-planet-position absolute"
                        style={{ left: `${left}%`, top: `${top}%` }}
                      >
                        <div className="skill-planet-facing">
                          <motion.div
                            whileHover={reduceMotion ? {} : { scale: 1.16, y: -5 }}
                            className={`skill-planet relative flex h-20 w-20 cursor-default flex-col items-center justify-center overflow-hidden rounded-full border border-white/30 bg-gradient-to-br ${bubbleTones[skillIndex % bubbleTones.length]} p-2 text-center shadow-[inset_8px_10px_20px_rgba(255,255,255,0.2),inset_-10px_-12px_24px_rgba(0,0,0,0.25),0_14px_30px_rgba(0,0,0,0.32)] lg:h-24 lg:w-24`}
                          >
                            <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.38),transparent_24%),linear-gradient(to_top,rgba(0,0,0,0.48),transparent_58%)]" />
                            <span className="absolute bottom-[8%] right-[12%] h-[32%] w-[38%] rounded-full bg-black/20 blur-md" />
                            <i className={`${skill.icon} relative text-xl text-white drop-shadow-md lg:text-2xl`} />
                            <span className="relative mt-1 max-w-[5rem] text-[10px] font-black leading-tight text-white drop-shadow-md lg:text-[11px]">
                              {skill.name}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="skill-sun-anchor absolute left-1/2 top-1/2">
            <span aria-hidden="true" className="skill-sun-rays absolute inset-[-52%] rounded-full" />
            <span aria-hidden="true" className="skill-sun-ring absolute inset-[-38%] rounded-full border border-[#ffb449]/25" />
            <span aria-hidden="true" className="skill-sun-glow absolute inset-[-18%] rounded-full bg-[#f37133]/20 blur-xl" />
            <div className="skill-sun-sphere relative flex h-36 w-36 flex-col items-center justify-center overflow-hidden rounded-full border border-white/40 bg-[radial-gradient(circle_at_34%_28%,#fff7c2_0%,#ffb449_18%,#f37133_44%,#ff62aa_68%,#4c65f7_100%)] text-center text-black shadow-[inset_12px_14px_28px_rgba(255,255,255,0.28),inset_-15px_-18px_35px_rgba(68,27,112,0.28),0_0_42px_rgba(255,180,73,0.34),0_0_80px_rgba(255,98,170,0.18)]">
              <span className="absolute left-[18%] top-[10%] h-[20%] w-[42%] -rotate-12 rounded-full bg-white/45 blur-sm" />
              <span className="absolute bottom-[-12%] right-[-8%] h-[62%] w-[68%] rounded-full bg-[#51226f]/25 blur-lg" />
              <span className="relative text-[0.62rem] font-black uppercase tracking-[0.28em]">Skills</span>
              <span className="relative font-editorial text-3xl font-medium leading-none">& Toolkit</span>
            </div>
          </div>
        </div>

        <Stagger className="skill-mobile-scene relative z-10 grid grid-cols-3 gap-3 px-1 py-5 md:hidden">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="aspect-square"
            >
              <div
                style={{
                  "--float-duration": `${3 + (index % 4) * 0.45}s`,
                  "--float-delay": `${(index % 5) * -0.16}s`,
                }}
                className={`skill-mobile-bubble relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border border-white/25 bg-gradient-to-br ${bubbleTones[index % bubbleTones.length]} p-2 text-center shadow-[inset_6px_8px_16px_rgba(255,255,255,0.2),inset_-8px_-10px_18px_rgba(0,0,0,0.22),0_10px_25px_rgba(0,0,0,0.3)]`}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
                <span className="absolute left-[18%] top-[12%] h-[18%] w-[36%] -rotate-12 rounded-full bg-white/35 blur-[1px]" />
                <i className={`${skill.icon} relative text-xl text-white`} />
                <span className="relative mt-1 text-[10px] font-black leading-tight text-white">{skill.name}</span>
              </div>
            </motion.div>
          ))}
        </Stagger>
        </Reveal>
      </div>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilityGroups.map((capability, index) => (
          <motion.article
            key={capability.title}
            variants={itemVariants}
            whileHover={reduceMotion ? {} : { y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
            className={`border border-black/15 bg-black p-6 text-white shadow-xl shadow-black/10 dark:border-white/15 ${
              index % 2 === 0
                ? "rounded-[3rem_3rem_1rem_3rem]"
                : "rounded-[3rem_1rem_3rem_3rem]"
            }`}
          >
            <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${bubbleTones[index]} text-white shadow-[inset_4px_5px_10px_rgba(255,255,255,0.22),0_8px_22px_rgba(0,0,0,0.3)]`}>
              <i className={`fa-solid ${capability.icon}`} />
            </span>
            <p className="mt-6 font-editorial text-3xl font-light leading-none text-white">{capability.title}</p>
            <p className="mt-3 text-xs leading-5 text-white/50">{capability.detail}</p>
          </motion.article>
        ))}
      </Stagger>
    </ParallaxSection>
  );
};
