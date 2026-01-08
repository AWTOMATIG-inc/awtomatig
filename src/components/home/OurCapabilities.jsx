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
          <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-teal">
            Our capabilities
          </h1>

          <AnimatedButton name="Work" icon={true} width="w-[140px]" />
        </div>

        <div className="my-8">
          {capabilities.map((capability) => (
            <Accordion
              key={capability.id}
              title={capability.title}
              serial={"0" + capability.id}
            >
              <p>{capability.description}</p>
            </Accordion>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
