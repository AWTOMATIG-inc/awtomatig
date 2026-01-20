"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const homeWhyUsData = [
  {
    id: 1,
    title: "Back-Office Management",
    subtitle: "When execution becomes invisible",
    desc: "At some point, founders stop building and start chasing. Chasing follow-ups. Chasing updates. Chasing tasks that should already be done. This is where structure replaces noise. Reclaim your time and focus on what matters.",
    bestFor: "Founders who want execution handled reliably",
    image: "/images/services/office-management.gif",
  },
  {
    id: 2,
    title: "Automation & AI Workflows",
    subtitle: "When manual work becomes the bottleneck",
    desc: "Repetition is the silent tax on growing teams. The same steps. The same data. The same decisions — made again and again. Instead of adding more people, we redesign the flow.",
    bestFor: "Teams scaling fast or drowning in repetitive work",
    image: "/images/services/automation.gif",
  },
  {
    id: 3,
    title: "Web & Platform Development",
    subtitle: "When your technology needs to grow up",
    desc: "Early tools are built to launch fast — not to scale cleanly. Over time, performance slows and changes get risky. We rebuild the foundation underneath the product.",
    bestFor: "Companies that need more than templates",
    image: "/images/services/web.gif",
  },
  {
    id: 4,
    title: "ERPNext Implementation",
    subtitle: "When your business needs one source of truth",
    desc: "As companies grow, tools multiply. Accounting in one place. Inventory in another. HR in spreadsheets. We implement ERPNext to bring everything together.",
    bestFor: "Businesses that value precision and uptime",
    image: "/images/services/system-support.gif",
  },
];

export default function CardScroll() {
  const panelsRef = useRef([]);
  const containerRef = useRef();
  useEffect(() => {
    panelsRef.current.forEach((panel, index) => {
      // Fade + scale effectg
      gsap.fromTo(
        panel,
        { scale: 1, opacity: 1 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: panel,
            start: "center center",
            end: "center center",
            scrub: true,
          },
        },
      );
      // Pin each card step-by-step
      ScrollTrigger.create({
        trigger: panel,
        start: "center center",
        end: index===3?"0%":"+=100%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,      
       
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="container relative z-10 py-20">
      {/* HEADER */}
      <div className="wrapper mb-20 text-center sm:text-left">
        <h5 className="font-montserrat uppercase">[ Capabilities ]</h5>
        <h1 className="font-russo-one text-3xl lg:text-5xl mt-6">
          Unique, ownable intelligence
        </h1>
      </div>

      {/* CARDS */}
      <div ref={containerRef} className="relative space-y-[10vh] wrapper overflow-hidden">
        {homeWhyUsData.map((data, index) => (
          <div
            key={data.id}
            ref={(el) => (panelsRef.current[index] = el)}
            className="px-6 sm:px-12 lg:px-14 py-10
            rounded-[30px] md:rounded-[70px]
            bg-[#A3FAFE] h-[70vh] overflow-hidden"
          >
            {/* TOP */}
            <div className="flex justify-between mb-8">
              <div className="max-w-[750px] text-black">
                <h4 className="text-xl md:text-3xl lg:text-5xl font-russo-one">
                  {data.title}
                </h4>
                <h5 className="mt-4 text-base sm:text-lg md:text-xl font-inter">
                  {data.subtitle}
                </h5>
              </div>
              <p className="text-2xl lg:text-5xl font-sora font-bold text-[#02D5E8]">
                /0{data.id}
              </p>
            </div>

            {/* CONTENT */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-[#64F4FC] p-6 sm:p-8 lg:p-10 rounded-3xl text-black font-inter">
                <p className="text-base sm:text-lg text-justify">{data.desc}</p>
                <p className="mt-8 text-base sm:text-lg">
                  <strong>Best for:</strong> {data.bestFor}
                </p>
              </div>

              <div className="hidden lg:block">
                <Image
                  src={data.image}
                  width={400}
                  height={400}
                  alt="service"
                  className="rounded-lg object-cover mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
