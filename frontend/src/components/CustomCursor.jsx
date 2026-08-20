import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      data-testid="custom-cursor"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full bg-white mix-blend-difference md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hovering ? 2.8 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
};
