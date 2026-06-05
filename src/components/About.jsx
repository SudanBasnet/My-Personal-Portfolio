import photo from "../assets/sudan.png";
import { Title } from "./Title";

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
    <section className="section-wrap" id="about">
      <Title title="About Me" />

      <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="led-border glass-panel overflow-hidden rounded-[2rem] p-3">
          <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-100 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950">
            <img
              src={photo}
              alt="Sudan Basnet"
              className="mx-auto h-[420px] object-contain object-bottom"
            />
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-7 sm:p-10">
          <p className="chip mb-5 w-fit">Profile</p>
          <h3 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
            I solve user problems today and build better software for tomorrow.
          </h3>

          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
            I am a Desktop Support Engineer based in Sydney with enterprise
            contractor experience through Total IT Global and additional IT
            support experience at Cloud Stream. I have supported globally
            recognised organisations including CHEP / Brambles, DIAGEO,
            Corteva Agriscience, PERRIGO, AMD, and Thomson Reuters.
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
              <span
                key={area}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                Location
              </p>
              <p className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                Sydney, Australia / Full work rights
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                Education
              </p>
              <p className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                Master of Information Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
