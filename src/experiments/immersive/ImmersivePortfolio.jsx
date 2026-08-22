import { useCallback, useEffect, useRef, useState } from "react";
import portrait from "../../assets/sudan-optimized.avif";
import resume from "../../assets/Sudan_Basnet_Resume.pdf";
import endpointLab from "../../assets/immersive-endpoint-lab.jpg";
import deviceProvisioning from "../../assets/immersive-device-provisioning.jpg";
import systemsWorkspace from "../../assets/immersive-systems-workspace.jpg";
import EntryLoader from "../../components/EntryLoader";
import useEntryLoader from "../../hooks/useEntryLoader";
import { projects } from "../../data/projects";
import {
  ContactSection,
  ExperienceSection,
  ProfileSection,
  ProjectsSection,
  SkillsSection,
} from "./ImmersiveDetailSections";
import SystemsScene from "./SystemsScene";
import "./immersive-portfolio.css";

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const updateCardSpotlight = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--pointer-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--pointer-y",
    `${event.clientY - bounds.top}px`,
  );
};

const resetCardSpotlight = (event) => {
  event.currentTarget.style.removeProperty("--pointer-x");
  event.currentTarget.style.removeProperty("--pointer-y");
};

const navigation = [
  ["Home", "#ip-home"],
  ["Skills", "#ip-skills"],
  ["Experience", "#ip-experience"],
  ["Projects", "#ip-work"],
  ["Profile", "#ip-profile"],
  ["Contact", "#ip-contact"],
];

const eyebrowClass =
  "text-[clamp(0.68rem,0.85vw,0.82rem)] font-extrabold uppercase tracking-[0.2em] text-[#ff62aa]";

const sectionLabelClass = `${eyebrowClass} ip-section-label relative flex justify-between gap-4 border-b border-black/20 pb-4 text-[#bd286b] max-[620px]:items-start [&>:last-child]:max-[620px]:max-w-[70%] [&>:last-child]:max-[620px]:text-right`;

const motionHeadingClass =
  "ip-motion-heading max-w-[1150px] font-editorial text-[clamp(3.5rem,8.4vw,8.6rem)] font-light leading-[0.86] tracking-[-0.065em] max-[620px]:text-[clamp(3.1rem,16vw,5rem)]";

const spotlightCardClass =
  "relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden border-r border-black/20 p-8 last:border-r-0 max-[900px]:min-h-[230px] max-[900px]:border-b max-[900px]:border-r-0 max-[900px]:last:border-b-0 max-[620px]:px-0 max-[620px]:py-6";

const principleCardClass = `${spotlightCardClass} min-h-[390px] justify-start max-[900px]:min-h-[230px]`;

const galleryFrameClass =
  "ip-gallery__frame absolute z-[3] m-0 overflow-hidden rounded-[clamp(0.85rem,1.5vw,1.4rem)] border border-white/20 bg-[#0a0a0b] shadow-[0_2rem_6rem_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.06)] will-change-transform motion-reduce:relative motion-reduce:inset-auto motion-reduce:z-[2] motion-reduce:aspect-[16/10] motion-reduce:w-full motion-reduce:max-w-[680px] motion-reduce:transform-none";

const navItemClass =
  "flex min-h-[4.6rem] items-center justify-center gap-3 border-r border-white/10 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white/70 transition-colors duration-200 last:border-r-0 hover:bg-[linear-gradient(135deg,rgba(255,98,170,0.2),rgba(76,101,247,0.2))] hover:text-white focus-visible:bg-[linear-gradient(135deg,rgba(255,98,170,0.2),rgba(76,101,247,0.2))] focus-visible:text-white focus-visible:outline-none max-[620px]:min-h-[4.25rem] max-[620px]:min-w-[84px] max-[620px]:flex-col max-[620px]:gap-1.5 max-[620px]:text-[0.56rem]";

const quickLinkClass =
  "rounded-full border border-white/15 bg-[#08080ab8] px-[0.55rem] py-[0.85rem] text-[0.61rem] font-extrabold uppercase tracking-[0.14em] text-white/60 backdrop-blur-2xl transition duration-200 hover:-translate-x-1 hover:border-[#ff62aa] hover:text-white focus-visible:-translate-x-1 focus-visible:border-[#ff62aa] focus-visible:text-white focus-visible:outline-none";

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "GitHub",
  "Azure",
  "Autopilot",
  "Windows 11",
  "Active Directory",
  "Intune",
  "Microsoft 365",
  "ServiceNow",
  "Networking",
  "Teams Rooms",
];

const skillGroups = [
  {
    title: "End-user support",
    detail: "L1/L2 triage, break/fix, IMACD and user-focused resolution.",
  },
  {
    title: "Endpoint management",
    detail: "Intune, Autopilot, Windows deployment and device lifecycle.",
  },
  {
    title: "Identity & collaboration",
    detail: "Active Directory, Azure AD, Microsoft 365, Teams and VPN.",
  },
  {
    title: "Service operations",
    detail: "ServiceNow, SLA priorities, documentation and escalation.",
  },
];

const roles = [
  {
    title: "Desktop Support Engineer",
    company: "Teva Pharmaceuticals",
    meta: "Sydney / 2026 - Present",
    bullets: [
      "Currently working at Teva Pharmaceuticals in an enterprise desktop support role.",
      "Hands-on enterprise experience supporting users, endpoints and workplace technology across global organisations.",
    ],
  },
  {
    title: "Desktop Support Engineer",
    company: "Enterprise Companies",
    meta: "Sydney / 2025 - 2026",
    bullets: [
      "Multi-client enterprise field support across globally recognised organisations, including JLL.",
      "Endpoint provisioning, IMACD, secure decommissioning, OS deployment and lifecycle workflows.",
      "Microsoft 365, Azure AD, Intune, Autopilot, Active Directory, VPN, printers, AV and conferencing support.",
      "ServiceNow incidents, SLA expectations, documentation and escalation to L3 teams.",
    ],
  },
  {
    title: "IT Support Specialist",
    company: "Cloud Stream",
    meta: "Sydney / 2023 - 2025",
    bullets: [
      "Incident and service-request management with SLA tracking and prioritisation.",
      "Hardware, software, network, backup, recovery and system-monitoring support.",
      "Active Directory, Group Policy, permissions, Intune deployments and SOE compliance.",
      "Network infrastructure upgrades and integration of new systems.",
    ],
  },
];

const clients = [
  ["Teva Pharmaceuticals", "Global pharmaceuticals"],
  ["JLL", "Commercial real estate"],
  ["CHEP / Brambles", "Supply chain"],
  ["DIAGEO", "Global beverages"],
  ["Corteva Agriscience", "AgTech"],
  ["PERRIGO", "Healthcare"],
  ["AMD", "Semiconductor"],
  ["Thomson Reuters", "Information services"],
];

const ImmersivePortfolio = () => {
  const pageRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);
  const showEntryLoader = useEntryLoader(sceneReady, 1000);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const previousTitle = document.title;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const previousTheme = themeMeta?.getAttribute("content");
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    document.title = "Systems in Motion | Sudan Basnet";
    document.documentElement.classList.add("immersive-document");
    themeMeta?.setAttribute("content", "#050505");

    let frameId;
    let initialHashTimer;
    const updateProgress = () => {
      frameId = undefined;

      if (motionPreference.matches) {
        page.style.setProperty("--hero-progress", "0");
        page.querySelectorAll("[data-immersive-progress]").forEach((section) => {
          section.style.setProperty("--section-progress", "1");
        });
        return;
      }

      const hero = page.querySelector(".ip-hero");
      const heroRange = Math.max(
        (hero?.offsetHeight || window.innerHeight) - window.innerHeight,
        1,
      );
      const heroProgress = clamp(
        -(hero?.getBoundingClientRect().top || 0) / heroRange,
      );
      page.style.setProperty("--hero-progress", heroProgress.toFixed(4));

      page.querySelectorAll("[data-immersive-progress]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionProgress = clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        );
        section.style.setProperty(
          "--section-progress",
          sectionProgress.toFixed(4),
        );
      });
    };

    const requestProgressUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    if (window.location.hash) {
      initialHashTimer = window.setTimeout(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (!target) return;
        const previousInlineScrollBehavior =
          document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: "auto",
        });
        window.requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior =
            previousInlineScrollBehavior;
        });
      }, 120);
    }
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    motionPreference.addEventListener("change", requestProgressUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      if (initialHashTimer) window.clearTimeout(initialHashTimer);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      motionPreference.removeEventListener("change", requestProgressUpdate);
      document.documentElement.classList.remove("immersive-document");
      document.title = previousTitle;
      if (previousTheme) themeMeta?.setAttribute("content", previousTheme);
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="ip-page relative min-h-screen overflow-clip bg-[#050505] pb-[4.6rem] font-display text-[#f5f0e8] [--amber:#ffb449] [--blue:#4c65f7] [--hero-progress:0] [--ink:#050505] [--paper:#f5f0e8] [--pink:#ff62aa] [--sky:#80adff] [--violet:#b25cfa] max-[620px]:pb-[4.25rem]"
    >
      {showEntryLoader && <EntryLoader immersive />}
      <header className="pointer-events-none fixed left-0 top-0 z-30 grid w-full grid-cols-[1fr_auto_1fr] px-[clamp(1rem,3vw,3.5rem)] py-[1.4rem] text-[0.66rem] font-extrabold uppercase tracking-[0.19em] text-white/70 mix-blend-difference max-[900px]:grid-cols-2">
        <a
          href="#ip-home"
          className="pointer-events-auto text-[#ff62aa]"
          aria-label="Back to immersive home"
        >
          SB / 3D
        </a>
        <span className="max-[900px]:hidden">Systems in motion</span>
        <a
          href="/"
          className="pointer-events-auto justify-self-end text-right text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white max-[620px]:text-[0.58rem]"
        >
          Classic portfolio <span aria-hidden="true">↗</span>
        </a>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-white/15 bg-[#0f0f12eb] shadow-[0_-14px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl max-[620px]:flex max-[620px]:overflow-x-auto max-[620px]:[overscroll-behavior-x:contain] max-[620px]:[scrollbar-width:none] max-[620px]:[&::-webkit-scrollbar]:hidden"
        aria-label="Immersive portfolio navigation"
      >
        {navigation.map(([label, href], index) => (
          <a key={href} href={href} className={navItemClass}>
            <span className="font-editorial text-[1.35rem] font-normal leading-none tracking-normal text-[#ff62aa] max-[620px]:text-base">
              0{index + 1}
            </span>
            {label}
          </a>
        ))}
      </nav>

      <aside
        className="fixed right-4 top-1/2 z-[27] flex -translate-y-1/2 gap-2 [writing-mode:vertical-rl] max-[900px]:hidden"
        aria-label="Portfolio links"
      >
        <a className={quickLinkClass} href={resume} download>
          Résumé
        </a>
        <a
          className={quickLinkClass}
          href="https://www.linkedin.com/in/sudan-basnet/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className={quickLinkClass}
          href="https://github.com/SudanBasnet"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </aside>

      <section
        id="ip-home"
        className="ip-hero relative h-[270svh] bg-[#050505] bg-[radial-gradient(circle_at_52%_42%,rgba(76,101,247,0.2),transparent_34%)] max-[620px]:h-[230svh] motion-reduce:h-auto motion-reduce:min-h-[100svh]"
        aria-labelledby="ip-title"
      >
        <div className="ip-hero__sticky sticky top-0 isolate h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-[100svh]">
          <SystemsScene onReady={handleSceneReady} />
          <div className="ip-hero__grid" aria-hidden="true" />
          <div className="ip-hero__grain" aria-hidden="true" />
          <div className="ip-hero__shade" aria-hidden="true" />

          <div className="ip-hero__copy absolute left-[clamp(1.25rem,7vw,8rem)] top-1/2 w-[min(870px,82vw)] will-change-[transform,opacity] max-[620px]:top-[47%] max-[620px]:w-[calc(100%-2.5rem)] motion-reduce:!translate-y-[-50%] motion-reduce:!opacity-100">
            <p className={eyebrowClass}>Support engineer × developer</p>
            <h1
              id="ip-title"
              className="mt-4 max-w-[980px] text-[clamp(4rem,10.5vw,10rem)] font-[850] uppercase leading-[0.78] tracking-[-0.075em] max-[620px]:text-[clamp(3.55rem,18vw,5.7rem)]"
            >
              Keep systems
              <span className="ml-[clamp(1.5rem,11vw,11rem)] block bg-[linear-gradient(90deg,#ff62aa,#b25cfa_45%,#80adff)] bg-clip-text font-editorial font-light italic normal-case tracking-[-0.06em] text-transparent max-[620px]:ml-[0.45em] max-[620px]:mt-[0.1em]">
                moving.
              </span>
            </h1>
            <p className="!ml-[clamp(0rem,17vw,11rem)] !mt-[clamp(1.8rem,4vh,3.4rem)] max-w-[520px] text-[clamp(0.96rem,1.3vw,1.18rem)] leading-[1.7] text-white/70 max-[620px]:!ml-0">
              I&apos;m Sudan Basnet. I resolve the issue in front of me, trace
              the system behind it, and build a better path forward.
            </p>
          </div>

          <div className="ip-scroll-cue absolute bottom-8 right-[clamp(1.25rem,3vw,3.5rem)] grid grid-cols-[auto_72px_auto] items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/60 max-[620px]:grid-cols-[auto_44px_auto]" aria-hidden="true">
            <span>01</span>
            <i className="block h-px overflow-hidden bg-white/20 after:block after:h-full after:w-[45%] after:bg-[#ff62aa] after:content-[''] after:[animation:ip-scroll-line_1.8s_ease-in-out_infinite]" />
            <span>Trace the signal</span>
          </div>

          <div className="ip-orbit ip-orbit--one pointer-events-none absolute right-[7%] top-[8%] -z-[1] aspect-square w-[min(40vw,590px)] rounded-full border border-[#ff62aa2b] shadow-[inset_0_0_80px_rgba(76,101,247,0.035)]" aria-hidden="true" />
          <div className="ip-orbit ip-orbit--two pointer-events-none absolute bottom-[-13%] right-[19%] -z-[1] aspect-square w-[min(24vw,360px)] rounded-full border border-[#ffb44933]" aria-hidden="true" />
        </div>
      </section>

      <section
        id="ip-overview"
        className="ip-threshold relative overflow-hidden bg-[#f5f0e8] bg-[radial-gradient(circle_at_90%_20%,rgba(255,98,170,0.14),transparent_26rem)] px-[clamp(1.25rem,6vw,7rem)] py-[clamp(6rem,12vw,12rem)] text-[#050505] [--section-progress:0]"
        data-immersive-progress
        aria-labelledby="ip-threshold-title"
      >
        <div className={sectionLabelClass}>
          <span>02</span>
          <span>Reliability with a builder&apos;s perspective</span>
        </div>
        <div className="ip-threshold__statement mt-[clamp(4rem,9vw,9rem)] grid grid-cols-[minmax(140px,0.42fr)_1.58fr] items-start gap-[clamp(2rem,7vw,8rem)] max-[900px]:grid-cols-1">
          <p className="relative pl-5 text-[0.8rem] font-extrabold uppercase leading-[1.7] tracking-[0.14em] text-[#69666b] motion-reduce:!transform-none">
            Two disciplines.<br />One mindset.
          </p>
          <h2
            id="ip-threshold-title"
            className={`${motionHeadingClass} [&>span]:block [&>span]:w-fit [&>span]:will-change-transform`}
          >
            <span>Support the moment.</span>
            <span>Build the next.</span>
          </h2>
        </div>
        <div
          className="ip-metrics mt-[clamp(5rem,10vw,10rem)] grid grid-cols-3 border-t border-black/20 max-[900px]:grid-cols-1"
          aria-label="Professional highlights"
        >
          <article
            className={spotlightCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <strong className="origin-left bg-[linear-gradient(140deg,#d22d78,#5d52db)] bg-clip-text font-editorial text-[clamp(4rem,7vw,7rem)] font-normal leading-none text-transparent">
              3+
            </strong>
            <span className="max-w-[250px] leading-[1.55] text-[#5d5a61]">
              Years across enterprise support environments
            </span>
          </article>
          <article
            className={spotlightCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <strong className="origin-left bg-[linear-gradient(140deg,#d22d78,#5d52db)] bg-clip-text font-editorial text-[clamp(4rem,7vw,7rem)] font-normal leading-none text-transparent">
              100+
            </strong>
            <span className="max-w-[250px] leading-[1.55] text-[#5d5a61]">
              Users supported through high-stakes change
            </span>
          </article>
          <article
            className={spotlightCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <strong className="origin-left bg-[linear-gradient(140deg,#d22d78,#5d52db)] bg-clip-text font-editorial text-[clamp(4rem,7vw,7rem)] font-normal leading-none text-transparent">
              02
            </strong>
            <span className="max-w-[250px] leading-[1.55] text-[#5d5a61]">
              Support and development, working as one system
            </span>
          </article>
        </div>
      </section>

      <SkillsSection skills={skills} skillGroups={skillGroups} />

      <section
        id="ip-gallery"
        className="ip-gallery relative h-[260svh] bg-[#050505] [--section-progress:0] max-[620px]:h-[240svh] motion-reduce:h-auto motion-reduce:min-h-[100svh]"
        data-immersive-progress
        aria-labelledby="ip-gallery-title"
      >
        <div className="ip-gallery__sticky sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:grid motion-reduce:h-auto motion-reduce:min-h-[100svh] motion-reduce:gap-4 motion-reduce:px-5 motion-reduce:pb-12 motion-reduce:pt-28">
          <img
            className="ip-gallery__background absolute inset-0 h-full w-full object-cover object-[68%_38%] will-change-transform [filter:grayscale(0.6)_saturate(0.65)_contrast(1.12)_brightness(0.62)] max-[620px]:object-[64%_40%] motion-reduce:!transform-none"
            src={portrait}
            alt="Sudan Basnet"
          />
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_72%_40%,rgba(76,101,247,0.2),transparent_34%),linear-gradient(90deg,rgba(5,5,5,0.94),rgba(5,5,5,0.2)_60%),linear-gradient(0deg,rgba(5,5,5,0.96),transparent_46%,rgba(5,5,5,0.5))]" aria-hidden="true" />
          <div className="ip-gallery__heading absolute left-[clamp(1.25rem,6vw,7rem)] top-[clamp(5rem,11vh,8rem)] z-[2] max-w-[min(830px,72vw)] max-[900px]:max-w-[86vw] motion-reduce:relative motion-reduce:inset-auto motion-reduce:mb-8 motion-reduce:max-w-[680px] motion-reduce:!transform-none">
            <span className={eyebrowClass}>04 / Between incident and interface</span>
            <h2
              id="ip-gallery-title"
              className="mt-4 font-editorial text-[clamp(3.4rem,7.6vw,7.7rem)] font-light leading-[0.88] tracking-[-0.065em] max-[620px]:text-[clamp(3rem,14.5vw,4.6rem)]"
            >
              Turn friction into forward motion.
            </h2>
          </div>

          <figure className={`${galleryFrameClass} ip-gallery__frame--support`}>
            <img
              className="block h-full w-full object-cover [filter:saturate(0.9)_contrast(1.08)_brightness(0.9)]"
              src={endpointLab}
              alt="Technician configuring laptops and endpoint hardware"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.86))] px-[1.15rem] py-4 text-[0.69rem] font-bold uppercase tracking-[0.14em] text-white/80">
              Diagnose the environment.
            </figcaption>
          </figure>
          <figure className={`${galleryFrameClass} ip-gallery__frame--productivity`}>
            <img
              className="block h-full w-full object-cover [filter:saturate(0.9)_contrast(1.08)_brightness(0.9)]"
              src={deviceProvisioning}
              alt="Device provisioning workspace with laptop and mobile hardware"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.86))] px-[1.15rem] py-4 text-[0.69rem] font-bold uppercase tracking-[0.14em] text-white/80">
              Prepare every endpoint.
            </figcaption>
          </figure>
          <figure className={`${galleryFrameClass} ip-gallery__frame--fullstack`}>
            <img
              className="block h-full w-full object-cover [filter:saturate(0.9)_contrast(1.08)_brightness(0.9)]"
              src={systemsWorkspace}
              alt="Support engineer working across code and system monitoring displays"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.86))] px-[1.15rem] py-4 text-[0.69rem] font-bold uppercase tracking-[0.14em] text-white/80">
              Connect every layer.
            </figcaption>
          </figure>

          <p className="ip-gallery__note absolute bottom-[7vh] left-[clamp(1.25rem,6vw,7rem)] z-[4] max-w-[430px] text-[clamp(0.9rem,1.2vw,1.08rem)] leading-[1.65] text-white/70 max-[620px]:bottom-[28vh] max-[620px]:max-w-[56vw] max-[620px]:text-[0.78rem] motion-reduce:relative motion-reduce:inset-auto motion-reduce:z-[2] motion-reduce:mt-4 motion-reduce:max-w-[520px] motion-reduce:!transform-none motion-reduce:!opacity-100">
            Endpoint. Identity. Network. Interface. API. I follow the signal
            until the experience makes sense again.
          </p>
        </div>
      </section>

      <section
        className="ip-principles relative overflow-hidden bg-[#f5f0e8] bg-[radial-gradient(circle_at_10%_84%,rgba(76,101,247,0.13),transparent_27rem)] px-[clamp(1.25rem,6vw,7rem)] py-[clamp(6rem,12vw,12rem)] text-[#050505] [--section-progress:0]"
        data-immersive-progress
        aria-labelledby="ip-principles-title"
      >
        <div className={sectionLabelClass}>
          <span>05</span>
          <span>A practical operating system</span>
        </div>
        <h2
          id="ip-principles-title"
          className={`${motionHeadingClass} mt-[clamp(4rem,8vw,8rem)] [&>span]:block [&>span]:w-fit [&>span]:will-change-transform`}
        >
          <span>Calm process.</span>
          <span>Visible progress.</span>
        </h2>
        <div className="ip-principles__grid mt-[clamp(5rem,9vw,9rem)] grid grid-cols-3 border-t border-black/20 max-[900px]:grid-cols-1">
          <article
            className={principleCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <span className="inline-flex items-center gap-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#ba2b6b]">
              01 / Detect
            </span>
            <h3 className="mt-auto font-editorial text-[clamp(2rem,3.4vw,3.5rem)] font-normal leading-[0.98] tracking-[-0.045em] max-[620px]:mt-16">
              Listen before changing.
            </h3>
            <p className="mt-5 max-w-[280px] leading-[1.6] text-[#5f5b63]">
              Understand the user, environment, and real failure path.
            </p>
          </article>
          <article
            className={principleCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <span className="inline-flex items-center gap-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#ba2b6b]">
              02 / Resolve
            </span>
            <h3 className="mt-auto font-editorial text-[clamp(2rem,3.4vw,3.5rem)] font-normal leading-[0.98] tracking-[-0.045em] max-[620px]:mt-16">
              Restore with precision.
            </h3>
            <p className="mt-5 max-w-[280px] leading-[1.6] text-[#5f5b63]">
              Make the smallest dependable fix and verify it in context.
            </p>
          </article>
          <article
            className={principleCardClass}
            onPointerMove={updateCardSpotlight}
            onPointerLeave={resetCardSpotlight}
          >
            <span className="inline-flex items-center gap-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#ba2b6b]">
              03 / Improve
            </span>
            <h3 className="mt-auto font-editorial text-[clamp(2rem,3.4vw,3.5rem)] font-normal leading-[0.98] tracking-[-0.045em] max-[620px]:mt-16">
              Leave a better system.
            </h3>
            <p className="mt-5 max-w-[280px] leading-[1.6] text-[#5f5b63]">
              Document the insight, remove friction, and build for reuse.
            </p>
          </article>
        </div>
      </section>

      <ExperienceSection roles={roles} clients={clients} />

      <ProjectsSection projects={projects} />

      <ProfileSection portrait={portrait} />

      <ContactSection resume={resume} />
    </main>
  );
};

export default ImmersivePortfolio;
