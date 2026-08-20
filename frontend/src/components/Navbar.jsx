import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { profile } from "../data/portfolio";

const links = [
  { label: "Work", target: "#projects", testId: "nav-link-work" },
  { label: "Skills", target: "#skills", testId: "nav-link-skills" },
  { label: "Experience", target: "#experience", testId: "nav-link-experience" },
  { label: "Contact", target: "#contact", testId: "nav-link-contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => (e) => {
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-white/10 bg-black/50 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#top"
          onClick={go("#top")}
          data-testid="nav-logo"
          className="font-display text-xl font-black tracking-tight"
        >
          AG<span className="text-lime">.</span>
        </a>
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.target}
              onClick={go(l.target)}
              data-testid={l.testId}
              className="group relative font-tech text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            data-testid="nav-email-cta"
            className="group relative overflow-hidden border border-white/20 px-5 py-2.5 font-tech text-xs uppercase tracking-[0.2em]"
          >
            <span className="absolute inset-0 translate-y-full bg-lime transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative transition-colors duration-300 group-hover:text-black">Email Me</span>
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
};
