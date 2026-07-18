const detailSectionClass =
  "relative scroll-mt-12 px-[clamp(1.25rem,6vw,7rem)] py-[clamp(7rem,12vw,12rem)] max-[620px]:py-24";

const actionLinkClass =
  "inline-flex min-h-[2.9rem] items-center justify-between border border-white/20 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.06em] text-white transition hover:border-[#ff62aa] hover:bg-[#ff62aa] hover:text-[#09090b] focus-visible:border-[#ff62aa] focus-visible:bg-[#ff62aa] focus-visible:text-[#09090b] focus-visible:outline-none";

const profileFacts = [
  ["Education", "Master of Information Technology"],
  ["Work status", "Full Australian work rights"],
  ["Current focus", "MS-900 and AZ-900"],
  ["Membership", "Australian Computer Society"],
];

const DetailHeading = ({ eyebrow, title, description, titleId, light = false }) => (
  <div
    className={`grid grid-cols-[minmax(150px,0.34fr)_minmax(0,1.1fr)_minmax(220px,0.56fr)] items-end gap-[clamp(1.5rem,4vw,5rem)] border-b pb-[clamp(3rem,6vw,6rem)] max-[900px]:grid-cols-1 max-[900px]:items-start ${
      light ? "border-black/20" : "border-white/15"
    }`}
  >
    <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.19em] text-[#ff62aa]">
      {eyebrow}
    </p>
    <h2
      id={titleId}
      className="max-w-[900px] font-editorial text-[clamp(3.7rem,7vw,7.5rem)] font-light leading-[0.86] tracking-[-0.065em] max-[620px]:text-[clamp(3.2rem,15vw,5rem)]"
    >
      {title}
    </h2>
    <span
      className={`text-[0.95rem] leading-[1.7] max-[900px]:max-w-[580px] ${
        light ? "text-[#5d5960]" : "text-white/55"
      }`}
    >
      {description}
    </span>
  </div>
);

const ProjectMedia = ({ project }) => {
  const screenshots = project.screenshots?.length
    ? project.screenshots.slice(0, 2)
    : [
        {
          src: project.image,
          alt: project.imageAlt || `${project.title} preview`,
        },
      ];

  return (
    <>
      {screenshots.map((screenshot, screenshotIndex) => (
        <img
          key={screenshot.src}
          className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
            screenshots.length > 1 && screenshotIndex === 0
              ? "opacity-100 group-hover:opacity-0 group-focus-within:opacity-0"
              : screenshotIndex > 0
                ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                : "opacity-100"
          }`}
          src={screenshot.src}
          alt={screenshot.alt}
          loading="lazy"
        />
      ))}
      {screenshots.length > 1 && (
        <span className="absolute right-4 top-4 hidden rounded-full border border-white/20 bg-[#050508]/70 px-3 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-white/75 backdrop-blur-xl min-[621px]:block">
          {project.screenshotHint || "Hover for next view"}
        </span>
      )}
    </>
  );
};

export const SkillsSection = ({ skills, skillGroups }) => (
  <section
    id="ip-skills"
    className={`${detailSectionClass} overflow-hidden bg-[#08080a] bg-[radial-gradient(circle_at_18%_24%,rgba(255,98,170,0.16),transparent_30rem),radial-gradient(circle_at_80%_72%,rgba(76,101,247,0.2),transparent_34rem)] text-white`}
    aria-labelledby="ip-skills-title"
  >
    <DetailHeading
      eyebrow="03 / Capability map"
      title="The toolkit behind the motion."
      titleId="ip-skills-title"
      description="The same skills shown on the 3D planets, organised for a closer look."
    />
    <div
      className="mx-auto mt-[clamp(4rem,8vw,8rem)] flex max-w-[1200px] flex-wrap justify-center gap-3.5 max-[620px]:justify-start"
      aria-label="Technical skills"
    >
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex min-h-[3.2rem] items-center rounded-full border border-[#ff62aa]/45 bg-white/[0.045] px-[1.35rem] py-[0.85rem] text-[clamp(0.78rem,1vw,0.95rem)] font-extrabold text-white/80 shadow-[inset_0_0_28px_rgba(178,92,250,0.05)] max-[620px]:min-h-[2.7rem] max-[620px]:px-4 max-[620px]:py-[0.7rem]"
        >
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-[clamp(5rem,9vw,9rem)] grid grid-cols-4 border-l border-t border-white/15 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
      {skillGroups.map((group, index) => (
        <article
          key={group.title}
          className="min-h-[300px] border-b border-r border-white/15 p-8 max-[620px]:min-h-[230px] max-[620px]:px-0"
        >
          <span className="font-editorial text-3xl text-[#ff62aa]">
            0{index + 1}
          </span>
          <h3 className="mt-24 font-editorial text-[clamp(2rem,3vw,3rem)] font-normal leading-[0.95] tracking-[-0.045em] max-[620px]:mt-16">
            {group.title}
          </h3>
          <p className="mt-5 text-sm leading-[1.65] text-white/50">
            {group.detail}
          </p>
        </article>
      ))}
    </div>
  </section>
);

export const ExperienceSection = ({ roles, clients }) => (
  <section
    id="ip-experience"
    className={`${detailSectionClass} bg-[#f5f0e8] bg-[radial-gradient(circle_at_88%_18%,rgba(255,98,170,0.13),transparent_28rem)] text-[#050505]`}
    aria-labelledby="ip-experience-title"
  >
    <DetailHeading
      eyebrow="06 / Enterprise experience"
      title="Support at scale."
      titleId="ip-experience-title"
      description="Hands-on endpoint, identity, collaboration and service-desk support across global environments."
      light
    />
    <div className="mt-[clamp(4rem,8vw,8rem)] grid grid-cols-2 border-l border-t border-black/20 max-[900px]:grid-cols-1">
      {roles.map((role, index) => (
        <article
          key={role.company}
          className="border-b border-r border-black/20 p-[clamp(2rem,4vw,4rem)] max-[620px]:px-0"
        >
          <div className="flex min-h-16 items-start justify-between gap-4 max-[620px]:flex-col">
            <span className="font-editorial text-3xl text-[#ff62aa]">
              0{index + 1}
            </span>
            <p className="max-w-[260px] text-right text-[0.7rem] font-extrabold uppercase leading-normal tracking-[0.1em] text-[#6a666c] max-[620px]:text-left">
              {role.meta}
            </p>
          </div>
          <p className="mt-16 text-xs font-extrabold uppercase tracking-[0.18em] text-[#bd286b] max-[620px]:mt-10">
            {role.company}
          </p>
          <h3 className="mt-3 font-editorial text-[clamp(2.6rem,4vw,4.5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
            {role.title}
          </h3>
          <ul className="mt-10 grid list-none gap-4 p-0">
            {role.bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative pl-5 text-sm leading-[1.65] text-[#5d5960] before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#4c65f7] before:shadow-[0_0_12px_rgba(76,101,247,0.65)] before:content-['']"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
    <div
      className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-3 border-l border-t border-black/20 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1"
      aria-label="Enterprise clients"
    >
      {clients.map(([name, sector]) => (
        <article
          key={name}
          className="flex min-h-[145px] flex-col justify-between border-b border-r border-black/20 p-6 max-[620px]:min-h-[120px]"
        >
          <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.15em] text-[#8a858d]">
            {sector}
          </span>
          <strong className="font-editorial text-[clamp(1.8rem,2.5vw,2.6rem)] font-normal">
            {name}
          </strong>
        </article>
      ))}
    </div>
  </section>
);

export const ProjectsSection = ({ projects }) => (
  <section
    id="ip-work"
    className={`${detailSectionClass} bg-[#070709] bg-[radial-gradient(circle_at_82%_10%,rgba(76,101,247,0.2),transparent_34rem)] text-white`}
    aria-labelledby="ip-work-title"
  >
    <DetailHeading
      eyebrow="07 / Selected projects"
      title="Built with intent."
      titleId="ip-work-title"
      description="Real interfaces and full-stack workflows, with working source and live-demo links."
    />
    <div className="mt-[clamp(4rem,8vw,8rem)] grid grid-cols-1 gap-4 min-[621px]:grid-cols-2">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className={`group overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/[0.035] ${
            index === 0
              ? "min-[621px]:col-span-2 min-[901px]:grid min-[901px]:grid-cols-[1.2fr_0.8fr]"
              : ""
          }`}
        >
          <div
            className={`relative min-h-[260px] overflow-hidden bg-[#111116] min-[621px]:min-h-[280px] ${
              index === 0
                ? "min-[621px]:min-h-[430px] min-[901px]:min-h-[520px]"
                : ""
            }`}
          >
            <ProjectMedia project={project} />
            <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#050508]/70 text-[0.7rem] font-extrabold text-white backdrop-blur-xl">
              0{index + 1}
            </span>
          </div>
          <div className="p-[clamp(1.5rem,3vw,3rem)]">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#ff62aa]">
              {project.type}
            </p>
            <h3 className="mt-4 font-editorial text-[clamp(2.5rem,4vw,4.8rem)] font-normal leading-[0.9] tracking-[-0.05em]">
              {project.title}
            </h3>
            <span className="mt-6 block max-w-[550px] text-sm leading-[1.65] text-white/55">
              {project.description}
            </span>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 px-3 py-2 text-[0.68rem] font-bold text-white/55"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {project.sourceLinks.map((link) => (
                <a
                  key={link.href}
                  className={`${actionLinkClass} rounded-full`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
              {project.liveLinks.map((link) => {
                const isInternal = link.href.startsWith("/");
                return (
                  <a
                    key={link.href}
                    className={`${actionLinkClass} rounded-full`}
                    href={link.href}
                    target={isInternal ? undefined : "_blank"}
                    rel={isInternal ? undefined : "noreferrer"}
                  >
                    {link.label} ↗
                  </a>
                );
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export const ProfileSection = ({ portrait }) => (
  <section
    id="ip-profile"
    className={`${detailSectionClass} grid grid-cols-1 items-center gap-[clamp(3rem,8vw,9rem)] bg-[#f5f0e8] bg-[radial-gradient(circle_at_12%_50%,rgba(255,98,170,0.13),transparent_28rem)] text-[#050505] min-[901px]:grid-cols-[0.75fr_1.25fr]`}
    aria-labelledby="ip-profile-title"
  >
    <div className="relative aspect-[1/1.18] w-full max-w-[560px] overflow-hidden rounded-[50%_50%_1.5rem_1.5rem] bg-[#d5cec5] min-[621px]:aspect-[4/5] max-[900px]:max-w-[520px]">
      <img
        className="h-full w-full object-cover"
        src={portrait}
        alt="Sudan Basnet"
        loading="lazy"
      />
      <span className="absolute bottom-4 left-4 right-4 rounded-full border border-white/30 bg-[#050508]/70 p-4 text-center text-[0.67rem] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-2xl">
        Sydney / Australia
      </span>
    </div>
    <div>
      <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.19em] text-[#ff62aa]">
        08 / The person behind the work
      </p>
      <h2
        id="ip-profile-title"
        className="mt-5 max-w-[900px] font-editorial text-[clamp(3.7rem,7vw,7.5rem)] font-light leading-[0.86] tracking-[-0.065em] max-[620px]:text-[clamp(3.2rem,15vw,5rem)]"
      >
        Solve today. Build tomorrow.
      </h2>
      <p className="mt-6 max-w-[760px] leading-[1.8] text-[#5d5960]">
        I am a Desktop Support Engineer based in Sydney with enterprise
        contractor experience through Total IT Global and additional IT support
        experience at Cloud Stream. I have supported CHEP / Brambles, DIAGEO,
        Corteva Agriscience, PERRIGO, AMD and Thomson Reuters.
      </p>
      <p className="mt-6 max-w-[760px] leading-[1.8] text-[#5d5960]">
        My work covers endpoint support, hardware refreshes, IMACD, Microsoft
        365, Active Directory, Intune, Autopilot, ServiceNow, VPN, printers, AV
        rooms and documentation. Alongside that, I build React and MERN projects
        with the same reliability mindset.
      </p>
      <div className="mt-12 grid grid-cols-1 border-l border-t border-black/20 min-[621px]:grid-cols-2">
        {profileFacts.map(([label, value]) => (
          <span
            key={label}
            className="flex min-h-[105px] flex-col justify-between border-b border-r border-black/20 p-5 font-editorial text-[1.35rem] font-medium leading-none min-[621px]:min-h-[120px]"
          >
            <small className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.15em] text-[#bd286b]">
              {label}
            </small>
            {value}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const ContactSection = ({ resume }) => (
  <section
    id="ip-contact"
    className="ip-finale relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#050505] bg-[radial-gradient(circle_at_76%_32%,rgba(255,98,170,0.17),transparent_30rem),radial-gradient(circle_at_25%_70%,rgba(76,101,247,0.22),transparent_32rem)] px-[clamp(1.25rem,6vw,7rem)] pb-12 pt-[clamp(6rem,10vw,10rem)]"
    aria-labelledby="ip-contact-title"
  >
    <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#ff62aa]">
      09 / Enterprise support discipline. Developer curiosity.
    </p>
    <h2
      id="ip-contact-title"
      className="mt-6 max-w-[1060px] bg-[linear-gradient(110deg,#fff_12%,#ff9bca_46%,#809cff_86%)] bg-clip-text font-editorial text-[clamp(4rem,9vw,9rem)] font-light leading-[0.86] tracking-[-0.065em] text-transparent max-[620px]:text-[clamp(3.1rem,16vw,5rem)]"
    >
      Ready for what moves next.
    </h2>
    <span className="mt-8 block max-w-[620px] text-[clamp(0.95rem,1.3vw,1.12rem)] leading-[1.75] text-white/55">
      Open to enterprise Desktop Support, IT Support, End-User Computing, and
      hybrid support/development opportunities in Sydney.
    </span>
    <div className="mt-[clamp(3rem,6vw,6rem)] grid grid-cols-1 gap-3 min-[621px]:grid-cols-2 min-[901px]:grid-cols-5">
      <a className={actionLinkClass} href="mailto:sdnbasnet5@gmail.com">
        Email me <span className="text-base text-[#ff62aa]">↗</span>
      </a>
      <a
        className={actionLinkClass}
        href="https://www.linkedin.com/in/sudan-basnet/"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn <span className="text-base text-[#ff62aa]">↗</span>
      </a>
      <a
        className={actionLinkClass}
        href="https://github.com/SudanBasnet"
        target="_blank"
        rel="noreferrer"
      >
        GitHub <span className="text-base text-[#ff62aa]">↗</span>
      </a>
      <a className={actionLinkClass} href={resume} download>
        Download résumé <span className="text-base text-[#ff62aa]">↓</span>
      </a>
      <a className={actionLinkClass} href="/">
        Classic portfolio <span className="text-base text-[#ff62aa]">↗</span>
      </a>
    </div>
    <div
      className="ip-finale__line mt-[clamp(4rem,10vh,8rem)] h-px w-full overflow-hidden bg-white/15"
      aria-hidden="true"
    />
    <div className="mt-6 flex justify-between text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/45 max-[620px]:flex-col max-[620px]:gap-6">
      <span>Sudan Basnet / Sydney</span>
      <span>End / 09</span>
    </div>
  </section>
);
