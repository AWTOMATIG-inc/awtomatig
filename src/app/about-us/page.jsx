import group_meeting from "@/assets/about/group-meeting.webp";
import man_working from "@/assets/about/man-working.png";
import team_meeting from "@/assets/about/team-meeting.png";
import FadeInSection from "@/components/animation/FadeEffect";
import BackgroundAnimation from "@/components/BackgroundAnimation";
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
            <div className="flex flex-col justify-center items-center min-h-screen text-center gap-4">
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase font-russo-one tracking-wider">
                ABout US
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mt-4 sm:mt-6 lg:mt-8">
                Empower your team with AI systems that learn, adapt and improve
                over time. Together,
              </p>
            </div>
          </FadeInSection>

          <p className="absolute bottom-5 left-5 font-bold">Home / services</p>
        </div>
      </section>
      <section className="container my-20">
        <div className="wrapper">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h5 className="font-montserrat">[ Our Story ]</h5>
              <h1 className="font-russo-one text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 leading-[70px]">
                Your Vision Our Expertise Your <br /> Success Get Noticed
                Generate <br />
                <span className="text-[#3BEBFF]">Lead Dominate.</span>
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Image
                src={man_working}
                alt="man-working"
                width={330}
                height={229}
              />
              <Image
                src={team_meeting}
                alt="man-working"
                width={330}
                height={229}
              />
            </div>
          </div>
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
            />
            <div className="pl-20">
              <p className="text-2xl font-montserrat  uppercase leading-8">
                Empower your team with AI systems that learn, adapt and improve
                over time. Together,
                <br /> we’ll pioneer the next generation.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-10">
                <div>
                  <h5 className="font-extrabold font-sora text-4xl">10k +</h5>
                  <p className="text-2xl mt-2">Complated Projects</p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-4xl">10k +</h5>
                  <p className="text-2xl mt-2">Complated Projects</p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-4xl">10k +</h5>
                  <p className="text-2xl mt-2">Complated Projects</p>
                </div>
                <div>
                  <h5 className="font-extrabold font-sora text-4xl">10k +</h5>
                  <p className="text-2xl mt-2">Complated Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
