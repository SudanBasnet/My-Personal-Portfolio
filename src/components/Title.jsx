import { Reveal } from "./Motion";

export const Title = ({ title }) => {
  return (
    <Reveal className="mb-10 text-center">
      <p className="chip mx-auto mb-4 w-fit">Portfolio</p>
      <h2 className="text-4xl font-black text-slate-950 dark:text-white sm:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300 shadow-[0_0_18px_rgba(34,211,238,0.65)]"></div>
    </Reveal>
  );
};
