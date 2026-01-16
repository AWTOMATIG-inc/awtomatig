import { servicesData } from "@/contants/services";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";

export default function Services() {
  return (
  
      
      <div className="container">
        <FadeInSection
          initial={{ opacity: 0, x: 100 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 100 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
            <CommonHeading title="Why teams stay">
              Because the work feels different
            </CommonHeading>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12  mt-25">
              {servicesData.map((service) => (
                <div key={service.id} className="text-center sm:text-left">
                  <h1 className="font-semibold font-inter">{service.title}</h1>
                  <p className="mt-5 md:mt-8 font-montserrat font-light text-sm text-justify">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
  
  );
}
