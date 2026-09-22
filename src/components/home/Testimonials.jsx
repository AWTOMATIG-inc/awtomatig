"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import CommonHeading from "@/components/CommonHeading";

// Inline Icons for crisp, lightweight rendering
function ArrowUpIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function ArrowDownIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const testimonialsData = [
  {
    id: 1,
    quote:
      "Awtomatig has been extraordinarily professional throughout our entire system architecture overhaul, and we have learnt about our own operations from them. It has been an insightful and transformative experience partnering with them.",
    author: "Marcus Sterling",
    role: "Chief Technology Officer",
    company: "Zenithics Global",
    logo: "/images/sponsor/partner-1.png",
    accent: "#02D5E8",
  },
  {
    id: 2,
    quote:
      "Working with the Awtomatig team felt like having an elite Silicon Valley engineering and operations team right inside our company. Their attention to detail, proactive communication, and delivery speed were unmatched.",
    author: "Sarah Jenkins",
    role: "Managing Director",
    company: "The Smith Lake Life",
    logo: "/images/sponsor/partner-2.png",
    accent: "#44B6E9",
  },
  {
    id: 3,
    quote:
      "They automated our client onboarding, contract execution, and payment reconciliation from end to end. What used to take days of manual drag is now completely autonomous with zero drop-off.",
    author: "Carlos Mendez",
    role: "Founder & Managing Partner",
    company: "No Spain No Gain",
    logo: "/images/sponsor/partner-3.png",
    accent: "#F59E0B",
  },
  {
    id: 4,
    quote:
      "Awtomatig transformed our lead qualification and CRM operations completely. What used to take our sales reps four hours of daily manual sync is now completely autonomous with zero follow-ups required.",
    author: "Michael Vance",
    role: "Head of Growth & Operations",
    company: "Sell My Rig",
    logo: "/images/sponsor/partner-4.png",
    accent: "#02D5E8",
  },
  {
    id: 5,
    quote:
      "Awtomatig replaced our fragmented back-office tools with a single synchronized engine. The reliability, uptime, and SLA guarantees gave our leadership team total peace of mind to scale aggressively.",
    author: "David Chen",
    role: "VP of Digital Infrastructure",
    company: "W. Media International",
    logo: "/images/sponsor/partner-5.png",
    accent: "#B66DD2",
  },
  {
    id: 6,
    quote:
      "We were very satisfied with the amount of operational clarity collected, and with their analysis and recommendations, we identified how to build a scalable, high-momentum position for our company.",
    author: "Elena Rostova",
    role: "Principal Product Architect",
    company: "Objective Focus",
    logo: "/images/sponsor/partner-6.png",
    accent: "#44B6E9",
  },
];

// Silky smooth Apple/Linear cubic-bezier ease
const smoothEase = [0.22, 1, 0.36, 1];

// Quote & attribution transition variants
const quoteVariants = {
  enter: (dir) => ({
    y: dir === "next" ? 30 : -30,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      y: { duration: 0.55, ease: smoothEase },
      opacity: { duration: 0.45, ease: "easeOut" },
      filter: { duration: 0.4, ease: "easeOut" },
    },
  },
  exit: (dir) => ({
    y: dir === "next" ? -24 : 24,
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      y: { duration: 0.35, ease: smoothEase },
      opacity: { duration: 0.28, ease: "easeIn" },
      filter: { duration: 0.25 },
    },
  }),
};

// Active logo transition variants inside the circular badge (Desktop vertical)
const activeLogoVariants = {
  enter: (dir) => ({
    y: dir === "next" ? 35 : -35,
    opacity: 0,
    scale: 0.88,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 0.5, ease: smoothEase },
      opacity: { duration: 0.4, ease: "easeOut" },
      scale: { duration: 0.5, ease: smoothEase },
    },
  },
  exit: (dir) => ({
    y: dir === "next" ? -28 : 28,
    opacity: 0,
    scale: 0.88,
    transition: {
      y: { duration: 0.32, ease: smoothEase },
      opacity: { duration: 0.25, ease: "easeIn" },
      scale: { duration: 0.32, ease: smoothEase },
    },
  }),
};

// Mobile horizontal quote transition variants (sliding left/right)
const mobileQuoteVariants = {
  enter: (dir) => ({
    x: dir === "next" ? 35 : -35,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 0.55, ease: smoothEase },
      opacity: { duration: 0.45, ease: "easeOut" },
      filter: { duration: 0.4, ease: "easeOut" },
    },
  },
  exit: (dir) => ({
    x: dir === "next" ? -30 : 30,
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      x: { duration: 0.35, ease: smoothEase },
      opacity: { duration: 0.28, ease: "easeIn" },
      filter: { duration: 0.25 },
    },
  }),
};

// Mobile horizontal active logo transition variants (sliding left/right)
const mobileActiveLogoVariants = {
  enter: (dir) => ({
    x: dir === "next" ? 40 : -40,
    opacity: 0,
    scale: 0.88,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.5, ease: smoothEase },
      opacity: { duration: 0.4, ease: "easeOut" },
      scale: { duration: 0.5, ease: smoothEase },
    },
  },
  exit: (dir) => ({
    x: dir === "next" ? -32 : 32,
    opacity: 0,
    scale: 0.88,
    transition: {
      x: { duration: 0.32, ease: smoothEase },
      opacity: { duration: 0.25, ease: "easeIn" },
      scale: { duration: 0.32, ease: smoothEase },
    },
  }),
};

// Thumbnail crossfade variants
const thumbVariants = {
  enter: { opacity: 0, scale: 0.8 },
  center: {
    opacity: 0.75,
    scale: 1,
    transition: { duration: 0.4, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // 'next' | 'prev'
  const [isLocked, setIsLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonialsData.length;
  const current = testimonialsData[activeIndex];

  // Previous and next indices for 3-item carousel reel
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevItem = testimonialsData[prevIndex];
  const nextItem = testimonialsData[nextIndex];

  const changeSlide = useCallback(
    (newIndex, newDirection) => {
      if (isLocked || newIndex === activeIndex) return;
      setIsLocked(true);
      setDirection(newDirection);
      setActiveIndex(newIndex);
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    },
    [isLocked, activeIndex]
  );

  const handleNext = useCallback(() => {
    changeSlide((activeIndex + 1) % total, "next");
  }, [activeIndex, total, changeSlide]);

  const handlePrev = useCallback(() => {
    changeSlide((activeIndex - 1 + total) % total, "prev");
  }, [activeIndex, total, changeSlide]);

  // Auto-scrolling interval (advances every 5 seconds, pauses when user hovers or interacts)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Background Ambient Curved Light Halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        {/* Multi-tonal elliptical orbital aura with smooth color blending */}
        <div
          className="relative w-[650px] sm:w-[850px] lg:w-[1100px] h-[380px] sm:h-[480px] lg:h-[580px] opacity-35 transition-all duration-1000 transform-gpu"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 55% 45%, ${current.accent}30 0%, rgba(182, 109, 210, 0.18) 35%, rgba(245, 158, 11, 0.12) 60%, transparent 75%)`,
            filter: "blur(75px)",
          }}
        />
        {/* Subtle curved light ray arc */}
        <div
          className="absolute w-[450px] sm:w-[700px] lg:w-[920px] h-[240px] sm:h-[340px] rounded-[100%] border border-white/5 opacity-30 rotate-[-6deg] pointer-events-none transition-all duration-1000"
          style={{
            boxShadow: `0 0 100px 10px ${current.accent}20, inset 0 0 80px ${current.accent}15`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <CommonHeading title="Testimonials">
            Voices Of Trust
          </CommonHeading>
        </div>

        {/* Desktop Layout (md and up): Left Vertical Logo Reel, Center Quote, Right Vertical Arrows */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] items-center gap-10 lg:gap-14 xl:gap-20">
          {/* Left Column: Interactive Vertical Logo Carousel Reel */}
          <div className="flex flex-col items-center justify-center gap-5 lg:gap-6 select-none flex-shrink-0">
            {/* Top Logo (Previous) */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePrev}
              aria-label={`View testimonial from ${prevItem.company}`}
              className="group relative w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 p-4 flex items-center justify-center backdrop-blur-md opacity-40 hover:opacity-90 transition-opacity duration-300 hover:border-white/40 cursor-pointer shadow-lg overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={prevItem.id}
                  variants={thumbVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={prevItem.logo}
                    alt={prevItem.company}
                    fill
                    className="object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Middle Logo (ACTIVE - Clean White Circle with Smooth Internal Reel Animation) */}
            <div
              className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full p-6 lg:p-7 flex items-center justify-center shadow-[0_0_60px_rgba(2,213,232,0.25),0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-700 scale-100 z-10 overflow-hidden"
              style={{
                boxShadow: `0 0 50px -5px ${current.accent}40, 0 25px 45px -10px rgba(0, 0, 0, 0.9)`,
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={activeLogoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={current.logo}
                    alt={current.company}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Logo (Next) */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleNext}
              aria-label={`View testimonial from ${nextItem.company}`}
              className="group relative w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 p-4 flex items-center justify-center backdrop-blur-md opacity-40 hover:opacity-90 transition-opacity duration-300 hover:border-white/40 cursor-pointer shadow-lg overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={nextItem.id}
                  variants={thumbVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={nextItem.logo}
                    alt={nextItem.company}
                    fill
                    className="object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Center Column: Big Editorial Quote & Attribution with AnimatePresence */}
          <div className="relative min-h-[300px] lg:min-h-[340px] flex flex-col justify-center px-4 lg:px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="will-change-transform"
              >
                {/* Editorial Quote */}
                <blockquote className="font-newsreader text-2xl md:text-3xl lg:text-[40px] xl:text-[44px] leading-[1.28] tracking-normal text-white/95 font-normal">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author Attribution */}
                <div className="mt-8 lg:mt-10 flex flex-col">
                  <h4 className="font-sora font-semibold text-white text-base lg:text-lg tracking-wide">
                    {current.author},{" "}
                    <span className="text-white/70 font-normal">
                      {current.role}
                    </span>
                  </h4>
                  <p className="font-inter text-sm lg:text-base text-white/50 mt-1 tracking-normal">
                    {current.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Vertical Navigation Arrows & Counter */}
          <div className="flex flex-col items-center justify-center gap-3 flex-shrink-0 select-none">
            {/* Up Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 lg:w-13 lg:h-13 rounded-full border border-white/20 hover:border-[#02D5E8] bg-white/[0.04] hover:bg-[#02D5E8]/15 text-white/70 hover:text-[#02D5E8] flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-[0_0_25px_rgba(2,213,232,0.35)] cursor-pointer"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </motion.button>

            {/* Down Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 lg:w-13 lg:h-13 rounded-full border border-white/20 hover:border-[#02D5E8] bg-white/[0.04] hover:bg-[#02D5E8]/15 text-white/70 hover:text-[#02D5E8] flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-[0_0_25px_rgba(2,213,232,0.35)] cursor-pointer"
            >
              <ArrowDownIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Layout (Screens below md): Top Horizontal Logo Reel, Center Quote, Bottom Arrows */}
        <div className="flex flex-col items-center text-center md:hidden gap-8">
          {/* Top: Horizontal Logo Reel */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 select-none w-full">
            {/* Left Logo (Previous) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              aria-label={`View testimonial from ${prevItem.company}`}
              className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 p-3 flex items-center justify-center backdrop-blur-md opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={prevItem.id}
                  variants={thumbVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={prevItem.logo}
                    alt={prevItem.company}
                    fill
                    className="object-contain filter grayscale opacity-75"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Center Logo (ACTIVE - Without white background or white border) */}
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-5 flex items-center justify-center shadow-[0_0_40px_rgba(2,213,232,0.3)] z-10 overflow-hidden"
              style={{
                boxShadow: `0 0 35px -5px ${current.accent}50, 0 15px 30px -10px rgba(0, 0, 0, 0.9)`,
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={mobileActiveLogoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={current.logo}
                    alt={current.company}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Logo (Next) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              aria-label={`View testimonial from ${nextItem.company}`}
              className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 p-3 flex items-center justify-center backdrop-blur-md opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={nextItem.id}
                  variants={thumbVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={nextItem.logo}
                    alt={nextItem.company}
                    fill
                    className="object-contain filter grayscale opacity-75"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Center: Quote & Attribution (Sliding left/right on mobile) */}
          <div className="min-h-[220px] flex flex-col justify-center px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={mobileQuoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="will-change-transform"
              >
                <blockquote className="font-newsreader text-xl sm:text-2xl leading-relaxed text-white font-normal">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex flex-col items-center">
                  <h4 className="font-sora font-semibold text-white text-sm sm:text-base">
                    {current.author},{" "}
                    <span className="text-white/70 font-normal">
                      {current.role}
                    </span>
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-white/50 mt-0.5">
                    {current.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Horizontal Navigation Arrows & Counter */}
          <div className="flex items-center gap-4 select-none">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#02D5E8] bg-white/[0.04] hover:bg-[#02D5E8]/15 text-white/80 hover:text-[#02D5E8] flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#02D5E8] bg-white/[0.04] hover:bg-[#02D5E8]/15 text-white/80 hover:text-[#02D5E8] flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
