import { motion } from "framer-motion";

export const SectionHeading = ({ overline, title, testId }) => (
  <div className="mb-16 md:mb-24">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-4 font-tech text-xs uppercase tracking-[0.35em] text-lime"
      data-testid={`${testId}-overline`}
    >
      {overline}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl"
      data-testid={`${testId}-title`}
    >
      {title}
    </motion.h2>
  </div>
);
