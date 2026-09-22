"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { pushEvent } from "@/lib/gtm";
import Lightfall from "@/components/Lightfall";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen min-h-dvh flex flex-col justify-center items-center overflow-hidden bg-black pt-32 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Full Hero Lightfall Canvas Background */}
      <div className="pointer-events-none absolute inset-0 z-0 w-full h-full overflow-hidden">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#000000"
          speed={0.4}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={false}
          mouseStrength={0.5}
          mouseRadius={1}
          color1="#06B6D4"
          color2="#ffffff"
          color3="#06B6D4"
        />
        {/* Seamless bottom fade to pitch black */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-sora font-extrabold tracking-[-0.035em] text-white leading-[1.08] max-w-5xl">
            We Power Your{" "}
            <span className="bg-gradient-to-r from-white via-[#7eedf8] to-[#02d5e8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(2,213,232,0.25)]">
              Growth.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <div className="mt-5 sm:mt-7 max-w-3xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-200 tracking-tight leading-snug">
              Your extended tech and operations team{" "}
              <span className="text-white font-semibold">without the overhead.</span>
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            {/* Primary Action: Book a Discovery Call */}
            <a
              href="https://calendly.com/nahidr-awtomatig/30min?month=2025-04"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                pushEvent({ event: "cta_click", cta_label: "Book a call" });
                pushEvent({ event: "book_call_click", destination: "calendly" });
              }}
              className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#02d5e8] hover:bg-[#3bf0ff] text-[#05090e] font-inter font-semibold text-sm sm:text-base tracking-tight transition-all duration-300 shadow-[0_0_25px_rgba(2,213,232,0.35)] hover:shadow-[0_0_35px_rgba(2,213,232,0.6)] active:scale-95"
            >
              <span>Book a Discovery Call</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 group-hover:bg-black/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Icon icon="meteor-icons:arrow-up-right" className="w-3.5 h-3.5 text-[#05090e]" />
              </div>
            </a>

            {/* Secondary Action: Explore Services */}
            <Link
              href="/services"
              onClick={() =>
                pushEvent({ event: "cta_click", cta_label: "Know more" })
              }
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.14] hover:border-[#02d5e8]/40 text-white font-inter font-medium text-sm sm:text-base tracking-tight transition-all duration-300 backdrop-blur-xl active:scale-95 shadow-[0_2px_14px_rgba(0,0,0,0.3)]"
            >
              <span>Explore Capabilities</span>
              <Icon
                icon="solar:arrow-right-linear"
                className="w-4 h-4 text-neutral-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
