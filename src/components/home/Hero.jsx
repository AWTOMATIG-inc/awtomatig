"use client";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
export default function Hero() {
  const hello = "hello";
  return (
    <section className="container lg:min-h-screen relative  ">
      <div className="grid  justify-center pt-38 sm:pt-48 lg:pt-58 h-[75vh] sm:h-[70vh] md:h-[75vh] xl:h-[90vh]">
        <div className="wrapper text-center ">
          <FadeInSection
            initial={{ opacity: 0, x: -100 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -80 }}
            margin="400px 0px -100px 0px"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-russo-one leading-[149%] bg-[linear-gradient(180deg,#FFFFFF_0%,#999999_100%)] text-transparent bg-clip-text ">
              We Power Your Growth
            </h1>
            <h3 className="mt-3 sm:mt-6 lg:mt-10 text-xl sm:text-2xl xl:text-5xl bg-[linear-gradient(90deg,#FFFFFF_0%,#02D5E8_100%)] bg-clip-text text-transparent font-medium">
              Your extended tech and operations team <br /> without the
              overhead.
            </h3>
            <p className=" mt-4 sm:mt-14 lg:mt-24 text-base sm:text-lg md:text-xl xl:text-2xl   text-gray-300">
              We connect your tools, streamline workflows, and ship work that
              moves revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mt-10 md:mt-12 lg:mt-16">
              <AnimatedButton name="Know more"   icon={true} />
              <AnimatedButton name="Book a call"    icon={true} />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
