"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInSection({
  children,
  initial = { opacity: 0, y: 40 },
  scrollTop = { opacity: 1, y: 0 },
  scrollBottom = { opacity: 0, y: 80 },
  margin = "400px 0px -100px 0px",
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: margin,
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? scrollTop : scrollBottom}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
