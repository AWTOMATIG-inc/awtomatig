import Accordion from "@/components/Accordion";
import { capabilities } from "@/contants/capabilities";
import { Icon } from "@iconify/react";
import FadeInSection from "../animation/FadeEffect";
export default function OurCapabilities() {
  return (
    <section className="container mt-20">
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
          <button className="flex gap-x-1 border px-6 py-1 rounded-lg hover:border-teal hover:text-teal hoverEffect">
            <span>Work</span>
            <Icon icon="humbleicons:arrow-right-up" width="24" height="24" />
          </button>
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
