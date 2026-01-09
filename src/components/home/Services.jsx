import { servicesData } from "@/contants/services";
import Marquee from "react-fast-marquee";
import FadeInSection from "../animation/FadeEffect";

export default function Services() {
  return (
    <section className=" mt-20">
      <div>
        <Marquee speed={50} gradient={false} autoFill={true}>
          <p className="font-sora text-5xl lg:text-7xl xl:text-8xl bg-linear-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center overflow-hidden py-20">
            / Changing the game for Artificial Intelligence
          </p>
        </Marquee>
      </div>
      <div className="container">
        <FadeInSection
          initial={{ opacity: 0, x: 100 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 100 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
            <div>
              <h5 className="font-montserrat">[ Why Us ]</h5>
              <h1 className="font-russo-one text-2xl lg:text-3xl xl:text-5xl mt-8 ">
                Unique, ownable intelligence
              </h1>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14  mt-25">
              {servicesData.map((service) => (
                <div key={service.id} className="text-center sm:text-left">
                  <h1 className="font-semibold font-inter">{service.title}</h1>
                  <p className="mt-5 md:mt-8 font-montserrat font-light text-sm">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
