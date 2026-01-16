import Accordion from "@/components/Accordion";
import { capabilities } from "@/contants/capabilities";
import Link from "next/link";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
export default function OurCapabilities() {
  return (
    <div className="container">
      <FadeInSection
        initial={{ opacity: 0, y: -150 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: -150 }}
        margin="40px 0px -40px 0px"
        className="wrapper"
      >
        <div className="flex justify-between items-center">
          <CommonHeading title="What we operate" color="text-teal">
            Our operational capabilities
          </CommonHeading>
          <Link href="/services">
            <AnimatedButton name="Work" icon={true} width="w-[140px]" />
          </Link>
        </div>

        <div className="my-10">
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
      </FadeInSection>
    </div>
  );
}
