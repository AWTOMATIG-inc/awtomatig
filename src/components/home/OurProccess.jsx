import { ourProcessData } from "@/contants/ourProcess";
import GsapScrollEffect from "../animation/GsapScrollEffect";

export default function OurProccess() {
  return (
    <section className="container sm:mt-20 md:mt-40">
      <div className="wrapper grid lg:grid-cols-[230px_1fr] xl:grid-cols-[300px_1fr]">
        <div className="text-center lg:text-left">
          <h5 className="text-3xl font-sora font-bold">
            Our process is <br />
            as easy as
          </h5>
          <span className="bg-white inline-block text-black font-bold font-sora text-3xl px-5 py-2 rounded-lg -rotate-5 mt-6">
            1-2-3
          </span>
        </div>
        <div className="relative ">
          <span className="absolute right-[-40%] -bottom-[70%] size-[1145px]  bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] blur-[173.4px] rounded-full hidden sm:inline-block"></span>

          <div className="space-y-20 mt-20 ">
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
                  <div className="max-w-[440px] mx-auto">
                    <h1 className="font-inter font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl capitalize">
                      {process.title}
                    </h1>
                    <p className="font-montserrat mt-7 lg:text-lg">
                      {process.desc}
                    </p>
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
