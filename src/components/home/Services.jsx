import { servicesData } from "@/contants/services";
import FadeInSection from "../animation/FadeEffect";
import MarqueHighlightText from "../MarqueHighlightText";

export default function Services() {
  return (
    <section className=" mt-20">
      <div>
        <MarqueHighlightText
          marqueeText={[
            "/From growth pressure to structured momentum",
            "/From execution overload to scalable systems",
            "/From manual effort to intelligent flow",
          ]}
        />
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
              <h5 className="font-montserrat">[ Why teams stay ]</h5>
              <h1 className="font-russo-one text-2xl lg:text-3xl xl:text-5xl mt-8 ">
                Because the work feels different
              </h1>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12  mt-25">
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
