import { Title } from "./Title";

export const Contact = () => {
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
    <section className="section-wrap" id="contacts">
      <Title title="Contact" />

      <div className="led-border glass-panel mx-auto max-w-3xl rounded-[2rem] p-7 text-center sm:p-10">
        <p className="chip mx-auto mb-5 w-fit">Available for opportunities</p>
        <h3 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
          Let’s build something reliable, useful, and clean.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
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
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-none"
            >
              <i className={social.icon}></i>
              {social.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:sdnbasnet5@gmail.com"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300"
        >
          sdnbasnet5@gmail.com
          <i className="fa-solid fa-paper-plane ml-3"></i>
        </a>
      </div>
    </section>
  );
};
