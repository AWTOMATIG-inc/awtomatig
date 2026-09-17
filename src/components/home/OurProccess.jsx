"use client";

import FadeInSection from "@/components/animation/FadeEffect";
import CommonHeading from "@/components/CommonHeading";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const processSteps = [
  {
    step: "Step 01",
    phase: "Plan",
    tag: "Discovery",
    title: "Understand The Reality",
    desc: "We start with a focused conversation to understand how your business works today — mapping bottlenecks, tool silos, and high-impact opportunities.",
    output: "Systems & Friction Audit",
    gradient: "from-[#02D5E8]/85 to-[#44B6E9]/85",
    accentColor: "rgba(2, 213, 232, 0.6)",
    badgeBg: "bg-gradient-to-r from-[#02D5E8] to-[#44B6E9]",
    badgeText: "text-[#050508]",
    dotGlow: "shadow-[0_0_12px_rgba(2,213,232,0.25)]",
  },
  {
    step: "Step 02",
    phase: "Structure",
    tag: "Architecture",
    title: "Design The Blueprint",
    desc: "We engineer the exact system topology and API data flows before writing code. You get clear schemas, wireframes, and milestones without technical bloat.",
    output: "Architecture & Data Schema",
    gradient: "from-[#44B6E9]/85 to-[#B66DD2]/85",
    accentColor: "rgba(182, 109, 210, 0.6)",
    badgeBg: "bg-gradient-to-r from-[#44B6E9] to-[#B66DD2]",
    badgeText: "text-[#050508]",
    dotGlow: "shadow-[0_0_12px_rgba(182,109,210,0.25)]",
  },
  {
    step: "Step 03",
    phase: "Execute",
    tag: "Handover",
    title: "Execute & Deliver",
    desc: "Engineering ships in visible, tested stages. We deploy to production with edge performance, automated tests, and complete documentation for team.",
    output: "Production & Video Docs",
    gradient: "from-[#B66DD2]/85 to-[#02D5E8]/85",
    accentColor: "rgba(2, 213, 232, 0.6)",
    badgeBg: "bg-gradient-to-r from-[#B66DD2] to-[#02D5E8]",
    badgeText: "text-[#050508]",
    dotGlow: "shadow-[0_0_12px_rgba(2,213,232,0.25)]",
  },
];

/* Individual Desktop Timeline Step with Synchronized Scroll Reveal */
function DesktopStepRow({ item, idx }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, {
    margin: "-12% 0px -12% 0px",
    once: true,
  });

  const isEven = idx % 2 === 1; // Step 2 is flipped

  return (
    <div ref={rowRef} className="relative grid grid-cols-2 items-start">
      {/* CENTER TIMELINE DOT (Smooth, layered, elegant halo) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-10 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0.8, opacity: 0.4 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
            isInView
              ? `bg-white/[0.04] border border-white/20 ${item.dotGlow}`
              : "bg-transparent border border-white/10"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500`}
            style={{
              boxShadow: isInView ? `0 0 8px ${item.accentColor}` : "none",
            }}
          />
        </motion.div>
      </div>

      {/* ================= LEFT COLUMN ================= */}
      {!isEven ? (
        /* Step 1 & 3: Badge on Left */
        <motion.div
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="pr-10 lg:pr-14 flex flex-col items-end relative"
        >
          {/* Badge strictly aligned to h-10 baseline */}
          <div className="h-10 flex items-center justify-end">
            <span
              className={`px-5 py-2 rounded-full ${item.badgeBg} ${item.badgeText} font-inter font-bold text-xs tracking-wider uppercase shadow-md`}
            >
              {item.step} · {item.phase}
            </span>
          </div>
        </motion.div>
      ) : (
        /* Step 2: Content Card on Left */
        <motion.div
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="pr-10 lg:pr-14 text-right flex flex-col items-end w-full"
        >
          {/* Title strictly aligned to h-10 baseline */}
          <div className="h-10 flex items-center justify-end gap-2">
            <span className="text-xs font-mono text-[#B66DD2] uppercase tracking-wider">
              // {item.tag}
            </span>
            <h3 className="text-xl lg:text-2xl font-inter font-bold text-white tracking-tight">
              {item.title}
            </h3>
          </div>

          {/* Minimal Clean Card */}
          <div className="mt-3 w-full rounded-2xl border border-white/10 bg-[#080B11]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-left transition-all duration-300 hover:border-white/20">
            <p className="text-lg text-justify font-inter text-neutral-300 leading-relaxed">
              {item.desc}
            </p>
            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                Output: {item.output}
              </span>
              <Link
                href="/contact"
                className="text-xs font-inter font-semibold text-[#02D5E8] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Explore</span>
                <Icon icon="meteor-icons:arrow-up-right" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= RIGHT COLUMN ================= */}
      {!isEven ? (
        /* Step 1 & 3: Content Card on Right */
        <motion.div
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="pl-10 lg:pl-14 text-left flex flex-col items-start w-full"
        >
          {/* Title strictly aligned to h-10 baseline */}
          <div className="h-10 flex items-center justify-start gap-2">
            <h3 className="text-xl lg:text-2xl font-inter font-bold text-white tracking-tight">
              {item.title}
            </h3>
            <span className="text-xs font-mono text-[#02D5E8] uppercase tracking-wider">
              // {item.tag}
            </span>
          </div>

          {/* Minimal Clean Card */}
          <div className="mt-3 w-full rounded-2xl border border-white/10 bg-[#080B11]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-left transition-all duration-300 hover:border-white/20">
            <p className="text-lg text-justify font-inter text-neutral-300 leading-relaxed">
              {item.desc}
            </p>
            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                Output: {item.output}
              </span>
              <Link
                href="/contact"
                className="text-xs font-inter font-semibold text-[#02D5E8] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Explore</span>
                <Icon icon="meteor-icons:arrow-up-right" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Step 2: Badge on Right */
        <motion.div
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="pl-10 lg:pl-14 flex flex-col items-start relative"
        >
          {/* Badge strictly aligned to h-10 baseline */}
          <div className="h-10 flex items-center justify-start">
            <span
              className={`px-5 py-2 rounded-full ${item.badgeBg} ${item.badgeText} font-inter font-bold text-xs tracking-wider uppercase shadow-md`}
            >
              {item.step} · {item.phase}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* Individual Mobile Step with Scroll Reveal */
function MobileStepRow({ item }) {
  const stepRef = useRef(null);
  const isInView = useInView(stepRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  return (
    <motion.div
      ref={stepRef}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative text-left"
    >
      {/* Mobile Smooth Layered Dot */}
      <div className="absolute -left-[28px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/15">
        <div
          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500`}
          style={{
            boxShadow: isInView ? `0 0 6px ${item.accentColor}` : "none",
          }}
        />
      </div>

      {/* Step Badge */}
      <div className="inline-block mb-2">
        <span
          className={`px-3.5 py-1 rounded-full ${item.badgeBg} ${item.badgeText} font-inter font-bold text-[11px] tracking-wider uppercase`}
        >
          {item.step} · {item.phase}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-inter font-bold text-white tracking-tight">
        {item.title}
      </h3>

      {/* Card */}
      <div className="mt-3 rounded-xl border border-white/10 bg-[#080B11]/90 backdrop-blur-xl p-4 sm:p-5 shadow-lg">
        <p className="text-xs sm:text-sm font-inter text-neutral-300 leading-relaxed">
          {item.desc}
        </p>
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">Output: {item.output}</span>
          <Link href="/contact" className="text-[#02D5E8] font-medium inline-flex items-center gap-1">
            <span>Explore</span>
            <Icon icon="meteor-icons:arrow-up-right" className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurProccess() {
  const desktopTimelineRef = useRef(null);
  const mobileTimelineRef = useRef(null);

  // Desktop scroll progress driving the vertical timeline line
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopTimelineRef,
    offset: ["start 75%", "end 75%"],
  });
  const desktopLineHeight = useTransform(desktopProgress, [0, 1], ["0%", "100%"]);

  // Mobile scroll progress
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 75%", "end 75%"],
  });
  const mobileLineHeight = useTransform(mobileProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden bg-black">
      {/* Subtle Ambient Backing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[450px] bg-gradient-to-b from-[#02d5e8]/8 via-[#b66dd2]/6 to-transparent blur-[160px] pointer-events-none -z-1" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <FadeInSection
            initial={{ opacity: 0, y: 25 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: -25 }}
            margin="40px 0px -40px 0px"
          >
            <CommonHeading title="Our Process">
              A Disciplined Way To Deliver
            </CommonHeading>

            <p className="mt-4 text-sm sm:text-base font-inter text-neutral-400 leading-relaxed max-w-lg mx-auto">
              A transparent, three-phase framework engineered to eliminate friction from first audit to live deployment.
            </p>
          </FadeInSection>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP TIMELINE (Alternating Left/Right with Smooth Spine)  */}
        {/* ============================================================ */}
        <div ref={desktopTimelineRef} className="relative hidden md:block">
          {/* Static Background Spine Track (Subtle & Soft) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-5 bottom-5 w-[1.5px] bg-white/[0.06]" />

          {/* Animated Smooth Fill Line */}
          <motion.div
            style={{ height: desktopLineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-5 w-[1.5px] bg-gradient-to-b from-[#02D5E8]/70 via-[#44B6E9]/60 to-[#B66DD2]/70 shadow-[0_0_8px_rgba(2,213,232,0.2)]"
          />

          <div className="space-y-24 lg:space-y-32">
            {processSteps.map((item, idx) => (
              <DesktopStepRow key={item.step} item={item} idx={idx} />
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE TIMELINE (Left-Aligned Clean Spine with Smooth Reveal)*/}
        {/* ============================================================ */}
        <div ref={mobileTimelineRef} className="relative md:hidden pl-8">
          {/* Static Background Spine Track */}
          <div className="absolute left-2.5 top-2 bottom-6 w-[1.5px] bg-white/[0.06]" />

          {/* Animated Smooth Fill Line */}
          <motion.div
            style={{ height: mobileLineHeight }}
            className="absolute left-2.5 top-2 w-[1.5px] bg-gradient-to-b from-[#02D5E8]/70 via-[#44B6E9]/60 to-[#B66DD2]/70 shadow-[0_0_6px_rgba(2,213,232,0.2)]"
          />

          <div className="space-y-12">
            {processSteps.map((item) => (
              <MobileStepRow key={item.step} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
