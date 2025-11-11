"use client";
import sora_ai from "@/assets/home/sora-ai.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
const homeWhyUsData = [
  {
    id: 1,
    title: "Digital products",
    desc: "We create visually compelling designs that enhance user experience. We make sure your brand's visuals resonate with your audience.",
    image: sora_ai,
    color: "bg-dark-1",
  },
  {
    id: 2,
    title: "Corporate website",
    desc: "We create visually compelling designs that enhance user experience. We make sure your brand's visuals resonate with your audience.",
    image: sora_ai,
    color: "bg-[#6AF989]",
  },
  {
    id: 3,
    title: "eCommerce",
    desc: "We create visually compelling designs that enhance user experience. We make sure your brand's visuals resonate with your audience.",
    image: sora_ai,
    color: "bg-[#5C5E5C]",
  },
  {
    id: 4,
    title: "Brand identity",
    desc: "We create visually compelling designs that enhance user experience. We make sure your brand's visuals resonate with your audience.",
    image: sora_ai,
    color: "bg-[#7C6B59]",
  },
];
export default function WhyUs() {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current;

    // Set up horizontal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=400%", // scroll distance (2x viewport)
        scrub: true, // smooth link to scroll
        pin: true, // locks section while animating
        anticipatePin: 1,
        markers: false, // turn true for debugging
      },
    });

    // Slide both panels horizontally
    tl.to(panels, {
      xPercent: -135 * (panels.length - 1),
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="container  mt-20 relative z-99">
      <div className="wrapper md:mt-20 mb-14 text-center sm:text-left">
        <h5>[ Why Us ]</h5>
        <h1 className="font-press-start text-xl lg:text-3xl mt-8">
          Unique, ownable <br />
          intelligence
        </h1>
      </div>
      <div ref={sectionRef} className="relative w-full  overflow-hidden ">
        <div
          style={{ width: 100 * homeWhyUsData.length + "%" }}
          className="flex gap-x-8 sm:gap-x-10"
        >
          {/* Panel 1 */}
          {homeWhyUsData.map((data, index) => (
            <div
              key={data.id}
              ref={(el) => (panelsRef.current[index] = el)}
              className={`wrapper  px-5 lg:px-9 py-9 rounded-lg ${
                data.color === "bg-dark-1"
                  ? `${data.color} text-white`
                  : `${data.color} text-black`
              } `}
            >
              <div className="flex justify-between mb-4 font-press-start">
                <div className="max-w-[761px] w-full ">
                  <h4 className="text-xl lg:text-4xl">{data.title}</h4>
                  <p className="mt-4 text-xs">{data.desc}</p>
                </div>
                <p className="text-right text-2xl lg:text-5xl">{`/0${data.id}`}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
