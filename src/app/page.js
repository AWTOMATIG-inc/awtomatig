import card_bg from "@/assets/home/card-bg.webp";
import glove_card from "@/assets/home/glove-card.webp";
import worldGlove from "@/assets/home/glove.webp";
import playBanner from "@/assets/home/play-banner.gif";
import sora_ai from "@/assets/home/sora-ai.png";
import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import Accordion from "@/components/Accordion";
import { ourProcessData } from "@/contants/ourProcess";
import { servicesData } from "@/contants/services";
import { Icon } from "@iconify/react";
import Image from "next/image";
export default function Home() {
  return (
    <main className="bg-home-banner">
      <section className="container min-h-screen  relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] items-center justify-center h-[60vh] md:h-[90vh]">
          <div></div>
          <div className="absolute -left-50 top-1/2 -translate-y-1/2 hidden md:block">
            <Image
              src={worldGlove}
              alt="aside_image"
              width={772}
              height={772}
              className="md:w-[75%] lg:w-[90%] xl:w-full max-w-[650px] h-auto"
            />
          </div>
          <div className="max-w-[850px] text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-press-start leading-[149%]">
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
          </div>
        </div>
        <div className="max-w-[1341px] mx-auto border rounded-lg flex justify-between gap-8 px-8 md:px-14 py-4 md:py-8 overflow-hidden">
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
      </section>
      <section className="container min-h-screen">
        <div className="mt-20 mb-14 max-w-[1341px] mx-auto">
          <h5>[ Why Us ]</h5>
          <h1 className="font-press-start text-3xl mt-8">
            Unique, ownable <br />
            intelligence
          </h1>
        </div>

        <div className="bg-dark-1 p-9 rounded-lg">
          <div className="flex justify-between mb-4 font-press-start">
            <div className="max-w-[761px] w-full ">
              <h4 className="text-4xl">Digital products</h4>
              <p className="mt-4 text-xs">
                We create visually compelling designs that enhance user
                experience. We make sure your brand&apos;s visuals resonate with
                your audience.
              </p>
            </div>
            <p className="text-right text-5xl">/01</p>
          </div>
          <div className="grid grid-cols-2 gap-8 ">
            <Image
              src={sora_ai}
              width={871}
              height={428}
              alt="slider_item"
              className="w-full h-full max-w-[871px] max-h-[428px] rounded-lg"
            />
            <Image
              src={sora_ai}
              width={871}
              height={428}
              alt="slider_item"
              className="w-full h-full max-w-[871px] max-h-[428px] rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="container">
        <div>
          <h1 className="font-sora text-7xl bg-gradient-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center">
            / Changing the game for Artificial Intelligence
          </h1>
        </div>
        <div className="mt-20 mb-14 max-w-[1341px] mx-auto">
          <div>
            <h5>[ Why Us ]</h5>
            <h1 className="font-press-start text-3xl mt-8">
              Unique, ownable <br />
              intelligence
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-14 font-sora mt-18">
            {servicesData.map((service) => (
              <div key={service.id}>
                <h1 className="font-semibold">{service.title}</h1>
                <p className="mt-8">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mt-40">
        <div className="max-w-[1341px] mx-auto grid grid-cols-[300px_1fr]">
          <div>
            <h5 className="text-3xl font-sora font-bold">
              Our process is <br />
              as easy as
            </h5>
            <span className="bg-white inline-block text-black font-bold font-sora text-3xl px-5 py-2 rounded-lg -rotate-5 mt-6">
              1-2-3
            </span>
          </div>
          <div className="relative ">
            <span className="absolute right-[-40%] -bottom-[70%] size-[1145px] inline-block bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] blur-[173.4px] rounded-full"></span>
            <div className="space-y-16">
              {ourProcessData.map((process) => (
                <div
                  key={process.id}
                  className="bg-white text-black py-10 rounded-xl max-w-[723px] relative"
                  style={{
                    transform: `translateX(${process.translateX}px) rotate(${process.rotate}deg)`,
                  }}
                >
                  <div className="max-w-[440px] mx-auto">
                    <h1 className="font-press-start text-xl">
                      {process.title}
                    </h1>
                    <p className="font-sora mt-7">{process.desc}</p>
                  </div>
                  <span className="bg-teal font-sora block absolute -top-4 -left-3 p-1 rounded-sm text-sm">
                    0{process.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-40 z-1 relative">
        <div className="flex gap-5 max-w-[1341px] mx-auto">
          <div className="relative w-fit text-black rounded-2xl overflow-hidden">
            <Image
              src={card_bg}
              width={659}
              height={471}
              alt="card"
              className="w-[659px] h-[471px] object-cover"
            />

            <p className="absolute top-0 font-silkscreen px-10 pt-14 text-3xl">
              Build, compare, and <br />
              ship <br />
              Generation apps in <br />
              minutes
            </p>

            <div className="absolute bottom-8 right-10 font-silkscreen ">
              <h1 className="text-8xl font-bold">20k</h1>
              <p className="font-bold text-right">happy customer</p>
            </div>
          </div>

          <div className="bg-[linear-gradient(149.96deg,_#FFFFFF_3.15%,_#02D5E8_99.07%)] text-black rounded-2xl p-8 w-[360px] relative ">
            <h4 className="text-3xl font-silkscreen">
              Explore <br /> Scale <br />
              Spellbook
            </h4>
            <p className="mt-4">
              Triggerfish bluntnose knifefish <br /> upside-down catfish kfish
              convict.
            </p>
            <Image
              src={glove_card}
              width={177}
              height={181}
              alt="card"
              className="w-[177px] h-[181px] object-cover absolute bottom-0 right-0"
            />
          </div>
          <div className="bg-black px-8 py-12 rounded-2xl w-[279px] border border-gray-400">
            <p className="font-bold font-press-start text-center text-[0.6rem]">
              Welcome to the future, brought to you by the past.
            </p>
            <div className="bg-stone-500 h-25 w-full border border-teal mt-10 rounded-lg"></div>
            <div className="bg-stone-500 h-25 w-full border border-teal mt-8 rounded-lg"></div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="bg-[conic-gradient(from_133.87deg_at_50%_48.06%,_#333333_0deg,_#A2F5FF_176.54deg,_#000000_360deg)] flex items-center  gap-8 max-w-[1341px] mx-auto text-black px-20 py-9 rounded-xl mt-8 min-h-[296px]">
          <h1 className="text-xl font-press-start max-w-[454px]">
            Keep flying with <br /> your favorite service
          </h1>
          <div className="flex justify-between w-full">
            {Array.from({ length: 6 }).map((_, index) => (
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
        </div>
      </section>
      <section className="container mt-20">
        <div className="relative">
          <Image
            src={playBanner}
            width={1887}
            height={604}
            alt="banner"
            className="rounded-xl"
          />
          <div className="absolute  w-full left-1/2 top-1/2 -translate-1/2 max-w-[1341px] h-full flex justify-between items-center px-20">
            <h1 className="text-8xl font-sora">
              Future is here. <br /> Meet changes!
            </h1>
            <button className="text-3xl border size-[200px] rounded-full capitalize">
              play video
            </button>
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <div className="max-w-[1341px] mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="font-sora text-6xl font-bold text-teal">
              Our capabilities
            </h1>
            <button className="flex gap-x-1 border px-6 py-1 rounded-lg">
              <span>Work</span>
              <Icon icon="humbleicons:arrow-right-up" width="24" height="24" />
            </button>
          </div>
          <div className="my-8">
            <Accordion />
            <Accordion />
            <Accordion />
            <Accordion />
            <Accordion />
          </div>
        </div>
      </section>
    </main>
  );
}
