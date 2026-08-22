import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import portrait from "../../assets/sudan-optimized.avif";
import resume from "../../assets/Sudan_Basnet_Resume.pdf";
import tevaLogo from "../../assets/company-logos/teva.svg";
import { projects } from "../../data/projects";
import "./kinetic-portfolio.css";

const romanNumerals = ["I", "II", "III", "IV", "V"];

const getPrimaryProjectLink = (project) =>
  project.liveLinks?.[0]?.href || project.sourceLinks?.[0]?.href;

const experience = [
  {
    dates: "2026 — Present",
    company: "Teva Pharmaceuticals",
    role: "Desktop Support Engineer",
    detail: "Current enterprise desktop support role in Sydney.",
    current: true,
  },
  {
    dates: "2025 — 2026",
    company: "Enterprise Companies",
    role: "Desktop Support Engineer",
    detail:
      "Multi-client endpoint, identity, workplace technology and ITSM support across global organisations.",
  },
  {
    dates: "2023 — 2025",
    company: "Cloud Stream",
    role: "IT Support Specialist",
    detail:
      "Incident resolution, infrastructure support, access administration and service operations.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Endpoint systems",
    detail: "Windows, Intune, Autopilot, provisioning and lifecycle support.",
  },
  {
    number: "02",
    title: "Identity & access",
    detail: "Active Directory, Azure AD, Microsoft 365, MFA and permissions.",
  },
  {
    number: "03",
    title: "Service operations",
    detail: "ServiceNow, ITSM, incident ownership, SLAs and documentation.",
  },
  {
    number: "04",
    title: "Product building",
    detail: "React, MERN workflows, interface design and full-stack delivery.",
  },
];

const KineticPortfolio = () => {
  const pageRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const activeProject = projects[activeIndex];
  const activeProjectLinks = [
    ...(activeProject.liveLinks || []),
    ...(activeProject.sourceLinks || []),
  ];

  useEffect(() => {
    const previousTitle = document.title;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const previousTheme = themeMeta?.getAttribute("content");
    document.title = "Kinetic Index | Sudan Basnet";
    document.documentElement.classList.add("kinetic-document");
    themeMeta?.setAttribute("content", "#050505");

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("kinetic-document");
      if (previousTheme) themeMeta?.setAttribute("content", previousTheme);
    };
  }, []);

  const updatePointer = (event) => {
    if (reduceMotion || !pageRef.current) return;
    pageRef.current.style.setProperty("--kp-pointer-x", `${event.clientX}px`);
    pageRef.current.style.setProperty("--kp-pointer-y", `${event.clientY}px`);
  };

  return (
    <div ref={pageRef} className="kp-page" onPointerMove={updatePointer}>
      <a className="kp-skip" href="#kp-featured">
        Skip to selected work
      </a>

      <motion.div className="kp-scroll-progress" style={{ scaleX: progress }} />

      <header className="kp-header">
        <a className="kp-name" href="/" aria-label="Return to classic portfolio">
          <span>Sudan</span>
          <span>Basnet</span>
        </a>
        <p className="kp-header__claim">
          A cinematic index of systems, support <em>and</em> software
        </p>
        <nav className="kp-nav" aria-label="Kinetic portfolio navigation">
          <a href="#kp-featured">Index</a>
          <a href="#kp-profile">Profile</a>
          <a href="#kp-experience">Experience</a>
          <a href="#kp-contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="kp-featured" className="kp-featured" aria-labelledby="kp-project-title">
          <div className="kp-media" aria-hidden="true">
            <AnimatePresence mode="sync">
              <motion.img
                key={activeProject.title}
                src={activeProject.image}
                alt=""
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="kp-media__veil" aria-hidden="true" />
          <div className="kp-pointer-light" aria-hidden="true" />

          <div className="kp-featured__meta">
            <span>Selected work / 2026</span>
            <span>Sydney, Australia</span>
          </div>

          <div className="kp-project-focus">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="kp-project-focus__type">{activeProject.type}</p>
                <h1 id="kp-project-title">{activeProject.title}</h1>
                <div className="kp-project-focus__footer">
                  <p>{activeProject.focus}</p>
                  <div className="kp-project-focus__links">
                    {activeProjectLinks.map((link) => (
                      <a
                        key={`${activeProject.title}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="kp-project-index" aria-label="Selected projects">
            {projects.map((project, index) => {
              const destination = getPrimaryProjectLink(project);

              return (
                <a
                  key={project.title}
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className={activeIndex === index ? "is-active" : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-current={activeIndex === index ? "true" : undefined}
                  aria-label={`Open ${project.title}`}
                >
                  <span className="kp-project-index__line" aria-hidden="true" />
                  <span className="kp-project-index__number">{romanNumerals[index]}</span>
                  <span className="kp-project-index__title">
                    {project.title} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              );
            })}
          </div>

          <a className="kp-scroll-cue" href="#kp-profile">
            <span>Scroll to explore</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="kp-profile" className="kp-profile">
          <div className="kp-section-kicker">
            <span>02 / Profile</span>
            <span>Support discipline meets builder curiosity</span>
          </div>
          <div className="kp-profile__statement">
            <p>
              I make complex systems feel <em>calm, clear</em> and dependable.
            </p>
          </div>
          <div className="kp-profile__grid">
            <figure className="kp-portrait">
              <img src={portrait} alt="Sudan Basnet" />
              <figcaption>Sudan Basnet / Sydney</figcaption>
            </figure>
            <div className="kp-profile__copy">
              <p>
                Enterprise Desktop Support Engineer with hands-on experience
                across endpoint management, identity, collaboration platforms
                and service operations—paired with a practical React and MERN
                development practice.
              </p>
              <dl>
                <div>
                  <dt>Current</dt>
                  <dd>Teva Pharmaceuticals</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>Sydney, Australia</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Reliable systems</dd>
                </div>
              </dl>
              <a className="kp-text-link" href={resume} download>
                Download résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="kp-capabilities" aria-labelledby="kp-capabilities-title">
          <div className="kp-section-kicker kp-section-kicker--light">
            <span>03 / Capabilities</span>
            <span>What I bring to the room</span>
          </div>
          <h2 id="kp-capabilities-title">
            Technical depth.
            <br />
            <em>Human clarity.</em>
          </h2>
          <div className="kp-capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.number}>
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.detail}</p>
              </article>
            ))}
          </div>
          <div className="kp-marquee" aria-hidden="true">
            <div>
              <span>Support with intent</span>
              <i>✦</i>
              <span>Software with purpose</span>
              <i>✦</i>
              <span>Systems that last</span>
              <i>✦</i>
              <span>Support with intent</span>
              <i>✦</i>
              <span>Software with purpose</span>
              <i>✦</i>
            </div>
          </div>
        </section>

        <section id="kp-experience" className="kp-experience" aria-labelledby="kp-experience-title">
          <div className="kp-section-kicker">
            <span>04 / Experience</span>
            <span>2023 — Present</span>
          </div>
          <div className="kp-experience__heading">
            <h2 id="kp-experience-title">A timeline of practical responsibility.</h2>
            <img src={tevaLogo} alt="Teva Pharmaceuticals logo" />
          </div>
          <div className="kp-timeline">
            {experience.map((item, index) => (
              <article key={`${item.company}-${item.dates}`}>
                <span className="kp-timeline__index">0{index + 1}</span>
                <time>{item.dates}</time>
                <div>
                  <p className="kp-timeline__company">
                    {item.company}
                    {item.current && <span>Current</span>}
                  </p>
                  <h3>{item.role}</h3>
                </div>
                <p className="kp-timeline__detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="kp-contact" className="kp-contact">
          <div className="kp-section-kicker kp-section-kicker--light">
            <span>05 / Contact</span>
            <span>Open to the right opportunity</span>
          </div>
          <p className="kp-contact__eyebrow">Have a system that needs a steady hand?</p>
          <a className="kp-contact__email" href="mailto:sdnbasnet5@gmail.com">
            Let&apos;s talk<span>.</span>
          </a>
          <div className="kp-contact__footer">
            <p>Enterprise support / Full-stack development</p>
            <div>
              <a href="https://www.linkedin.com/in/sudan-basnet/" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="https://github.com/SudanBasnet" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href="/">Classic portfolio ↗</a>
              <a href="/immersive/">3D experience ↗</a>
            </div>
          </div>
          <p className="kp-contact__copyright">© 2026 Sudan Basnet</p>
        </section>
      </main>
    </div>
  );
};

export default KineticPortfolio;
