"use client";
import rainbow_bg from "@/assets/home/rainbow-bg.webp";
import Image from "next/image";
import { useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FadeInSection from "../animation/FadeEffect";
export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  return (
    <section className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-2  mx-auto w-[95%] md:w-full">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
        >
          <Image
            src={rainbow_bg}
            width={920}
            height={750}
            className="rounded-2xl w-full max-w-[945px] h-auto "
            alt="rainbow-image"
          />
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
        >
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {slides.map((item, id) => (
              <SwiperSlide>
                <div
                  key={id}
                  className="w-full max-w-[650px] text-center md:text-left  md:pr-8"
                >
                  <h5 className="font-montserrat">[ Testimonials ]</h5>
                  <h1 className="font-russo-one text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-6 lg:mt-8 leading-[55px] lg:leading-[70px]">
                    Awesome Thouths
                    <br className="hidden md:block" />
                    About Artificial <br /> Intelligence
                  </h1>
                  <p className="mt-6 sm:mt-10 lg:mt-20 font-inter">
                    Halosaur duckbilled barracudina, goosefish gar pleco, chum
                    salmon armoured catfish gudgeon sawfish whitefish orbicular
                    batfish mummichog paradise fish! Pacific hake false trevally
                    queen parrotfish black prickleback moss revally queen
                    parrotfish black prickleback moss. Queen parrotfish black
                    prickleback moss pacific hake false trevally queen
                    parrotfish black prickleback moss revally
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between items-center mt-13 md:text-center">
                    <div>
                      <h5 className=" text-xl font-russo-one">
                        Adrian Mitchel
                      </h5>
                      <p className="text-sm font-bold mt-1 font-montserrat">
                        SolarInc
                      </p>
                    </div>
                    {/* Custom Indicator Buttons */}
                    <div className="flex justify-center items-end gap-3 mt-4">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => swiperRef.current.slideTo(index)}
                          className={`w-10 md:w-20  bg-white block ${
                            activeIndex === index ? "h-2" : "h-1"
                          }
            `}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInSection>
      </div>
    </section>
  );
}
