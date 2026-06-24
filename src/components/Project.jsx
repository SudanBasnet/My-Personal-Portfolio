import project from "../assets/project1.png";
import Project3 from "../assets/Project3.png";
import Project2 from "../assets/Project2.png";
import Project4 from "../assets/Project4.png";
import { Card } from "./Card";
import { Title } from "./Title";
import { ParallaxSection, Stagger } from "./Motion";

export const Project = () => {
  const projects = [
    {
      image: project,
      github: "https://github.com/SudanBasnet?tab=repositories",
      url: "",
      title: "Portfolio Website",
      description:
        "A responsive personal brand site focused on support engineering experience and full-stack growth.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      image: Project3,
      github: "https://github.com/SudanBasnet/FT-Client",
      url: "https://ft-client-six-delta.vercel.app/",
      title: "Finance Tracker",
      description:
        "A MERN finance app for tracking expenses, reviewing activity, and improving money visibility.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      image: Project2,
      github: "https://github.com/SudanBasnet/React-NTDL",
      url: "https://react-ntdl-kappa.vercel.app/",
      title: "NTDL Full-Stack App",
      description:
        "A full-stack learning project with React UI, backend APIs, and persistent database workflows.",
      tech: ["MongoDB", "Express", "React"],
    },
    {
      image: Project4,
      github: "https://github.com/SudanBasnet/react-prank-calculator-project",
      url: "https://react-prank-calculator-project-41sykfis0-sudanbasnets-projects.vercel.app/",
      title: "Prank Calculator",
      description:
        "A playful React interface with polished interaction states and Tailwind-powered styling.",
      tech: ["React", "Tailwind CSS", "HTML"],
    },
  ];

  return (
    <ParallaxSection className="section-wrap" id="projects" accent="lime">
      <Title title="Selected Projects" />

      <Stagger className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} {...project} />
        ))}
      </Stagger>
    </ParallaxSection>
  );
};
