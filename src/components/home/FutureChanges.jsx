import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import ParticleBackground from "../ParticleBackground";
export default function FutureChanges() {
  return (
    <div className="relative">
      <ParticleBackground className="absolute h-full w-full" />
      <div className="absolute bg-black/10 backdrop-blur-[1px] h-full w-full"></div>
      <div className="container">
        <div className="relative h-[300px] md:h-[604px] wrapper">
          <div className="h-full flex flex-col md:flex-row md:justify-between items-center gap-8 md:gap-4">
            <FadeInSection
              initial={{ opacity: 0, x: -150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: -150 }}
              margin="40px 0px -40px 0px"
            >
              <h1 className="text-center md:text-left text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-russo-one leading-11 sm:leading-14 md:leading-[72px] ">
                The future is already working. <br />
                See what changes when systems align.
              </h1>
            </FadeInSection>
            <FadeInSection
              initial={{ opacity: 0, x: 150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: 150 }}
              margin="40px 0px -40px 0px"
            >
              <AnimatedButton name="Case Studies" icon={true} />
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
