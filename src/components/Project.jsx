import { projects } from "../data/projects";
import { Card } from "./Card";
import { Title } from "./Title";
import { ParallaxSection, Stagger } from "./Motion";

export const Project = () => {
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
          <span className="font-editorial text-3xl font-light text-slate-950 dark:text-white">
            {String(projects.length).padStart(2, "0")}
          </span>
          <span className="text-[0.65rem] font-bold uppercase leading-4 tracking-[0.18em] text-slate-500 dark:text-white/45">
            Projects
            <br />
            selected
          </span>
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
