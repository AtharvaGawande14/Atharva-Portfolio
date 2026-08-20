import Marquee from "react-fast-marquee";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications, profile } from "../data/portfolio";

const CertItem = ({ cert }) => (
  <div className="mx-10 flex items-center gap-4 md:mx-16" data-testid={`cert-${cert.id}`}>
    <BadgeCheck size={18} className="shrink-0 text-lime" />
    <span className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-white/85 md:text-4xl">
      {cert.name}
    </span>
    <span className="whitespace-nowrap font-tech text-xs uppercase tracking-[0.25em] text-muted">
      {cert.issuer} · {cert.date}
    </span>
  </div>
);

export const Certifications = () => (
  <section className="relative overflow-hidden border-y border-white/10 py-20 md:py-28" data-testid="certifications-section">
    <p className="mb-12 px-6 text-center font-tech text-xs uppercase tracking-[0.35em] text-muted md:px-12" data-testid="certifications-overline">
      Certifications — a few highlights
    </p>
    <Marquee speed={35} gradient={false} pauseOnHover>
      {certifications.map((c) => (
        <CertItem key={c.id} cert={c} />
      ))}
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="certifications-linkedin-link"
        className="group mx-10 flex items-center gap-3 md:mx-16"
      >
        <span className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-stroke-lime md:text-4xl">
          View all on LinkedIn
        </span>
        <ArrowUpRight size={26} className="text-lime transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>
    </Marquee>
  </section>
);
