import playBanner from "@/assets/home/animated-banner.jpg";
import card_bg from "@/assets/home/card-bg.webp";
import glove_card from "@/assets/home/glove-card.webp";
import worldGlove from "@/assets/home/glove.webp";
import rainbow_bg from "@/assets/home/rainbow-bg.webp";
import sora_ai from "@/assets/home/sora-ai.png";
import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import Accordion from "@/components/Accordion";
import ArticleBar from "@/components/ArticleBar";
import { capabilities } from "@/contants/capabilities";
import { ourProcessData } from "@/contants/ourProcess";
import { servicesData } from "@/contants/services";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
export default function Home() {
  return (
    <main className="bg-home-banners overflow-hidden">
      <Image
        src={"/images/banners/home-banner.webp"}
        alt="aside_image"
        width={2500}
        height={772}
        className="absolute left-0 w-full h-full "
      />
      <section className="container min-h-[70vh] sm:min-h-screen relative ">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] items-center justify-center h-[70vh] md:h-[90vh]">
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
          </div>
        </div>
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
      </section>
      <section className="container  mt-20 relative z-99">
        <div className="wrapper md:mt-20 mb-14 text-center sm:text-left">
          <h5>[ Why Us ]</h5>
          <h1 className="font-press-start text-xl lg:text-3xl mt-8">
            Unique, ownable <br />
            intelligence
          </h1>
        </div>

        <div className="wrapper bg-dark-1 px-5 lg:px-9 py-9 rounded-lg ">
          <div className="flex justify-between mb-4 font-press-start">
            <div className="max-w-[761px] w-full ">
              <h4 className="text-xl lg:text-4xl">Digital products</h4>
              <p className="mt-4 text-xs">
                We create visually compelling designs that enhance user
                experience. We make sure your brand&apos;s visuals resonate with
                your audience.
              </p>
            </div>
            <p className="text-right text-2xl lg:text-5xl">/01</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 ">
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

      <section className="container mt-20">
        <div>
          <Marquee speed={50} gradient={false} autoFill={true}>
            <h1 className="font-sora text-5xl lg:text-7xl bg-gradient-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center overflow-hidden py-4">
              / Changing the game for Artificial Intelligence
            </h1>
          </Marquee>
        </div>

        <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
          <div>
            <h5>[ Why Us ]</h5>
            <h1 className="font-press-start text-2xl lg:text-3xl mt-8 ">
              Unique, ownable <br />
              intelligence
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 font-sora mt-18">
            {servicesData.map((service) => (
              <div key={service.id} className="text-center sm:text-left">
                <h1 className="font-semibold">{service.title}</h1>
                <p className="mt-5 md:mt-8">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
            <div className="space-y-16 mt-20 ">
              {ourProcessData.map((process) => (
                <div
                  key={process.id}
                  className={`bg-white text-black px-5 py-7 md:py-10 rounded-xl lg:max-w-[500px] xl:max-w-[700px] 2xl:max-w-[723px] relative ${process.className}`}
                >
                  <div className="max-w-[440px] mx-auto">
                    <h1 className="font-press-start text-lg lg:text-xl">
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
      <section className="container mt-20 md:mt-40 z-1 relative">
        <div className=" sm:hidden text-center sm:text-left mb-8">
          <h5>[ Why Us ]</h5>
          <h1 className="font-press-start text-2xl lg:text-3xl mt-8 ">
            Unique, ownable <br />
            intelligence
          </h1>
        </div>
        <div className="wrapper grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_400px_279px] gap-5 text-center sm:text-left">
          <div className="relative w-fit text-black rounded-2xl overflow-hidden ">
            <Image
              src={card_bg}
              width={659}
              height={471}
              alt="card"
              className="w-[659px] h-[471px] object-cover"
            />

            <p className="absolute top-0 left-1/2 -translate-x-1/2 font-silkscreen px-6 md:px-8 lg:px-10 pt-14 text-2xl lg:text-3xl w-full">
              Build, compare, and <br />
              ship <br />
              Generation apps in <br />
              minutes
            </p>

            <div className="absolute bottom-14 right-1/2 translate-x-1/2 sm:bottom-8 sm:right-10 font-silkscreen w-full">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                20k
              </h1>
              <p className="font-bold text-center sm:text-right">
                happy customer
              </p>
            </div>
          </div>

          <div className="bg-[linear-gradient(149.96deg,_#FFFFFF_3.15%,_#02D5E8_99.07%)] text-black rounded-2xl p-8 w-full relative min-h-[450px]">
            <h4 className="text-3xl font-silkscreen">
              Explore <br className="hidden sm:block" /> Scale <br />
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
          <div className="bg-black px-8 py-12 rounded-2xl w-full border border-gray-400">
            <p className="font-bold font-press-start text-center text-[0.6rem]">
              Welcome to the future, brought to you by the past.
            </p>
            <div className="bg-stone-500 h-25 w-full border border-teal mt-10 rounded-lg"></div>
            <div className="bg-stone-500 h-25 w-full border border-teal mt-8 rounded-lg"></div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="wrapper bg-[conic-gradient(from_133.87deg_at_50%_48.06%,_#333333_0deg,_#A2F5FF_176.54deg,_#000000_360deg)] flex flex-col lg:flex-row items-center  gap-8 text-black px-12 lg:px-20 py-9 rounded-xl mt-8 min-h-[296px]">
          <h1 className="text-xl font-press-start max-w-[454px] text-center lg:text-left">
            Keep flying with <br /> your favorite service
          </h1>
          <div className=" w-full">
            <Marquee speed={50} gradient={false} autoFill={true}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Image
                  key={index}
                  src={awtomatig_logo}
                  width={66}
                  height={92}
                  alt="logo"
                  className="w-full max-w-[50px] md:max-w-[66px] max-h-[92px] h-auto mr-6"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <div className="relative wrapper">
          <Image
            src={playBanner}
            width={1887}
            height={604}
            alt="banner"
            className="rounded-xl"
          />
          <div className="absolute  w-full left-1/2 top-1/2 -translate-1/2 max-w-[1341px] h-full flex justify-between items-center px-4 md:px-8 lg:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sora leading-[150%] lg:leading-[110%] ">
              Future is here. <br /> Meet changes!
            </h1>
            <button className="text-xs sm:text-sm md:text-xl lg:text-3xl border size-[80px] sm:size-[100px] md:size-[150px] lg:size-[200px] rounded-full capitalize hover:border-teal hover:text-teal hoverEffect">
              play video
            </button>
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <div className="wrapper">
          <div className="flex justify-between items-center">
            <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-teal">
              Our capabilities
            </h1>
            <button className="flex gap-x-1 border px-6 py-1 rounded-lg hover:border-teal hover:text-teal hoverEffect">
              <span>Work</span>
              <Icon icon="humbleicons:arrow-right-up" width="24" height="24" />
            </button>
          </div>

          <div className="my-8">
            {capabilities.map((capability) => (
              <Accordion
                key={capability.id}
                title={capability.title}
                serial={"0" + capability.id}
              >
                <p>{capability.description}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <div className="wrapper grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={rainbow_bg}
              width={920}
              height={750}
              className="rounded-2xl w-full max-w-[920px] h-auto"
              alt="rainbow-image"
            />
          </div>
          <div>
            <div className="max-w-[690px] text-center md:text-left">
              <h5>[ Testimonials ]</h5>
              <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-6 lg:mt-8 leading-[55px] lg:leading-[70px]">
                Awesome Thouths
                <br className="hidden md:block" />
                About Artificial <br /> Intelligence
              </h1>
              <p className="mt-6 sm:mt-10 lg:mt-20">
                Halosaur duckbilled barracudina, goosefish gar pleco, chum
                salmon armoured catfish gudgeon sawfish whitefish orbicular
                batfish mummichog paradise fish! Pacific hake false trevally
                queen parrotfish black prickleback moss revally queen parrotfish
                black prickleback moss. Queen parrotfish black prickleback moss
                pacific hake false trevally queen parrotfish black prickleback
                moss revally
              </p>
              <div className="flex flex-col lg:flex-row justify-between items-center mt-13 md:text-center">
                <div>
                  <h5 className="font-bold text-xl">Adrian Mitchel</h5>
                  <p className="text-sm font-bold mt-1">SolarInc</p>
                </div>
                <div className="flex items-center gap-8 mt-5 lg:mt-0">
                  <span className="w-20 h-2 bg-white block"></span>
                  <span className="w-20 h-1 bg-white block"></span>
                  <span className="w-20 h-1 bg-white block"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container relative">
        <div className="wrapper">
          <div className="pt-14 md:py-20">
            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 text-center md:text-left items-center justify-between relative z-10">
              <div>
                <h5>[ blog ]</h5>
                <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-8">
                  Useful articles
                  <br />
                  from our company
                </h1>
              </div>
              <button className="border px-4 py-3 rounded-lg border-teal  hover:bg-teal/80 hoverEffect">
                Get started
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-[1060px] h-[470px] hidden md:block absolute left-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_94.4%)] blur-[200px] ">
                <div className="relative h-full w-full">
                  <span className="bg-purple w-[600px] h-[300px] block rounded-[100%]  absolute left-1/2 top-1/2 -translate-1/2"></span>
                </div>
              </div>
              <span className="w-[1060px] h-[470px] block absolute right-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_94.4%)] blur-[200px]"></span>
            </div>
          </div>
          <div>
            <div className="max-w-[1114px] ml-auto mt-10 md:mt-20">
              <ArticleBar />
              <ArticleBar />
              <ArticleBar />
              <ArticleBar />
            </div>
          </div>
          <div className="flex justify-between items-center px-5  py-20 relative z-10 gap-3">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-sora">
              Artificial Intellegance
              <br /> create digital future.
            </h1>
            <button className="text-xs md:text-lg lg:text-xl border size-[100px] md:size-[130px] lg:size-[173px] rounded-full capitalize px-2 hover:border-teal hover:text-teal hoverEffect">
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
