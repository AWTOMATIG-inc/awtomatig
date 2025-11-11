"use client";
import worldGlove from "@/assets/home/glove.webp";
import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import FadeInSection from "../animation/FadeEffect";
export default function Hero() {
  return (
    <section className="container min-h-[70vh] sm:min-h-screen relative ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] items-center justify-center h-[70vh] md:h-[90vh]">
        <div></div>

        <div className="absolute -left-50 top-1/2 -translate-y-1/2 hidden md:block">
          <FadeInSection
            initial={{ opacity: 0, x: -100 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -80 }}
            margin="40px 0px -40px 0px"
            delay={0.6}
          >
            <Image
              src={worldGlove}
              alt="aside_image"
              width={772}
              height={772}
              className="md:w-[75%] lg:w-[90%] xl:w-full max-w-[650px] h-auto"
            />
          </FadeInSection>
        </div>

        <div className="max-w-[850px] text-center md:text-left">
          <FadeInSection
            initial={{ opacity: 0, x: -100 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -80 }}
            margin="400px 0px -100px 0px"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-press-start leading-[149%]">
              Artificial Intelligence <br />
              in nowadays life
            </h1>
            <p className="my-[30px] text-base xl:text-lg">
              Mummichog paradise fish! Triggerfish bango guppy opah sunfish
              bluntnose knifefish upside-down catfish cobia spookfish convict
              cichlid.
            </p>
            <div className="flex gap-8 justify-center md:justify-start">
              <button className="flex justify-center items-center gap-8 border px-5 py-2 bg-gradient-to-l from-blue-light to-dark-white text-black rounded-lg">
                Discover
                <Icon
                  icon="meteor-icons:arrow-up-right"
                  width="21"
                  height="21"
                />
              </button>
              <button className="flex justify-center items-center gap-2 px-4 py-1 border border-transparent hover:border-blue-light rounded-lg">
                <Icon icon="ep:video-play" width="25" height="25" />
                Watch Video
              </button>
            </div>
          </FadeInSection>
        </div>
      </div>
      <FadeInSection
        initial={{ opacity: 0, x: 100 }}
        scrollTop={{ opacity: 1, x: 0 }}
        scrollBottom={{ opacity: 0, x: 100 }}
        margin="40px 0px -40px 0px"
      >
        <div className="wrapper hidden sm:flex justify-between border rounded-lg  px-8 md:px-14 py-4 md:py-8 overflow-x-hidden ">
          {Array.from({ length: 9 }).map((_, index) => (
            <Image
              key={index}
              src={awtomatig_logo}
              width={66}
              height={92}
              alt="logo"
              className="w-full max-w-[50px] md:max-w-[66px] max-h-[92px] h-auto"
            />
          ))}
        </div>
        <div className=" sm:hidden wrapper flex justify-between border rounded-lg  px-8 md:px-14 py-4 md:py-8 overflow-x-hidden w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <Image
              key={index}
              src={awtomatig_logo}
              width={66}
              height={92}
              alt="logo"
              className="w-full max-w-[50px] md:max-w-[66px] max-h-[92px] h-auto "
            />
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
