import { servicesData } from "@/contants/services";
import Marquee from "react-fast-marquee";
import FadeInSection from "../animation/FadeEffect";

export default function Services() {
  return (
    <section className="container mt-20">
      <div>
        <Marquee speed={50} gradient={false} autoFill={true}>
          <h1 className="font-sora text-5xl lg:text-7xl bg-gradient-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center overflow-hidden py-4">
            / Changing the game for Artificial Intelligence
          </h1>
        </Marquee>
      </div>
      <FadeInSection
        initial={{ opacity: 0, x: 100 }}
        scrollTop={{ opacity: 1, x: 0 }}
        scrollBottom={{ opacity: 0, x: 100 }}
        margin="40px 0px -40px 0px"
      >
        <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
          <div>
            <h5>[ Why Us ]</h5>
            <h1 className="font-press-start text-2xl lg:text-3xl mt-8 ">
              Unique, ownable <br />
              intelligence
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 font-sora mt-18">
            {servicesData.map((service) => (
              <div key={service.id} className="text-center sm:text-left">
                <h1 className="font-semibold">{service.title}</h1>
                <p className="mt-5 md:mt-8">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
