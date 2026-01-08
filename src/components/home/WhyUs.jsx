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
    subtitle: "Run your business without operational friction",
    features: [
      "Admin & virtual assistance",
      "CRM setup, cleanup & daily management",
      "Order, listing & workflow management",
      "Reporting, documentation & SOPs",
    ],
    bestFor: "Founders who want execution handled reliably",
    image: "/images/services/office-management.gif",
  },
  {
    id: 2,
    title: "Automation & AI Workflows",
    subtitle: "Replace manual work with smart systems",
    features: [
      "Workflow automation (n8n, Zapier, Make)",
      "CRM → email → dashboard integrations",
      "AI agents & process automation",
      "Custom internal tools & logic",
    ],
    bestFor: "Teams scaling fast or drowning in repetitive work",
    image: "/images/services/automation.gif",
  },
  {
    id: 3,
    title: "Web & Platform Development",
    subtitle: "Modern, scalable digital foundations",
    features: [
      "Business websites & landing pages",
      "Custom platforms (Node.js, Next.js)",
      "Shopify & e-commerce builds",
      "Performance, security & deployment",
    ],
    bestFor: "Companies that need more than templates",
    image: "/images/services/web.gif",
  },
  {
    id: 4,
    title: "Data, QA & System Support",
    subtitle: "Accuracy, reliability, and continuity",
    features: [
      "Data processing & annotation",
      "QA testing & audits",
      "System monitoring & maintenance",
      "Ongoing tech and ops support",
    ],
    bestFor: "Businesses that value precision and uptime",
    image: "/images/services/system-support.gif",
  },
  {
    id: 5,
    title: "Growth & Digital Enablement",
    subtitle: "Build systems that support growth",
    features: [
      "Email systems & deliverability (SendGrid, Mailchimp)",
      "CRM-driven outreach & lead pipelines",
      "Analytics & operational dashboards",
      "Tool stack consulting & optimisation",
    ],
    bestFor: "Teams preparing for their next growth stage.",
    image: "/images/services/growth.gif",
  },
];
export default function WhyUs() {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current;

    // Set up horizontal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=400%", // scroll distance (2x viewport)
        scrub: true, // smooth link to scroll
        pin: true, // locks section while animating
        anticipatePin: 1,
        markers: false, // turn true for debugging
      },
    });

    // Slide both panels horizontally
    tl.to(panels, {
      xPercent: -135 * (panels.length - 1),
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="container  mt-32 relative z-99">
      <div className="wrapper md:mt-20 mb-14 text-center sm:text-left">
        <h5>[ Why Us ]</h5>
        <h1 className="font-press-start text-xl lg:text-3xl mt-8">
          Unique, ownable <br />
          intelligence
        </h1>
      </div>
      <div
        ref={sectionRef}
        className="relative w-full h-full  overflow-hidden "
      >
        <div
          style={{ width: 100 * homeWhyUsData.length + "%" }}
          className="flex gap-x-8 sm:gap-x-10"
        >
          {/* Panel 1 */}
          {homeWhyUsData.map((data, index) => (
            <div
              key={data.id}
              ref={(el) => (panelsRef.current[index] = el)}
              className={`wrapper px-6  sm:px-12 lg:px-14 py-9 sm:py-13 lg:py-14 rounded-[30px] md:rounded-[70px] bg-[#A3FAFE] 2xl:min-w-[1331px] `}
            >
              <div className="flex justify-between gap-x-2 mb-6  ">
                <div className="max-w-[761px] w-full text-black">
                  <h4 className="text-xl md:text-3xl lg:text-5xl font-russo-one">
                    {data.title}
                  </h4>
                  <h5 className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium font-inter">
                    {data.subtitle}
                  </h5>
                </div>
                <p className="text-right text-2xl lg:text-5xl font-sora font-bold text-[#02D5E8] text-shadow-[0px_5px_4.6px_0px_#00000047]">
                  {`/0${data.id}`}
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 ">
                <div className="bg-[#64F4FC] text-black p-6 sm:p-8 lg:p-10 rounded-3xl md:rounded-4xl font-inter flex flex-col ">
                  <ul className="space-y-2 lg:space-y-4 text-base sm:text-lg">
                    {data.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <p className="justify-self-end   text-base sm:text-lg mt-10">
                    <strong>Best for:</strong> {data.bestFor}
                  </p>
                </div>
                <div>
                  <Image
                    src={data.image}
                    width={471}
                    height={328}
                    alt="slider_item"
                    className={` rounded-lg object-cover mx-auto w-full h-[150px] sm:h-[200px] md:h-[250px] lg:w-[300px] lg:h-[300px] `}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
