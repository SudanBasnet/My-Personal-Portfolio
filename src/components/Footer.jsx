export const Footer = () => {
  const links = [
    ["Home", "#hero"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["About", "#about"],
    ["Contact", "#contacts"],
  ];

  const socials = [
    ["LinkedIn", "https://www.linkedin.com/in/sudan-basnet/"],
    ["GitHub", "https://github.com/SudanBasnet"],
    ["Email", "mailto:sdnbasnet5@gmail.com"],
  ];

  return (
    <>
      <footer className="border-t border-slate-200 bg-white/70 py-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-8 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <div className="text-2xl font-black text-slate-950 dark:text-white">
              Sudan Basnet
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Enterprise Desktop Support Engineer in Sydney with experience
              across global client environments, Microsoft 365, Intune, Active
              Directory, ITSM, and practical full-stack projects.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Menu
            </h3>
            <div className="mt-4 grid gap-2">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-semibold text-slate-600 transition hover:text-cyan-500 dark:text-slate-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Socials
            </h3>
            <div className="mt-4 grid gap-2">
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-sm font-semibold text-slate-600 transition hover:text-cyan-500 dark:text-slate-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 w-[min(1120px,calc(100%-2rem))] border-t border-slate-200 pt-6 text-sm font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
          &copy; 2026 Sudan Basnet. All rights reserved.
        </div>
      </footer>
      <a
        href="#hero"
        className="icon-btn magnetic fixed bottom-5 right-5 z-40 h-12 w-12 border-cyan-300 bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.55)] hover:bg-cyan-300 dark:bg-cyan-400 dark:text-slate-950"
        aria-label="Back to top"
      >
        <i className="fa-solid fa-angle-up"></i>
      </a>
    </>
  );
};
