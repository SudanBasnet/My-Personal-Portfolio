import project from "../assets/project1-optimized.avif";
import Project3 from "../assets/Project3.png";
import Project2 from "../assets/Project2.png";
import Project4 from "../assets/Project4.png";
import { Card } from "./Card";
import { Title } from "./Title";
import { ParallaxSection, Stagger } from "./Motion";

export const Project = () => {
  const projects = [
    {
      image: Project3,
      github: "https://github.com/SudanBasnet/FT-Client",
      url: "https://ft-client-six-delta.vercel.app/",
      title: "Finance Tracker",
      type: "Featured full-stack build",
      focus: "Expense visibility",
      description:
        "An authenticated finance tracker with dashboard charts, transaction CRUD, search, pagination, and protected routes.",
      tech: ["MongoDB", "Express", "React", "Recharts"],
      mediaFit: "contain",
    },
    {
      image: Project2,
      github: "https://github.com/SudanBasnet/React-NTDL",
      url: "https://react-ntdl-kappa.vercel.app/",
      title: "NTDL Full-Stack App",
      type: "Full-stack application",
      focus: "Persistent workflows",
      description:
        "A full-stack learning project with React UI, backend APIs, and persistent database workflows.",
      tech: ["MongoDB", "Express", "React"],
    },
    {
      image: Project4,
      github: "https://github.com/SudanBasnet/react-prank-calculator-project",
      url: "https://react-prank-calculator-project-41sykfis0-sudanbasnets-projects.vercel.app/",
      title: "Prank Calculator",
      type: "Interactive frontend",
      focus: "Playful UI states",
      description:
        "A playful React interface with polished interaction states and Tailwind-powered styling.",
      tech: ["React", "Tailwind CSS", "HTML"],
    },
    {
      image: project,
      github: "https://github.com/SudanBasnet/My-Personal-Portfolio",
      title: "Portfolio Website",
      type: "Personal brand system",
      focus: "Responsive storytelling",
      description:
        "A responsive personal brand site focused on support engineering experience and full-stack growth.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
    },
  ];

  return (
    <ParallaxSection className="section-wrap" id="projects" accent="lime">
      <div className="mb-10 grid items-end gap-5 md:grid-cols-[1fr_auto]">
        <Title
          title="Selected Projects"
          eyebrow="Built with intent"
          chapter="03"
          subtitle="A closer look at the interfaces and full-stack workflows I have designed, built, and shipped."
          align="left"
        />
        <div className="mb-14 flex items-center gap-3 rounded-full border border-black/20 bg-transparent px-5 py-3 dark:border-white/20 sm:mb-20">
          <span className="font-editorial text-3xl font-light text-slate-950 dark:text-white">04</span>
          <span className="text-[0.65rem] font-bold uppercase leading-4 tracking-[0.18em] text-slate-500 dark:text-white/45">Projects<br />selected</span>
        </div>
      </div>

      <Stagger className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            {...project}
            index={index}
            featured={index === 0}
          />
        ))}
      </Stagger>
    </ParallaxSection>
  );
};
