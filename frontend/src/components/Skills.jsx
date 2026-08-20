import { motion } from "framer-motion";
import { Code2, Globe, Layers, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { skillGroups } from "../data/portfolio";

const icons = { programming: Code2, web: Globe, frameworks: Layers, "ai-tools": Sparkles };

export const Skills = () => (
  <section id="skills" className="relative px-6 py-28 md:px-12 md:py-40" data-testid="skills-section">
    <div className="mx-auto max-w-[1600px]">
      <SectionHeading overline="Capabilities" title={<>What I <span className="text-stroke">work with.</span></>} testId="skills" />
      <div className="grid gap-px bg-white/10 md:grid-cols-2">
        {skillGroups.map((group, gi) => {
          const Icon = icons[group.id];
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: gi * 0.1 }}
              className="group bg-base p-8 transition-colors duration-500 hover:bg-cardbg md:p-12"
              data-testid={`skill-group-${group.id}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{group.label}</h3>
                <Icon size={22} className="text-muted transition-colors duration-500 group-hover:text-lime" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: gi * 0.08 + ii * 0.04 }}
                    className="border border-white/15 px-4 py-2 font-tech text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:border-lime/50 hover:text-lime"
                    data-cursor-hover
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
