import { Title } from "./Title";

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
    "Level 1/2 enterprise desktop support",
    "IMACD, device lifecycle, SOE, and secure decommissioning",
    "ServiceNow, SLA tracking, incident escalation, and ITIL-aligned workflows",
    "M365, Exchange Online, Teams, SharePoint, MFA, VPN, and printer support",
  ];

  return (
    <section className="section-wrap" id="skills">
      <Title title="Skills" />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass-panel group rounded-3xl p-5 text-center transition hover:-translate-y-1"
            >
              <i className={`${skill.icon} ${skill.tone} text-4xl`}></i>
              <p className="mt-4 text-sm font-black text-slate-800 dark:text-white">
                {skill.name}
              </p>
            </div>
          ))}
        </div>

        <div className="led-border glass-panel rounded-3xl p-7">
          <p className="chip mb-5 w-fit">Desktop Support Strengths</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            Practical support experience that makes software more usable.
          </h3>
          <div className="mt-6 space-y-3">
            {supportStrengths.map((strength) => (
              <div key={strength} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-500">
                  <i className="fa-solid fa-check text-xs"></i>
                </span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
