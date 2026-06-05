import { Title } from "./Title";

const enterpriseClients = [
  {
    name: "CHEP / Brambles",
    sector: "Global supply chain",
    work: "100+ user desktop support, device replacement, secure decommissioning, server moves, Autopilot, Intune, VPN, ServiceNow, and handover documentation.",
  },
  {
    name: "DIAGEO",
    sector: "Global beverages",
    work: "On-site Windows 10/11 break/fix, peripheral installation, Microsoft 365 support, mailbox setup, Teams, SharePoint, and Active Directory access tasks.",
  },
  {
    name: "Corteva Agriscience",
    sector: "Global AgTech",
    work: "Knowledge transfer, enterprise hardware support, operational continuity documentation, Microsoft 365, VPN, and peripheral troubleshooting.",
  },
  {
    name: "PERRIGO",
    sector: "Global healthcare",
    work: "Level 1/2 desktop support, IMACD activities, Azure AD onboarding/offboarding, MFA setup, Intune enrolment, and escalation coordination.",
  },
  {
    name: "AMD",
    sector: "Global semiconductor",
    work: "Engineering and corporate endpoint support, device provisioning, OS deployment, Autopilot, Intune, Teams Rooms, AV, and asset lifecycle records.",
  },
  {
    name: "Thomson Reuters",
    sector: "Global information services",
    work: "Break/fix support, hardware moves, ServiceNow incident tracking, Exchange Online, Teams, OneDrive, printer support, and after-hours continuity support.",
  },
];

const roles = [
  {
    title: "Desktop Support Engineer",
    company: "Total IT Global",
    meta: "Enterprise Contractor / Sydney / 2025 - Present",
    bullets: [
      "Delivered multi-client enterprise field support across globally recognised organisations.",
      "Handled endpoint provisioning, IMACD, secure decommissioning, OS deployment, and device lifecycle workflows.",
      "Supported Microsoft 365, Azure AD, Intune, Autopilot, Active Directory, VPN, printers, AV, and conferencing systems.",
      "Worked with ITSM processes, ServiceNow incidents, SLA expectations, documentation, and escalation to L3 teams.",
    ],
  },
  {
    title: "IT Support Specialist",
    company: "Cloud Stream",
    meta: "Sydney / 2023 - 2025",
    bullets: [
      "Managed incidents and service requests with SLA tracking and prioritisation.",
      "Provided hardware, software, network, backup, file recovery, and system monitoring support.",
      "Administered Active Directory, Group Policy, access permissions, Microsoft Intune deployments, and SOE compliance.",
      "Supported network infrastructure upgrades and integration of new systems into existing environments.",
    ],
  },
];

const certifications = [
  "Master of Information Technology",
  "Microsoft 365 Fundamentals (MS-900) - In Progress",
  "Microsoft Azure Fundamentals (AZ-900) - In Progress",
  "Australian Computer Society member",
  "Full Australian work rights",
];

export const Experience = () => {
  return (
    <section className="section-wrap" id="experience">
      <Title title="Enterprise Experience" />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          {roles.map((role) => (
            <article key={role.company} className="led-border glass-panel rounded-3xl p-7">
              <p className="chip mb-5 w-fit">{role.company}</p>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                {role.title}
              </h3>
              <p className="mt-2 text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {role.meta}
              </p>
              <div className="mt-6 space-y-3">
                {role.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]"></span>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-7">
            <p className="chip mb-5 w-fit">Enterprise Clients</p>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              Multi-site support for global teams and high-pressure environments.
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {enterpriseClients.map((client) => (
                <article
                  key={client.name}
                  className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-lg font-black text-slate-950 dark:text-white">
                    {client.name}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                    {client.sector}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {client.work}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="led-border glass-panel rounded-3xl p-7">
            <p className="chip mb-5 w-fit">Education & Credentials</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime-400/15 text-lime-500">
                    <i className="fa-solid fa-check text-xs"></i>
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
