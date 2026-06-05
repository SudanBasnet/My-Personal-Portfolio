import photo from "../assets/sudan.png";
import resume from "../assets/Sudan_Basnet_Resume.pdf";

export const Hero = () => {
  return (
    <section className="section-wrap grid min-h-[calc(100vh-5rem)] items-center gap-10 pt-10 lg:grid-cols-[1.08fr_0.92fr]" id="hero">
      <div className="space-y-8">
        <div className="chip w-fit">
          <span className="mr-2 h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_14px_#a3e635]"></span>
          Enterprise Desktop Support Engineer
        </div>

        <div className="space-y-5">
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Desktop support precision meets modern web development.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            I am Sudan Basnet, a Sydney-based Desktop Support Engineer with 3+
            years of enterprise end-user computing experience across Microsoft
            365, Active Directory, Intune, Autopilot, ITSM, Windows endpoints,
            AV support, networking, and full-stack development projects.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#experience"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            View Experience
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </a>
          <a
            href={resume}
            download
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/75 px-6 py-3 text-sm font-black text-slate-800 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-none"
          >
            Download CV
            <i className="fa-solid fa-download ml-3"></i>
          </a>
        </div>

        <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
          {[
            ["3+ Years", "Tech industry experience"],
            ["Global Clients", "CHEP, AMD, Thomson Reuters"],
            ["M365 + Intune", "Enterprise endpoint support"],
          ].map(([value, label]) => (
            <div key={value} className="glass-panel rounded-3xl p-4">
              <div className="text-2xl font-black text-slate-950 dark:text-white">
                {value}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="led-border overflow-hidden rounded-[2rem] bg-slate-950/5 p-3 dark:bg-white/5">
          <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-200 via-white to-violet-200 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950">
            <img
              src={photo}
              alt="Sudan Basnet"
              className="mx-auto h-[430px] object-contain object-bottom sm:h-[520px]"
            />
          </div>
        </div>
        <div className="glass-panel absolute -bottom-6 left-4 right-4 rounded-3xl p-4">
          <p className="text-sm font-bold text-slate-950 dark:text-white">
            Support mindset, developer execution.
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            ITSM discipline, clean handovers, practical web builds.
          </p>
        </div>
      </div>
    </section>
  );
};
