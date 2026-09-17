"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
import BrandButton from "../BrandButton";
import { pushEvent } from "@/lib/gtm";

const row1 = [
  { name: "Airtable", logo: "/images/tech/airtable.png" },
  { name: "HubSpot", logo: "/images/tech/HubSpot.png" },
  { name: "Make", logo: "/images/tech/make-seeklogo.png" },
  { name: "Monday.com", logo: "/images/tech/MondayCom.png" },
  { name: "n8n", logo: "/images/tech/n8n.png" },
];

const row2 = [
  { name: "Notion", logo: "/images/tech/notion.png" },
  { name: "Next.js", logo: "/images/tech/next-js.png" },
  { name: "Tailwind CSS", logo: "/images/tech/tailwind-css.png" },
  { name: "Zapier", logo: "/images/tech/zapier.png" },
  { name: "SendGrid", logo: "/images/tech/sendgrid.png" },
];

const row3 = [
  { name: "Salesforce", logo: "/images/tech/Salesforce.png" },
  { name: "Node.js", logo: "/images/tech/node-js.png" },
  { name: "Mailchimp", logo: "/images/tech/Mailchimp.png" },
  { name: "Trello", logo: "/images/tech/trello.png" },
  { name: "Twilio", logo: "/images/tech/twilio.png" },
];

function IntegrationNode({ item, isHovered, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-300 cursor-pointer select-none shrink-0 ${
        isHovered
          ? "bg-[#1A1C24] border-[#02D5E8] shadow-[0_0_24px_rgba(2,213,232,0.35)] -translate-y-0.5 scale-[1.02]"
          : "bg-[#111217]/90 hover:bg-[#181920] border-white/10 hover:border-[#02D5E8]/60 shadow-lg"
      }`}
    >
      {/* Icon frame */}
      <div className="size-6 sm:size-7 rounded-lg bg-white flex items-center justify-center p-1 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
        <Image
          src={item.logo}
          alt={item.name}
          width={22}
          height={22}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Label */}
      <span className="font-sora text-xs sm:text-[13px] font-semibold text-white tracking-tight group-hover:text-[#02D5E8] transition-colors whitespace-nowrap">
        {item.name}
      </span>

      {/* Connector status badge */}
      <div className="size-5 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#02D5E8] group-hover:border-[#02D5E8]/40 transition-all ml-0.5 shrink-0">
        <Icon icon="solar:link-minimalistic-2-bold" width="10" height="10" />
      </div>

      {/* Glow highlight */}
      <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#02D5E8]/0 group-hover:via-[#02D5E8]/70 to-transparent transition-all duration-300" />
    </div>
  );
}

export default function KeepFlyingMarquee() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="container">
      <div className="wrapper w-full">
        <FadeInSection
          initial={{ opacity: 0, y: 35 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 35 }}
          margin="150px 0px -50px 0px"
        >
          {/* Main Showcase Container */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#0c0d12]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            {/* Embedded CSS for electric pulse animation & zero scrollbar */}
            <style>{`
              @keyframes circuitEnergyPulse {
                0% {
                  stroke-dashoffset: 280;
                }
                100% {
                  stroke-dashoffset: 0;
                }
              }
              .pipeline-pulse-line {
                stroke-dasharray: 30 140;
                animation: circuitEnergyPulse 2.8s linear infinite;
              }
              .no-scrollbar::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
              }
              .no-scrollbar {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
              }
            `}</style>

            {/* Ambient Brand Glow Orbs */}
            <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-[#02D5E8]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
            <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] bg-[#B66DD2]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

            {/* Subtle Grid Dot Pattern Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* ========================================================= */}
            {/* HEADER AREA                                               */}
            {/* ========================================================= */}
            <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 sm:mb-14">
              <CommonHeading
                title="Ecosystem"
                description="Awtomatig seamlessly connects and orchestrates your mission-critical tools, databases, and APIs behind the scenes."
              >
                Seamless Systems Integration
              </CommonHeading>
            </div>

            {/* ========================================================= */}
            {/* INTERCONNECTED PIPELINE CANVAS                            */}
            {/* ========================================================= */}
            <div className="relative w-full overflow-x-auto no-scrollbar py-2">
              <div className="min-w-max lg:min-w-0 w-full max-w-[1040px] mx-auto flex flex-col gap-5 sm:gap-6 relative px-1">
                {/* Scalable Responsive SVG Circuit Pipeline Overlay */}
                <svg
                  viewBox="0 0 1000 160"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none -z-0"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="brandCircuitGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#02D5E8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#44B6E9" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B66DD2" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guide Rails */}
                  <line
                    x1="20"
                    y1="22"
                    x2="980"
                    y2="22"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="40"
                    y1="80"
                    x2="960"
                    y2="80"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="20"
                    y1="138"
                    x2="980"
                    y2="138"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.2"
                  />

                  {/* Vertical Connecting Branches */}
                  <path
                    d="M 270 22 V 80"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 680 22 V 80"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 440 80 V 138"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 830 80 V 138"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1.2"
                  />

                  {/* Animated Electric Pulses */}
                  <path
                    d="M 270 22 V 80 H 440 V 138"
                    stroke="url(#brandCircuitGrad)"
                    strokeWidth="1.8"
                    className="pipeline-pulse-line opacity-85"
                  />
                  <path
                    d="M 680 22 V 80 H 830 V 138"
                    stroke="url(#brandCircuitGrad)"
                    strokeWidth="1.8"
                    className="pipeline-pulse-line opacity-85"
                  />
                </svg>

                {/* ROW 1 */}
                <div className="flex items-center justify-between gap-3 sm:gap-4 relative z-10">
                  {row1.map((item, idx) => (
                    <IntegrationNode
                      key={idx}
                      item={item}
                      isHovered={activeItem === item.name}
                      onHover={() => setActiveItem(item.name)}
                      onLeave={() => setActiveItem(null)}
                    />
                  ))}
                </div>

                {/* ROW 2 (Staggered Offset) */}
                <div className="flex items-center justify-between gap-3 sm:gap-4 pl-6 sm:pl-10 pr-2 sm:pr-4 relative z-10">
                  {row2.map((item, idx) => (
                    <IntegrationNode
                      key={idx}
                      item={item}
                      isHovered={activeItem === item.name}
                      onHover={() => setActiveItem(item.name)}
                      onLeave={() => setActiveItem(null)}
                    />
                  ))}
                </div>

                {/* ROW 3 (Staggered Balance) */}
                <div className="flex items-center justify-between gap-3 sm:gap-4 pl-2 sm:pl-4 pr-6 sm:pr-10 relative z-10">
                  {row3.map((item, idx) => (
                    <IntegrationNode
                      key={idx}
                      item={item}
                      isHovered={activeItem === item.name}
                      onHover={() => setActiveItem(item.name)}
                      onLeave={() => setActiveItem(null)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Bottom CTA Button */}
            <div className="flex justify-center mt-10 sm:mt-12 relative z-10">
              <BrandButton
                href="/services"
                onClick={() =>
                  pushEvent({
                    event: "cta_click",
                    cta_label: "Explore Integrations",
                  })
                }
              >
                Explore All Integrations
              </BrandButton>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
