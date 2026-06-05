export const Card = ({ image, github, url, title, description, tech = [] }) => {
  return (
    <article className="led-border glass-panel group overflow-hidden rounded-3xl">
      <div className="aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={`${title} preview`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white transition hover:-translate-y-1 hover:bg-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300"
              aria-label={`${title} GitHub repository`}
            >
            <i className="fa-brands fa-github"></i>
            </a>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
                aria-label={`${title} live site`}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
