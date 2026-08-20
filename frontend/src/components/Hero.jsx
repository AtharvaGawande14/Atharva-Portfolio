import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { profile } from "../data/portfolio";

const Letters = ({ text, delay = 0, className = "" }) => (
  <span className={`inline-flex overflow-hidden ${className}`}>
    {text.split("").map((ch, i) => (
      <motion.span
        key={i}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

export const Hero = () => {
  const go = (target) => (e) => {
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
  };

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12" data-testid="hero-section">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-lime/10 blur-[140px] animate-pulse-orb" />
      <div className="pointer-events-none absolute -left-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-neon/10 blur-[140px]" />

      <div className="mx-auto w-full max-w-[1600px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-tech text-xs uppercase tracking-[0.35em] text-lime"
          data-testid="hero-overline"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-lime" />
          {profile.title}
        </motion.p>

        <h1 className="font-display font-black leading-[0.9] tracking-tighter" data-testid="hero-name">
          <span className="block text-[16vw] md:text-[11vw]">
            <Letters text={profile.firstName} delay={0.35} />
          </span>
          <span className="block text-[16vw] text-stroke md:text-[11vw]">
            <Letters text={profile.lastName} delay={0.7} />
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="max-w-md text-base font-light text-muted md:text-lg"
            data-testid="hero-tagline"
          >
            I build AI-powered tools and full-stack products that ship — voice assistants, dashboards, and systems with real users in mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-wrap items-center gap-5"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={go("#projects")}
                data-testid="hero-view-work-btn"
                className="group relative overflow-hidden border border-lime px-8 py-4 font-tech text-xs uppercase tracking-[0.25em] text-lime"
              >
                <span className="absolute inset-0 translate-y-full bg-lime transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-black">View My Work</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={go("#contact")}
                data-testid="hero-contact-btn"
                className="group relative overflow-hidden border border-white/20 px-8 py-4 font-tech text-xs uppercase tracking-[0.25em]"
              >
                <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-black">Get In Touch</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 font-tech text-[11px] uppercase tracking-[0.25em] text-muted md:mt-24"
        >
          <span className="flex items-center gap-2" data-testid="hero-location">
            <MapPin size={13} className="text-lime" /> {profile.location}
          </span>
          <span className="hidden items-center gap-2 md:flex" data-testid="hero-scroll-hint">
            Scroll to explore <ArrowDown size={13} className="animate-bounce text-lime" />
          </span>
        </motion.div>
      </div>
    </section>
  );
};
