import playBanner from "@/assets/home/animated-banner.jpg";
import Image from "next/image";
import FadeInSection from "../animation/FadeEffect";
export default function FutureChanges() {
  return (
    <section className="container mt-20">
      <div className="relative wrapper">
        <Image
          src={playBanner}
          width={1887}
          height={604}
          alt="banner"
          className="rounded-xl"
        />
        <div className="absolute  w-full left-1/2 top-1/2 -translate-1/2 max-w-[1341px] h-full flex justify-between items-center px-4 md:px-8 lg:px-10">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sora leading-[150%] lg:leading-[110%] ">
              Future is here. <br /> Meet changes!
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, x: 150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: 150 }}
            margin="40px 0px -40px 0px"
          >
            <button className="text-xs sm:text-sm md:text-xl lg:text-3xl border size-[80px] sm:size-[100px] md:size-[150px] lg:size-[200px] rounded-full capitalize hover:border-teal hover:text-teal hoverEffect">
              play video
            </button>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
