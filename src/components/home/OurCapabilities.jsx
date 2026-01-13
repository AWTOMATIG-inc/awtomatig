import Accordion from "@/components/Accordion";
import { capabilities } from "@/contants/capabilities";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
export default function OurCapabilities() {
  return (
    <section className="container mt-32">
      <FadeInSection
        initial={{ opacity: 0, y: -150 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: -150 }}
        margin="40px 0px -40px 0px"
        className="wrapper"
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-montserrat uppercase">[ What we operate ]</h5>
            <h1 className="font-russo-one text-2xl sm:text-3xl md:text-4xl lg:text-6xl  text-teal mt-6">
              Our operational capabilities
            </h1>
          </div>

          <AnimatedButton name="Work" icon={true} width="w-[140px]" />
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
    </section>
  );
}
