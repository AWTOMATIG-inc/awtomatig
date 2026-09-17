"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonHeading from "@/components/CommonHeading";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
// Inline SVGs for clean, zero-dependency rendering
function ArrowUpRightIcon({ className = "w-4 h-4", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-3 h-3", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function TerminalIcon({ className = "w-3 h-3", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

const capabilitiesData = [
  {
    id: "01",
    slug: "back-office",
    titleMain: "Back-Office",
    titleAccent: "Operations",
    exploreLabel: "Explore Back-Office",
    subtitle: "When execution becomes invisible",
    summary: "Invisible execution, zero follow-ups. We run your back-office so you can build.",
    tags: ["Process Engineering", "Executive Support", "SLA Guarantees", "Zero Follow-ups"],
    bestFor: "High-growth founders & leadership teams",
    image: "/images/services/office-management.gif",
    link: "/services",
    accentColor: "#02D5E8",
    cardBg: "from-[#0c141c] via-[#080d14] to-[#05070a]",
    borderGlow: "group-hover:border-[#02D5E8]/40",
    badgeGlow: "bg-[#02D5E8]/10 text-[#02D5E8] border-[#02D5E8]/20",
    glowGradient: "radial-gradient(circle at 50% 0%, rgba(2, 213, 232, 0.16) 0%, transparent 70%)",
  },
  {
    id: "02",
    slug: "workflow-automation",
    titleMain: "Workflow Automation",
    titleAccent: "& AI Systems",
    exploreLabel: "Explore Automation",
    subtitle: "When manual work becomes the bottleneck",
    summary: "Replace manual drag with autonomous agents, event pipelines, and zero-touch workflows.",
    tags: ["Make & n8n Workflows", "Custom AI Agents", "API Orchestration", "Zero Data Entry"],
    bestFor: "Scaling teams drowning in repetitive tasks",
    image: "/images/services/automation.gif",
    link: "/services",
    accentColor: "#44B6E9",
    cardBg: "from-[#0b1626] via-[#080e1a] to-[#050810]",
    borderGlow: "group-hover:border-[#44B6E9]/40",
    badgeGlow: "bg-[#44B6E9]/10 text-[#44B6E9] border-[#44B6E9]/20",
    glowGradient: "radial-gradient(circle at 50% 0%, rgba(68, 182, 233, 0.16) 0%, transparent 70%)",
  },
  {
    id: "03",
    slug: "web-platforms",
    titleMain: "Web & Platform",
    titleAccent: "Engineering",
    exploreLabel: "Explore Web Tech",
    subtitle: "When your technology needs to scale cleanly",
    summary: "High-performance digital platforms and web architectures built to scale cleanly.",
    tags: ["Next.js & React Core", "High-Speed APIs", "Sub-second Latency", "Headless CMS"],
    bestFor: "Companies ready for custom, robust tech",
    image: "/images/services/web.gif",
    link: "/services",
    accentColor: "#B66DD2",
    cardBg: "from-[#160d24] via-[#0c0816] to-[#06040c]",
    borderGlow: "group-hover:border-[#B66DD2]/40",
    badgeGlow: "bg-[#B66DD2]/10 text-[#B66DD2] border-[#B66DD2]/20",
    glowGradient: "radial-gradient(circle at 50% 0%, rgba(182, 109, 210, 0.18) 0%, transparent 70%)",
  },
  {
    id: "04",
    slug: "erpnext-architecture",
    titleMain: "ERPNext Core",
    titleAccent: "Architecture",
    exploreLabel: "Explore ERPNext",
    subtitle: "When your business needs one single source of truth",
    summary: "One synchronized source of truth uniting finance, inventory, CRM, and supply chain.",
    tags: ["Custom Frappe Doctypes", "Real-Time Ledgers", "Multi-Entity Sync", "Legacy Migration"],
    bestFor: "Enterprises seeking centralized control",
    image: "/images/services/system-support.gif",
    link: "/services",
    accentColor: "#02D5E8",
    cardBg: "from-[#09171d] via-[#061014] to-[#04090d]",
    borderGlow: "group-hover:border-[#02D5E8]/40",
    badgeGlow: "bg-[#02D5E8]/10 text-[#02D5E8] border-[#02D5E8]/20",
    glowGradient: "radial-gradient(circle at 50% 0%, rgba(2, 213, 232, 0.16) 0%, transparent 70%)",
  },
];

export default function WhyUs() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean);
    const triggers = [];

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[index + 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          id: `whyus-card-pin-${index}`,
          invalidateOnRefresh: true,
        });
        triggers.push(st);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="relative w-full overflow-visible pt-10 sm:pt-14 md:pt-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="h-[450px] sm:h-[700px] w-[450px] sm:w-[700px] rounded-full bg-[#02D5E8]/5 blur-[80px] sm:blur-[160px]" />
        <div className="h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-[#B66DD2]/5 blur-[90px] sm:blur-[180px]" />
      </div>

      {/* Section Header */}
      <div className="container mx-auto mb-10 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8 text-center">
        <CommonHeading title="Capabilities">
          Engineered For Momentum
        </CommonHeading>
      </div>

      {/* Full-Screen Card Stack (Edge-to-Edge 100% Screen Width, Full Viewport Height) */}
      <div ref={containerRef} className="w-full relative pb-20 sm:pb-32 md:pb-40">
        {capabilitiesData.map((card, index) => {
          return (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{
                zIndex: index + 10,
              }}
              className="relative h-screen h-[100dvh] w-full flex flex-col justify-start overflow-hidden group"
            >
              {/* Individual Stack Card (Full Screen Viewport Box) */}
              <div
                className={`relative w-full h-full bg-gradient-to-b ${card.cardBg} shadow-[0_-25px_60px_rgba(0,0,0,0.95)] px-3 sm:px-8 md:px-14 lg:px-20 py-3 sm:py-5 md:py-6 overflow-hidden flex flex-col justify-start before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent`}
              >
                {/* Subtle Accent Glow Canvas */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 -z-10"
                  style={{ background: card.glowGradient }}
                />

                {/* Top Bar: (01) & Explore Link */}
                <div className="flex items-center justify-between flex-shrink-0 pt-1 pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-mono text-[11px] sm:text-sm md:text-base font-semibold tracking-widest text-white/50 group-hover:text-white transition-colors">
                      ({card.id})
                    </span>
                  </div>

                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-inter font-medium text-white/70 hover:text-white transition-colors group/link"
                  >
                    <span>{card.exploreLabel}</span>
                    <ArrowUpRightIcon
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      style={{ color: card.accentColor }}
                    />
                  </Link>
                </div>

                {/* Centered Title (Tightly grouped below top bar without huge gaps) */}
                <div className="flex-shrink-0 text-center mt-8 sm:mt-6 md:mt-10 mb-2 sm:mb-3 md:mb-4">
                  <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
                    <span className="font-russo-one font-normal uppercase">
                      {card.titleMain}{" "}
                    </span>
                    <span
                      className="font-sora font-light italic tracking-normal"
                      style={{ color: card.accentColor }}
                    >
                      {card.titleAccent}
                    </span>
                  </h3>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs md:text-sm text-white/60 font-inter max-w-xs sm:max-w-xl mx-auto leading-relaxed line-clamp-2">
                    {card.summary}
                  </p>
                </div>

                {/* Centered Platform Mockup Frame (Sits right under title; extra space stays at the bottom) */}
                <div className="w-full max-w-3xl mx-auto flex flex-col rounded-[12px] sm:rounded-[18px] md:rounded-[15px] border border-white/10 bg-[#06080d]/95 shadow-2xl overflow-hidden mt-2 sm:mt-4 flex-1 min-h-0 max-h-[45vh] sm:max-h-[35vh] md:max-h-[45vh]">
                  {/* Browser Header / Status Bar */}
                  <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 border-b border-white/10 bg-black/50 backdrop-blur-md flex-shrink-0">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                    </div>

                    {/* Mock URL / System Route */}
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-xs text-white/50 font-mono">
                      <TerminalIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#02D5E8]" />
                      <span>awtomatig.com/{card.slug}</span>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-white/60">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: card.accentColor }}
                      />
                      <span className="hidden sm:inline">Active</span>
                    </div>
                  </div>

                  {/* Preview GIF Container */}
                  <div className="relative flex-1 min-h-0 w-full bg-gradient-to-b from-[#080b12] to-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                    <div className="relative w-full h-full min-h-[120px]">
                      <Image
                        src={card.image}
                        alt={`${card.titleMain} Preview`}
                        fill
                        unoptimized={true}
                        loading="lazy"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 800px"
                        className="object-contain object-center p-1 sm:p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Subtle Ambient Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


