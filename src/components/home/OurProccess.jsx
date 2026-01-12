import { ourProcessData } from "@/contants/ourProcess";
import GsapScrollEffect from "../animation/GsapScrollEffect";

export default function OurProccess() {
  return (
    <section className="container sm:mt-20 md:mt-40">
      <div className="wrapper grid lg:grid-cols-[230px_1fr] xl:grid-cols-[470px_1fr]">
        <div className="text-center lg:text-left">
          <h5 className="font-montserrat">[ Getting started ]</h5>
          <h5 className="text-[40px] font-inter font-extrabold leading-[135%] mt-6">
            A clear beginning <br />— no pressure attached
          </h5>
        </div>
        <div className="relative ">
          <span className="absolute right-[-40%] -bottom-[70%] size-[1145px]  bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] blur-[173.4px] rounded-full hidden sm:inline-block"></span>

          <div className="space-y-20 mt-32 ">
            {ourProcessData.map((process) => (
              <GsapScrollEffect
                initial={{ opacity: 0, x: process.id % 2 === 0 ? -400 : 400 }}
                scrollTop={{ opacity: 1, x: 0 }}
                scrollBottom={{
                  opacity: 0,
                  x: process.id % 2 === 0 ? -400 : 400,
                }}
                key={process.id}
                delay={process.id == 2 ? "0.6" : "0.5"}
              >
                <div
                  className={`bg-white text-black px-5 py-7 md:py-10 rounded-xl lg:max-w-[500px] xl:max-w-[700px] 2xl:max-w-[723px] relative ${process.className}`}
                >
                  <div className="max-w-[530px] mx-auto">
                    <h1 className="font-russo-one  text-lg lg:text-2xl  capitalize">
                      {process.title}
                    </h1>
                    <h1 className="font-inter font-medium text-lg lg:text-xl  capitalize mt-3 text-[#050505]">
                      {process.subtitle}
                    </h1>
                    <p className="font-montserrat mt-7">{process.desc}</p>
                  </div>
                  <span className="bg-teal font-sora block absolute -top-4 -left-3 p-1 rounded-sm text-sm">
                    0{process.id}
                  </span>
                </div>
              </GsapScrollEffect>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
