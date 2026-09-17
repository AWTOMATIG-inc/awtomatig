"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInSection({
  children,
  className,
  initial = { opacity: 0, y: 30 },
  scrollTop = { opacity: 1, y: 0 },
  scrollBottom = { opacity: 0, y: 30 },
  margin = "100px 0px -50px 0px",
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: margin || "100px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? scrollTop : scrollBottom}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
