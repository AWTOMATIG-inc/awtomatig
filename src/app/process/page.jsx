"use client";
import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import FadeInSection from "@/components/animation/FadeEffect";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import GlowBall from "@/components/GlowBall";
import Image from "next/image";
const steps = [
  {
    id: 1,
    title: "connect",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 2,
    title: "Align",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 3,
    title: "Assign",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 4,
    title: "Execute",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 5,
    title: "Deliver",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 6,
    title: "Support",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];
export default function Process() {
  return (
    <main>
      <section className="min-h-[823px] relative">
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
                Process of Starting the Project
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mt-4 sm:mt-6 lg:mt-8">
                At AWTOMATIG, we value transparency. and delivering exceptional
                results.
              </p>
            </div>
          </FadeInSection>

          <p className="absolute bottom-5 left-5 font-bold">Home / services</p>
        </div>
      </section>
      <section className="container my-20">
        <div className="wrapper">
          <div className="  font-montserrat pt-5 max-w-[1226px]">
            <h4>[ At Awtomatig ]</h4>
            <p className="mb-16 mt-12 capitalize text-3xl font-medium font-inter">
              we combine scalable teams, sharp strategy, and efficient tools to
              handle your business processes end-to-end. From first contact to
              final delivery, our approach is built for clarity, speed, and real
              results.{" "}
            </p>

            {/* <button className=" p-[3px] rounded-xl animated-border-button">
              <span className="block bg-black text-white px-6 py-2 rounded-xl font-inter">
                Here’s an overview of our typical process:
              </span>
            </button> */}

            <button className=" p-[3px] rounded-xl animated-border-red">
              <span className="block bg-black text-white px-6 py-2 rounded-xl font-inter text-2xl">
                Here’s an overview of our typical process:
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="my-20 container">
        <div className="wrapper   text-white  grid grid-cols-2 gap-40">
          {steps.map((step) => (
            <div key={step.id} className="font-inter">
              <div className="flex items-end gap-6 font-inter">
                <span className="font-bold text-9xl bg-[linear-gradient(180deg,_#FFFFFF_0%,_#02D5E8_100%)] bg-clip-text text-transparent">
                  0{step.id}
                </span>

                <h5 className="border-gray-400 border-b w-full capitalize text-2xl pb-1 text-[#02D5E8]">
                  {step.title}
                </h5>
              </div>

              <p className="font-montserrat mt-5 text-xl font-semibold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container my-27">
        <div className="wrapper">
          <div className="bg-[linear-gradient(-130deg,#910F11_0%,#02D5E8_49.29%,#0701BF_98.13%)] p-[5px] rounded-xl h-[605px] my-10 overflow-hidden">
            <div className="bg-black rounded-lg p-6 flex justify-center items-center text-center  h-full w-full relative">
              <GlowBall size={1000} duration={18} delay={0} />
              <GlowBall size={1000} duration={26} delay={-8} />
              {/* <div className="blur-[200px] rotate-90 absolute top-0 left-0 z-0 bg-[#02D5E880] size-[457px]"></div>
              <div className="blur-[100px] rotate-90 absolute bottom-0 right-0 z-0 bg-[#2B388D80] size-[457px]"></div> */}
              <div className="relative z-10">
                <Image
                  src={awtomatig_logo}
                  width={66}
                  height={92}
                  alt="logo"
                  className="w-full max-w-[50px] md:max-w-[66px] max-h-[92px] h-auto mx-auto mb-8"
                />
                <h2 className="font-bold text-4xl">
                  Thank you for your Interest in AWTOMATIG
                </h2>
                <p className="text-lg mt-8 max-w-[1095px]">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution
                </p>
                <button className="bg-white px-8 text-black font-medium py-1 rounded-4xl mt-10">
                  Start Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
