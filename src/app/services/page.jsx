import Accordion from "@/components/Accordion";
import FadeInSection from "@/components/animation/FadeEffect";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import CommonHeading from "@/components/CommonHeading";
import MarqueHighlightText from "@/components/MarqueHighlightText";
import Benifits from "@/components/services/Benifits";
import GetInTouch from "@/components/services/GetInTouch";
import OurServices from "@/components/services/OurServices";
import Sponsor from "@/components/services/Sponsor";
import { FAQ } from "@/contants/capabilities";
export default function Services() {
  return (
    <main>
      <section className="min-h-[823px] relative">        
        <div className="absolute top-0 left-0 h-full w-full">
          <BackgroundAnimation className="min-h-screen" />
        </div>
        <div className="container relative ">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <div className="wrapper flex flex-col justify-center items-center min-h-screen text-center gap-4">
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase font-russo-one tracking-wider">
                Better business through smarter technology.
              </h1>
              <p className="font-inter text-base sm:text-lg lg:text-xl xl:text-3xl mt-4 sm:mt-6 lg:mt-8">
                Using automation and human expertise, we
                optimize complex processes to deliver superior, data-driven
                results.
              </p>
              <p className="font-inter text-base sm:text-base lg:text-xl mt-3 sm:mt-5">
                We bridge the gap between outsourcing and digital
                transformation.
              </p>
            </div>
            
          </FadeInSection>
        </div>
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <OurServices />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <MarqueHighlightText
        marqueeText={[
          "/From growth pressure to structured momentum",
          "/From execution overload to scalable systems",
          "/From manual effort to intelligent flow",
        ]}
      />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <Benifits />
      </section>      
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <Sponsor />
      </section>
      <section className="container relative mt-14 sm:mt-16 md:mt-20 lg:mt-32 ">
        <span
          style={{
            background:
              "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
          }}
          className="hidden lg:inline-block absolute size-[800px]  -left-40 -bottom-10 rounded-full blur-[320px] -z-1"
        ></span>
        <FadeInSection
          initial={{ opacity: 0, y: -150 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -150 }}
          margin="40px 0px -40px 0px"
          className="wrapper"
        >
           <CommonHeading title="FAQ" color="text-teal">
                    Common questions from our clients
                  </CommonHeading>
         

          <div className="mt-14">
            {FAQ.map((capability) => (
              <Accordion
                key={capability.id}
                title={capability.title}
                serial={"0" + capability.id}
              >
                <p className="font-montserrat">{capability.description}</p>
              </Accordion>
            ))}
          </div>
        </FadeInSection>
      </section>
      <section className="my-14 sm:my-16 md:my-20 lg:my-32">
        <GetInTouch />
      </section>
    </main>
  );
}
