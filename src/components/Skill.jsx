import { motion } from "framer-motion";
import { Title } from "./Title";
import { ParallaxSection, Reveal, Stagger } from "./Motion";
import { itemVariants } from "../lib/motionVariants";

export const Skill = () => {
  const skills = [
    { icon: "fa-brands fa-html5", name: "HTML5", tone: "text-orange-500" },
    { icon: "fa-brands fa-css3-alt", name: "CSS3", tone: "text-blue-500" },
    { icon: "fa-brands fa-js", name: "JavaScript", tone: "text-yellow-400" },
    { icon: "fa-brands fa-react", name: "React", tone: "text-cyan-400" },
    { icon: "fa-brands fa-github", name: "GitHub", tone: "text-slate-900 dark:text-white" },
    { icon: "devicon-azure-plain", name: "Azure", tone: "text-blue-500" },
    { icon: "fa-solid fa-cloud-arrow-up", name: "Autopilot", tone: "text-cyan-500" },
    { icon: "devicon-windows8-original", name: "Windows 11", tone: "text-sky-500" },
    { icon: "fa-solid fa-users-gear", name: "Active Directory", tone: "text-violet-500" },
    { icon: "fa-solid fa-shield-halved", name: "Intune", tone: "text-emerald-500" },
    { icon: "fa-solid fa-envelope-open-text", name: "Microsoft 365", tone: "text-cyan-500" },
    { icon: "fa-solid fa-ticket", name: "ServiceNow", tone: "text-lime-500" },
    { icon: "fa-solid fa-network-wired", name: "Networking", tone: "text-indigo-500" },
    { icon: "fa-solid fa-video", name: "Teams Rooms", tone: "text-purple-500" },
  ];

  const supportStrengths = [
    ["Enterprise desktop support", 92],
    ["M365, Intune & Active Directory", 88],
    ["ITSM, ServiceNow & documentation", 90],
    ["React & modern frontend development", 82],
  ];

  return (
    <ParallaxSection className="section-wrap" id="skills" accent="cyan">
      <Title title="Skills" />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -7, scale: 1.02 }}
              className="glass-panel group rounded-3xl p-5 text-center"
            >
              <motion.i
                whileHover={{ rotate: [0, -8, 8, 0] }}
                className={`${skill.icon} ${skill.tone} text-4xl`}
              ></motion.i>
              <p className="mt-4 text-sm font-black text-slate-800 dark:text-white">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="clean-border glass-panel rounded-3xl p-7">
          <p className="chip mb-5 w-fit">Desktop Support Strengths</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            Practical support experience that makes software more usable.
          </h3>
          <div className="mt-6 space-y-3">
            {supportStrengths.map(([strength, level], index) => (
              <div key={strength}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {strength}
                  </span>
                  <span className="text-xs font-black text-cyan-600 dark:text-cyan-300">
                    {level}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <motion.div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: level / 100 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
};
