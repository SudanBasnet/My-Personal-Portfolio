import { motion } from "framer-motion";
import photo from "../assets/sudan-optimized.avif";
import { Title } from "./Title";
import { ParallaxSection, Reveal } from "./Motion";

export const About = () => {
  const focusAreas = [
    "Microsoft 365",
    "Active Directory",
    "Intune",
    "Autopilot",
    "ServiceNow",
    "ITIL workflows",
    "Windows endpoints",
    "Azure AD",
    "MERN stack",
  ];

  return (
    <ParallaxSection className="section-wrap" id="about" accent="cyan">
      <Title
        title="About Me"
        eyebrow="The person behind the work"
        chapter="04"
        subtitle="A support engineer who brings calm troubleshooting, clear documentation and a builder’s perspective."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal className="contra-orbit mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full border border-black/15 bg-gradient-to-br from-[#ff62aa] via-[#4c65f7] to-[#80adff] p-2 dark:border-white/15">
          <div className="aspect-square overflow-hidden rounded-full bg-[#d8d0c6] dark:bg-[#151516]">
            <motion.img
              src={photo}
              alt="Sudan Basnet"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal className="border-t border-black/20 py-8 dark:border-white/20" delay={0.1}>
          <p className="chip mb-5 w-fit">Profile</p>
          <h3 className="font-editorial text-5xl font-light leading-[0.92] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl">
            I solve user problems today and build better software for tomorrow.
          </h3>

          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
            I am a Desktop Support Engineer based in Sydney with enterprise
            contractor experience through Total IT Global and additional IT
            support experience at Cloud Stream. I currently support JLL and
            have also supported globally recognised organisations including
            CHEP / Brambles, DIAGEO, Corteva Agriscience, PERRIGO, AMD, and
            Thomson Reuters.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            My day-to-day work covers endpoint support, hardware refreshes,
            IMACD, Microsoft 365 administration, Active Directory, Intune,
            Autopilot, ServiceNow, VPN, network printers, AV rooms, and
            documentation. Alongside that, I build React and MERN projects with
            the same reliability mindset I use in enterprise support.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <motion.span
                key={area}
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-full border border-black/15 bg-transparent px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#ff62aa] dark:border-white/15 dark:text-slate-200"
              >
                {area}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-black p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8fc2]">
                Location
              </p>
              <p className="mt-2 text-xl font-black text-white">
                Sydney, Australia / Full work rights
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#80adff]">
                Education
              </p>
              <p className="mt-2 text-xl font-black text-white">
                Master of Information Technology
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
};
