"use client";
import Accordion from "@/components/Accordion";
import { capabilities } from "@/contants/capabilities";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
import BrandButton from "../BrandButton";
import { pushEvent } from "@/lib/gtm";

export default function OurCapabilities() {
  return (
    <div className="container">
      <FadeInSection
        initial={{ opacity: 0, y: 30 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: 30 }}
        margin="40px 0px 0px 0px"
        className="wrapper max-w-5xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-14">
          <CommonHeading title="Capabilities">
            Our Operational Capabilities
          </CommonHeading>
        </div>

        <div className="my-8 sm:my-10">
          {capabilities.map((capability) => (
            <Accordion
              key={capability.id}
              title={capability.title}
              serial={capability.id < 10 ? "0" + capability.id : capability.id}
            >
              <p className="font-montserrat font-medium mb-1 ">
                {capability.heading}
              </p>
              <p className="font-montserrat text-justify">
                {capability.description}
              </p>
            </Accordion>
          ))}
        </div>

        {/* Middle Bottom CTA Button */}
        <div className="flex justify-center mt-10 sm:mt-14">
          <BrandButton
            href="/services"
            onClick={() =>
              pushEvent({ event: "cta_click", cta_label: "Capabilities View All" })
            }
          >
            Explore All Capabilities
          </BrandButton>
        </div>
      </FadeInSection>
    </div>
  );
}
