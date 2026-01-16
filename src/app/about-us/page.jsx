import group_meeting from "@/assets/about/man-working.gif";
import FadeInSection from "@/components/animation/FadeEffect";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import CommonHeading from "@/components/CommonHeading";
import Image from "next/image";
export default function AboutUs() {
  return (
    <main>
      <section>
        <div className="absolute top-0 left-0 h-full w-full">
          <BackgroundAnimation className="min-h-screen" />
        </div>
        <div className="container relative z-10">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <div className="wrapper flex flex-col justify-center items-center min-h-screen text-center gap-4">
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase font-russo-one tracking-wider">
                About AWTOMATIG
              </h1>
              <p className="font-montserrat text-base sm:text-lg lg:text-2xl xl:text-3xl mt-4 sm:mt-6 lg:mt-8 uppercase">
                We help businesses scale operations, technology, and execution—{" "}
                <br />
                without the chaos of building everything in-house.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
      <section className="container my-20">
        <div className="wrapper">
          <CommonHeading title="Our Story">
            Building systems that turn growth into
            <span className="text-[#3BEBFF]"> legacy.</span>
          </CommonHeading>
         
        </div>
      </section>
      <section className="container mb-20">
        <div className="wrapper">
          <div className="grid grid-cols-2">
            <Image
              src={group_meeting}
              alt="group-working"
              height={556}
              width={675}
              className="max-w-2xl object-cover max-h-[500px]"
            />
            <div className="pl-16">
              <p className="text-2xl font-russo-one  uppercase text-justify leading-9 ">
                Empower your team with AI systems that learn, adapt and improve
                over time. Together, we’ll pioneer the next generation.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-10">
                <div>
                  <h5 className="font-extrabold font-sora text-2xl">
                    4+ Years
                  </h5>
                  <p className="font-inter  mt-2">
                    Operational experience since 2022
                  </p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-2xl">
                    10+ Active Clients
                  </h5>
                  <p className="font-inter  mt-2">
                    Across eCommerce, SaaS, and service businesses
                  </p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-2xl">
                    95%+ Retention Rate
                  </h5>
                  <p className="font-inter  mt-2">
                    Long-term partnerships, not one-off gigs
                  </p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-2xl">
                    50k+ Tasks Managed
                  </h5>
                  <p className="font-inter  mt-2">
                    Across ops, support, design, and development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
