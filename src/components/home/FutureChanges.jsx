import FadeInSection from "../animation/FadeEffect";
import ParticleBackground from "../ParticleBackground";
export default function FutureChanges() {
  return (
    <section className="relative mt-32">
      <ParticleBackground className="absolute h-full w-full" />
      <div className="absolute bg-black/10 backdrop-blur-[1px] h-full w-full"></div>
      <div className="container">
        <div className="relative h-[300px] md:h-[604px] wrapper">
          <div className="absolute  w-full left-1/2 top-1/2 -translate-1/2 max-w-[1341px] h-full flex justify-between items-center">
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
              <button className="text-base md:text-xl lg:text-3xl border size-28 xs:size-30 sm:size-[100px] md:size-[150px] lg:size-[200px] rounded-full capitalize hover:border-teal hover:text-teal hoverEffect">
                play video
              </button>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
