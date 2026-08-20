import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, profile } from "../data/portfolio";

const ProjectPanel = ({ project }) => {
  const isLime = project.accent === "lime";
  return (
    <div
      className="group relative h-[68vh] w-[85vw] shrink-0 overflow-hidden md:h-[74vh] md:w-[72vw]"
      data-testid={`project-panel-${project.id}`}
      data-cursor-hover
    >
      <img
        src={project.image}
        alt={`${project.title} — ${project.tagline}`}
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1500ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

      <span
        className={`absolute right-6 top-4 font-display text-[9rem] font-black leading-none tracking-tighter md:text-[13rem] ${
          isLime ? "text-stroke-lime" : "text-stroke"
        } opacity-40`}
      >
        {project.index}
      </span>

      <div className="absolute bottom-0 left-0 w-full p-6 md:max-w-2xl md:p-12">
        <div className="border border-white/10 bg-black/50 p-6 backdrop-blur-xl md:p-9">
          <p className={`mb-2 font-tech text-[11px] uppercase tracking-[0.3em] ${isLime ? "text-lime" : "text-neon"}`}>
            {project.tagline}
          </p>
          <h3 className="mb-4 font-display text-3xl font-black tracking-tight md:text-5xl">{project.title}</h3>
          <p className="mb-6 text-sm font-light leading-relaxed text-muted md:text-base">{project.description}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="border border-white/15 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.15em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-link-${project.id}`}
            className={`group/link inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
              isLime ? "text-lime" : "text-neon"
            }`}
          >
            <Github size={14} /> View on GitHub
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[380vh]" data-testid="projects-section">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max items-center gap-[5vw] pl-[6vw] pr-[10vw]">
          <div className="w-[80vw] shrink-0 md:w-[42vw]">
            <p className="mb-4 font-tech text-xs uppercase tracking-[0.35em] text-lime" data-testid="projects-overline">
              Selected Work
            </p>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl" data-testid="projects-title">
              Projects that
              <br />
              <span className="text-stroke">actually ship.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base font-light text-muted">
              Four builds I'm proud of — keep scrolling, the gallery moves with you.
            </p>
            <p className="mt-10 font-tech text-[11px] uppercase tracking-[0.3em] text-muted">
              ( {projects.length} ) — Drag your scroll
            </p>
          </div>
          {projects.map((p) => (
            <ProjectPanel key={p.id} project={p} />
          ))}
        </motion.div>

        <div className="absolute inset-x-6 bottom-8 md:inset-x-12">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: progress }} className="h-px bg-lime" data-testid="projects-progress" />
          </div>
        </div>
      </div>
    </section>
  );
};
