"use client";

import { motion } from "framer-motion";

const glowPath = [
  { x: "0%", y: "51%", rotate: 0 },
  { x: "8%", y: "31%", rotate: 18 },
  { x: "22%", y: "13%", rotate: 36 },
  { x: "46%", y: "21%", rotate: 72 },
  { x: "53%", y: "80%", rotate: 108 },
  { x: "84%", y: "89%", rotate: 144 },
  { x: "99%", y: "47%", rotate: 180 },
  { x: "80%", y: "7%", rotate: 216 },
  { x: "59%", y: "41%", rotate: 251 },
  { x: "38%", y: "78%", rotate: 288 },
  { x: "3%", y: "79%", rotate: 324 },
  { x: "0%", y: "51%", rotate: 360 },
];

export default function GlowBall({ size = 500, duration = 20, delay = 0 }) {
  return (
    <motion.div
      className="
        absolute bottom-0 left-0
        aspect-square
        rounded-full
        opacity-50
        blur-2xl sm:blur-3xl
        pointer-events-none
        will-change-transform
      "
      style={{
        width: `${Math.min(size, 600)}px`,
        maxWidth: "90vw",
        background: "radial-gradient(circle, rgba(2,213,232,0.45) 0%, rgba(43,56,141,0.25) 45%, transparent 70%)",
      }}
      animate={{
        x: glowPath.map((p) => p.x),
        y: glowPath.map((p) => p.y),
        rotate: glowPath.map((p) => p.rotate),
      }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
}
