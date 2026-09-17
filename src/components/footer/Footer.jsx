"use client";

import awtomatig_logo from "@/assets/logo/awtomatig-full-logo.png";
import sinceText from "@/assets/logo/since-text.png";
import AnimatedButton from "@/components/AnimatedButton";
import FadeInSection from "@/components/animation/FadeEffect";
import { pushEvent } from "@/lib/gtm";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const companyLinks = [
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "About Us", href: "/about-us" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/ui-ux-intern" },
];

const capabilityLinks = [
  { name: "AI & Workflow Automation", href: "/services" },
  { name: "High-Performance Websites", href: "/services" },
  { name: "Web & Platform Development", href: "/services" },
  { name: "ERPNext Implementation", href: "/services" },
  { name: "Back-Office Operations", href: "/services" },
  { name: "UI/UX & Product Design", href: "/services" },
];

const ecosystemLinks = [
  { name: "Awlabs Studio", href: "https://awlabs.online/", isExternal: true },
  {
    name: "Book a 30-min Call",
    href: "https://calendly.com/nahidr-awtomatig/30min?month=2025-04",
    isExternal: true,
  },
  { name: "Client Inquiries", href: "/contact#get-in-touch" },
  { name: "Support & Maintenance", href: "/contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/awtomatig/",
    icon: "mdi:linkedin",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/awtomatig86939",
    icon: "prime:twitter",
  },
  {
    name: "Medium",
    href: "https://medium.com/@awtomatig",
    icon: "mingcute:medium-fill",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/awtomatig/",
    icon: "lets-icons:insta",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@awtomatig.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    pushEvent({ event: "copy_email", email: "hello@awtomatig.com" });
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden pt-16 md:pt-24 pb-10">
      {/* Ambient Gradient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-[#02d5e8]/10 via-[#b66dd2]/5 to-transparent blur-[140px] pointer-events-none -z-1" />
      <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-[#02d5e8]/5 blur-[160px] pointer-events-none -z-1" />
      <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-[#b66dd2]/5 blur-[160px] pointer-events-none -z-1" />


      <div className="container relative z-10">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          {/* 1. Pre-Footer Call to Action Banner (Centered Aesthetic Layout) */}
          <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent border border-white/10 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 mb-16 md:mb-20 shadow-[0_24px_70px_rgba(0,0,0,0.7)] text-center overflow-hidden">
            {/* Ambient Internal Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-xl h-36 bg-gradient-to-r from-[#02d5e8]/15 via-[#b66dd2]/10 to-transparent blur-[90px] pointer-events-none -z-1" />

            <div className="max-w-3xl mx-auto flex flex-col items-center">
              {/* Main Centered Heading */}
              <h2 className="font-russo-one text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-white to-[#02d5e8] text-transparent bg-clip-text leading-[1.15]">
                Systems that work. <br />
                Results that last.
              </h2>

              {/* Description */}
              <p className="font-inter text-neutral-400 text-sm sm:text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
                Your extended tech and operations team without the overhead. We streamline workflows, connect systems, and build platforms that move revenue.
              </p>

              {/* Centered Cohesive Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
                <Link
                  href="/contact#get-in-touch"
                  onClick={() =>
                    pushEvent({ event: "cta_click", cta_label: "Footer Get a Quote" })
                  }
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 h-[52px] min-w-[210px] w-full sm:w-auto rounded-full bg-gradient-to-r from-[#02d5e8] via-[#44b6e9] to-[#b66dd2] text-[#050508] font-inter font-bold text-sm sm:text-[15px] tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(2,213,232,0.5)] hover:scale-[1.02] active:scale-95"
                >
                  <span>Get a quote</span>
                  <Icon
                    icon="meteor-icons:arrow-up-right"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <a
                  href="https://calendly.com/nahidr-awtomatig/30min?month=2025-04"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    pushEvent({ event: "cta_click", cta_label: "Footer Book Call" });
                    pushEvent({ event: "book_call_click", destination: "calendly" });
                  }}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 h-[52px] min-w-[210px] w-full sm:w-auto rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#02d5e8]/50 text-white font-inter font-semibold text-sm sm:text-[15px] tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(2,213,232,0.2)] hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                >
                  <span>Book Consultation</span>
                  <Icon
                    icon="meteor-icons:arrow-up-right"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[#02d5e8] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Main Footer Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
            {/* Column 1: Brand & Bio & Socials (5 Cols on LG) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-block group">
                  <Image
                    src={awtomatig_logo}
                    width={220}
                    height={74}
                    className="w-[190px] sm:w-[210px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    alt="Awtomatig Logo"
                  />
                </Link>

                <p className="font-inter text-neutral-400 text-sm mt-5 max-w-sm leading-relaxed">
                  Founder-led automation & web engineering studio. We eliminate manual bottlenecks and scale operational performance.
                </p>

                {/* Email Copy Chip */}
                <div className="mt-5">
                  <button
                    onClick={copyEmail}
                    type="button"
                    className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all duration-300 text-xs font-inter text-neutral-300 hover:text-white"
                  >
                    <Icon
                      icon={copied ? "lucide:check" : "solar:letter-linear"}
                      className={`w-4 h-4 transition-colors duration-300 ${
                        copied ? "text-[#02d5e8]" : "text-neutral-400 group-hover:text-[#02d5e8]"
                      }`}
                    />
                    <span className="font-mono text-neutral-200">hello@awtomatig.com</span>
                    <span className="text-[11px] text-neutral-400 font-mono pl-1 border-l border-white/10">
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Social Capsule Buttons & Established Badge */}
              <div className="mt-8">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-inter font-semibold block mb-3">
                  Connect With Us
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#02d5e8]/15 border border-white/10 hover:border-[#02d5e8]/40 text-neutral-300 hover:text-[#02d5e8] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    >
                      <Icon icon={social.icon} width="18" height="18" />
                    </a>
                  ))}
                </div>

                <div className="mt-6">
                  <Image
                    src={sinceText}
                    width={240}
                    height={38}
                    className="w-[180px] sm:w-[210px] opacity-75 hover:opacity-100 transition-opacity duration-300"
                    alt="Since 2022"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Company Navigation (2.5 Cols on LG) */}
            <div className="lg:col-span-2 md:pl-4">
              <h3 className="text-xs uppercase tracking-widest font-inter font-bold text-white mb-5 flex items-center gap-2">
                Company
              </h3>
              <ul className="flex flex-col gap-3 font-inter text-sm">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Capabilities (3.5 Cols on LG) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-widest font-inter font-bold text-white mb-5 flex items-center gap-2">
                Capabilities
              </h3>
              <ul className="flex flex-col gap-3 font-inter text-sm">
                {capabilityLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Ecosystem & Delivery (3 Cols on LG) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-widest font-inter font-bold text-white mb-5 flex items-center gap-2">
                Ecosystem
              </h3>
              <ul className="flex flex-col gap-3 font-inter text-sm">
                {ecosystemLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {link.name}
                      </span>
                      {link.isExternal && (
                        <Icon
                          icon="solar:arrow-right-up-linear"
                          className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#02d5e8] transition-colors duration-200"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Watermark Brand Signature */}
          <div className="w-full select-none pointer-events-none text-center overflow-hidden py-4 -mb-4">
            <span className="font-russo-one tracking-[0.08em] text-[13vw] sm:text-[14vw] lg:text-[13vw] leading-none bg-gradient-to-b from-white/[0.08] to-transparent text-transparent bg-clip-text inline-block transform translate-y-4">
              AWTOMATIG
            </span>
          </div>

          {/* 4. Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-xs text-neutral-400">
            <p>
              © {new Date().getFullYear()} AWTOMATIG. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/services" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/services" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </footer>
  );
}
