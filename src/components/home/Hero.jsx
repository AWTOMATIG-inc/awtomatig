"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { pushEvent } from "@/lib/gtm";

const capabilities = [
  {
    icon: "solar:shield-check-linear",
    title: "Zero Follow-Ups",
    desc: "Invisible execution & SLA guarantees",
  },
  {
    icon: "solar:cpu-bolt-linear",
    title: "Autonomous AI",
    desc: "n8n, Make & agentic workflows",
  },
  {
    icon: "solar:layers-minimalistic-linear",
    title: "Web & ERPNext",
    desc: "High-speed platforms & unified data",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full pt-28 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Top Status / Announcement Pill */}
          <div className="mb-5 sm:mb-7">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl transition-all duration-300 hover:border-[#02d5e8]/40 hover:bg-white/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white">
                Extended Operations Team
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-sora font-extrabold tracking-[-0.035em] text-white leading-[1.08] max-w-5xl">
            We Power Your{" "}
            <span className="bg-gradient-to-r from-white via-[#7eedf8] to-[#02d5e8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(2,213,232,0.25)]">
              Growth.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <div className="mt-5 sm:mt-7 max-w-3xl">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-medium text-neutral-200 tracking-tight leading-snug">
              Your extended tech and operations team{" "}
              <span className="text-white font-semibold">without the overhead.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-inter leading-relaxed max-w-2xl mx-auto">
              We engineer custom web platforms, automate workflows with AI, deploy ERPNext, and manage back-office execution so your team can move at maximum velocity.
            </p>
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

          {/* Value Metric / Capability Proof Strip */}
          <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/[0.08] w-full max-w-md sm:max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center sm:flex-col sm:items-center gap-3.5 sm:gap-2.5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[#02d5e8]/30 transition-all duration-300 shadow-sm"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#02d5e8]/10 border border-[#02d5e8]/20 flex items-center justify-center text-[#02d5e8] shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Icon icon={item.icon} className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left sm:text-center">
                    <div className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
