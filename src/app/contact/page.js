import FadeInSection from "@/components/animation/FadeEffect";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import GetInTouch from "@/components/contact/GetInTouch";

export default function Contact() {
  return (
    <main>
      <section className=" min-h-[823px] relative overflow-y-hidden">
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
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase font-russo-one tracking-wider leading-24">
                Let’s Start a Conversation
              </h1>
              <p className="font-inter text-base sm:text-lg lg:text-xl xl:text-3xl mt-4 sm:mt-6 lg:mt-8">
                Schedule a call, ask a question, or tell us what you’re
                building. We’ll respond with <br /> clarity, not sales pressure.
              </p>
              <p className="font-inter text-base sm:text-base lg:text-xl mt-3 sm:mt-5">
                Trusted by startups, operators, and growing teams since 2022.
              </p>
            </div>
          </FadeInSection>
          {/* <h5 className="text-8xl text-border text-transparent uppercase absolute -right-30 top-1/2 -translate-y-1/2 opacity-80 -rotate-90 select-none pointer-events-none tracking-[30%] font-sora">
            Contacts
          </h5> */}
        </div>
      </section>
      <section className="my-30">
        <GetInTouch />
      </section>

      <section className="my-20 container ">
        <FadeInSection
          initial={{ opacity: 0, y: -150 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -150 }}
          margin="40px 0px -40px 0px"
        >
          <div className=" wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9298502729616!2d90.41534198641035!3d23.749880833814974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9e38ce56fbd%3A0x1df25537514931fe!2sawtomatig!5e0!3m2!1sen!2sbd!4v1761484151939!5m2!1sen!2sbd"
              width="1430"
              height="711"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl w-full h-full max-w-[1430px] min-h-[711px] overflow-hidden mx-auto"
            ></iframe>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
}
