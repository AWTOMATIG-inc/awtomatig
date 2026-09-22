"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import CommonHeading from "../CommonHeading";
import FadeInSection from "../animation/FadeEffect";

const partnerLogos = [
  { name: "Zenithics", src: "/images/sponsor/partner-1.png" },
  { name: "The Smith Lake Life", src: "/images/sponsor/partner-2.png" },
  { name: "No Spain No Gain", src: "/images/sponsor/partner-3.png" },
  { name: "Sell My Rig", src: "/images/sponsor/partner-4.png" },
  { name: "W. Media", src: "/images/sponsor/partner-5.png" },
  { name: "Objective Focus", src: "/images/sponsor/partner-6.png" },
  { name: "Expand B2B", src: "/images/sponsor/partner-7.png" },
];

export default function Sponsor() {
  return (
    <section className="relative w-full overflow-hidden py-6">
      {/* Background Ambient Aura */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(2, 213, 232, 0.05) 0%, rgba(182, 109, 210, 0.03) 40%, transparent 75%)",
        }}
      />

      <FadeInSection
        initial={{ opacity: 0, y: 30 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: 30 }}
        margin="100px 0px -50px 0px"
      >
        {/* Section Heading */}
        <div className="container">
          <div className="wrapper flex flex-col items-center justify-center">
            <CommonHeading title="Partners">
              Trusted By Leading Companies
            </CommonHeading>
          </div>
        </div>

        {/* Infinite Logo Slider */}
        <div className="relative w-full mt-12 md:mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
          <Marquee
            speed={42}
            pauseOnHover={true}
            autoFill={true}
            gradient={false}
            className="py-4 overflow-hidden"
          >
            {partnerLogos.map((logo, index) => (
              <div
                key={index}
                className="group relative mx-3 sm:mx-4 h-[76px] sm:h-[88px] min-w-[190px] sm:min-w-[220px] px-7 sm:px-8 rounded-2xl bg-[#121215]/80 hover:bg-[#181920]/90 border border-white/[0.07] hover:border-[#02D5E8]/45 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_10px_28px_-6px_rgba(2,213,232,0.22)] hover:-translate-y-1 select-none"
              >
                {/* Subtle Hover Ambient Top Glow */}
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#02D5E8]/0 group-hover:via-[#02D5E8]/60 to-transparent transition-all duration-500 pointer-events-none" />

                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={180}
                  height={60}
                  className="h-7 sm:h-8 md:h-9 w-auto max-w-[130px] sm:max-w-[150px] object-contain brightness-0 invert opacity-50 group-hover:opacity-100 group-hover:scale-105 group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_8px_rgba(2,213,232,0.5))] transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </FadeInSection>
    </section>
  );
}
