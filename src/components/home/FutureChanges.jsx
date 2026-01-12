import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import ParticleBackground from "../ParticleBackground";
export default function FutureChanges() {
  return (
    <section className="relative mt-32">
      <ParticleBackground className="absolute h-full w-full" />
      <div className="absolute bg-black/10 backdrop-blur-[1px] h-full w-full"></div>
      <div className="container">
        <div className="relative h-[300px] md:h-[604px] wrapper">
          <div className="h-full flex justify-between items-center gap-4">
            <FadeInSection
              initial={{ opacity: 0, x: -150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: -150 }}
              margin="40px 0px -40px 0px"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-russo-one leading-[72px] ">
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
    </section>
  );
}
