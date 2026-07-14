import { motion } from "framer-motion";
import { Title } from "./Title";
import { ParallaxSection, Reveal, Stagger } from "./Motion";
import { itemVariants } from "../lib/motionVariants";

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
    <ParallaxSection className="section-wrap" id="experience" accent="violet">
      <Title
        title="Enterprise Experience"
        eyebrow="Support at scale"
        chapter="02"
        subtitle="Hands-on endpoint, identity, collaboration and service-desk support across global client environments."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Stagger className="relative space-y-6 pl-8">
          <motion.div
            className="absolute bottom-6 left-2 top-6 w-px origin-top bg-gradient-to-b from-[#ff62aa] via-[#4c65f7] to-[#ffb449]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {roles.map((role, index) => (
            <motion.article
              key={role.company}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative border-t border-black/20 bg-transparent py-8 dark:border-white/20"
            >
              <span className="absolute right-0 top-4 font-editorial text-7xl font-light text-black/10 dark:text-white/10">
                0{index + 1}
              </span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 300 }}
                className="absolute -left-[2.16rem] top-8 h-4 w-4 rounded-full border-4 border-[#f5f0e8] bg-[#ff62aa] shadow-[0_0_18px_rgba(255,98,170,0.7)] dark:border-black"
              />
              <p className="chip mb-5 w-fit">{role.company}</p>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                {role.title}
              </h3>
              <p className="mt-2 text-sm font-bold text-[#c72f76] dark:text-[#ff8fc2]">
                {role.meta}
              </p>
              <div className="mt-6 space-y-3">
                {role.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4c65f7] shadow-[0_0_12px_rgba(76,101,247,0.75)]"></span>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </Stagger>

        <div className="space-y-6">
          <Reveal className="rounded-[2rem] border border-black/15 bg-black p-7 text-white dark:border-white/15">
            <p className="chip mb-5 w-fit">Enterprise Clients</p>
            <h3 className="font-editorial text-4xl font-light leading-none text-white">
              Multi-site support for global teams and high-pressure environments.
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {enterpriseClients.map((client) => (
                <motion.article
                  key={client.name}
                  whileHover={{ y: -4, borderColor: "rgba(255, 98, 170, 0.65)" }}
                  className="rounded-2xl border border-white/15 bg-white/[0.04] p-5"
                >
                  <p className="text-lg font-black text-white">
                    {client.name}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#ff8fc2]">
                    {client.sector}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {client.work}
                  </p>
                </motion.article>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-[2rem] border border-black/15 bg-white/25 p-7 dark:border-white/15 dark:bg-white/[0.03]">
            <p className="chip mb-5 w-fit">Education & Credentials</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-transparent p-4 dark:border-white/10"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f37133] to-[#ffb449] text-black">
                    <i className="fa-solid fa-check text-xs"></i>
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </ParallaxSection>
  );
};
