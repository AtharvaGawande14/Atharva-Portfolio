import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

const aboutImage =
  "https://images.pexels.com/photos/16018144/pexels-photo-16018144.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const About = () => (
  <section className="relative px-6 py-28 md:px-12 md:py-40" data-testid="about-section">
    <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-12 md:gap-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-5"
      >
        <div className="group relative overflow-hidden" data-cursor-hover>
          <img
            src={aboutImage}
            alt="Atharva Gawande working in a dark studio"
            className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            data-testid="about-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-tech text-[11px] uppercase tracking-[0.3em] text-lime">
            BCA '26 — G. H. Raisoni University
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col justify-center md:col-span-7 md:pl-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-tech text-xs uppercase tracking-[0.35em] text-lime"
          data-testid="about-overline"
        >
          About
        </motion.p>
        {profile.about.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
            className="mb-6 max-w-2xl text-lg font-light leading-relaxed text-muted md:text-xl"
            data-testid={`about-paragraph-${i}`}
          >
            {para}
          </motion.p>
        ))}
        <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4" data-testid="about-stats">
          {profile.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-base p-6"
              data-testid={`stat-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              <p className="font-display text-4xl font-black tracking-tight text-lime md:text-5xl">{s.value}</p>
              <p className="mt-2 font-tech text-[10px] uppercase tracking-[0.25em] text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
