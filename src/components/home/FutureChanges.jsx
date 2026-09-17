"use client";
import dynamic from "next/dynamic";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
import BrandButton from "../BrandButton";
import { pushEvent } from "@/lib/gtm";

const ParticleBackground = dynamic(() => import("../ParticleBackground"), {
  ssr: false,
});

export default function FutureChanges() {
  return (
    <div className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      <ParticleBackground className="absolute h-full w-full" />
      <div className="absolute bg-black/20 backdrop-blur-[1px] h-full w-full"></div>
      <div className="container relative z-10">
        <div className="wrapper max-w-4xl mx-auto text-center">
          <FadeInSection
            initial={{ opacity: 0, y: 30 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 30 }}
            margin="40px 0px -40px 0px"
          >
            <CommonHeading
              title="Case Studies"
              description="See how engineered workflows, automated systems, and high-performance platforms transform operations."
            >
              When Systems Align
            </CommonHeading>

            <div className="flex justify-center mt-8 sm:mt-10">
              <BrandButton
                href="/case-studies"
                onClick={() =>
                  pushEvent({ event: "cta_click", cta_label: "Case Studies" })
                }
              >
                Explore Case Studies
              </BrandButton>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
