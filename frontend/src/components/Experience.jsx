import { motion } from "framer-motion";
import { GraduationCap, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { experience, education, leadership } from "../data/portfolio";

export const Experience = () => (
  <section id="experience" className="relative px-6 py-28 md:px-12 md:py-40" data-testid="experience-section">
    <div className="mx-auto max-w-[1600px]">
      <SectionHeading overline="Journey" title={<>Experience & <span className="text-stroke">education.</span></>} testId="experience" />
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          {experience.map((job, i) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative border-l border-white/10 pb-14 pl-8 transition-colors duration-500 last:pb-0 hover:border-lime/60 md:pl-12"
              data-testid={`experience-item-${job.id}`}
            >
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-white/30 transition-colors duration-500 group-hover:bg-lime" />
              <p className="mb-2 font-tech text-[11px] uppercase tracking-[0.3em] text-lime">{job.period}</p>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{job.role}</h3>
              <p className="mb-5 mt-1 font-tech text-xs uppercase tracking-[0.2em] text-muted">{job.company}</p>
              <ul className="space-y-3">
                {job.points.map((pt, pi) => (
                  <li key={pi} className="flex gap-3 text-sm font-light leading-relaxed md:text-base" style={{ color: "#D1D5DB" }}>
                    <span className="mt-2 h-px w-4 shrink-0 bg-lime/60" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="space-y-px md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="border border-white/10 bg-surface p-8 md:p-10"
            data-testid="education-card"
          >
            <GraduationCap size={22} className="mb-6 text-lime" />
            <p className="mb-2 font-tech text-[11px] uppercase tracking-[0.3em] text-muted">{education.period}</p>
            <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{education.degree}</h3>
            <p className="mt-2 text-sm font-light text-muted">{education.school}</p>
            <p className="mt-5 inline-block border border-lime/40 px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-lime">
              {education.grade}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="border border-white/10 bg-surface p-8 md:p-10"
            data-testid="leadership-card"
          >
            <Users size={22} className="mb-6 text-neon" />
            <p className="mb-2 font-tech text-[11px] uppercase tracking-[0.3em] text-muted">Leadership</p>
            <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {leadership.role} — {leadership.org}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted">{leadership.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
