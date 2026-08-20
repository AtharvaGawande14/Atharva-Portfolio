import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";

const socials = [
  { id: "github", label: "GitHub", handle: "@AtharvaGawande14", href: profile.github, Icon: Github },
  { id: "linkedin", label: "LinkedIn", handle: "in/atharvagawande14", href: profile.linkedin, Icon: Linkedin },
];

export const Contact = () => (
  <footer id="contact" className="relative overflow-hidden px-6 pt-28 md:px-12 md:pt-44" data-testid="contact-section">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-lime/10 blur-[160px]" />
    <div className="relative mx-auto max-w-[1600px]">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-6 font-tech text-xs uppercase tracking-[0.35em] text-lime"
        data-testid="contact-overline"
      >
        Open to Junior Software Engineer roles
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[15vw] font-black leading-[0.85] tracking-tighter md:text-[10vw]"
        data-testid="contact-heading"
      >
        LET'S
        <br />
        <span className="text-stroke">TALK.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-14 md:mt-20"
      >
        
          <a
            href={`mailto:${profile.email}`}
            data-testid="contact-email-btn"
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-lime px-10 py-6 font-tech text-sm uppercase tracking-[0.25em] text-lime md:px-14 md:py-7"
          >
            <span className="absolute inset-0 translate-y-full bg-lime transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <Mail size={18} className="relative transition-colors duration-300 group-hover:text-black" />
            <span className="relative transition-colors duration-300 group-hover:text-black">{profile.email}</span>
          </a>
        
      </motion.div>

      <div className="mt-20 grid gap-px border-t border-white/10 bg-white/10 md:mt-28 md:grid-cols-2">
        {socials.map(({ id, label, handle, href, Icon }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`contact-social-${id}`}
            className="group flex items-center justify-between bg-base px-2 py-10 transition-colors duration-500 hover:bg-cardbg md:px-6"
          >
            <span className="flex items-center gap-5">
              <Icon size={26} className="text-muted transition-colors duration-500 group-hover:text-lime" />
              <span>
                <span className="block font-display text-2xl font-bold tracking-tight md:text-3xl">{label}</span>
                <span className="mt-1 block font-tech text-xs tracking-[0.2em] text-muted">{handle}</span>
              </span>
            </span>
            <ArrowUpRight
              size={28}
              className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime"
            />
          </a>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-3 py-10 font-tech text-[11px] uppercase tracking-[0.25em] text-muted md:flex-row md:items-center">
        <span data-testid="footer-copyright">© 2026 {profile.name}</span>
        <span data-testid="footer-credit">Designed & built with React, Framer Motion & Lenis</span>
      </div>
    </div>
  </footer>
);
