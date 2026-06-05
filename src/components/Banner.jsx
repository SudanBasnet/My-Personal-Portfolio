export const Banner = () => {
  const highlights = [
    {
      icon: "fa-solid fa-graduation-cap",
      label: "Education",
      value: "Master of Information Technology",
    },
    {
      icon: "fa-solid fa-headset",
      label: "Enterprise Support",
      value: "M365, AD, Intune, Autopilot",
    },
    {
      icon: "fa-solid fa-building-shield",
      label: "Client Environments",
      value: "CHEP, AMD, Thomson Reuters",
    },
  ];

  return (
    <section className="section-wrap pt-0">
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.label} className="led-border glass-panel rounded-3xl p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
              <i className={item.icon}></i>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
              {item.label}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
