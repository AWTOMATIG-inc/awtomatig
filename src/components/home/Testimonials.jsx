"use client";
import rainbow_bg from "@/assets/home/rainbow-bg.webp";
import Image from "next/image";
import { useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  return (
    <div>
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
                  <CommonHeading title="Testimonials">
                    Awesome Thouths
                    <br className="hidden md:block" />
                    About Artificial <br /> Intelligence
                  </CommonHeading>

                  <p className="mt-6 sm:mt-10 lg:mt-20 font-inter">
                    AWTOMATIG is highly professional, competent, and efficient,
                    demonstrating remarkable attention to detail and fostering
                    long-term partnerships.
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-end mt-20 ">
                    <div>
                      <h5 className="font-russo-one">JUMAR WILSON</h5>
                      <p className="text-xs font-bold mt-1 font-montserrat">
                        REALTYREELSMEDIA, SOLAR STARS
                      </p>
                    </div>
                    {/* Custom Indicator Buttons */}
                    <div className="flex justify-center items-end gap-3 mt-4">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => swiperRef.current.slideTo(index)}
                          className={`w-10 md:w-16  bg-white block ${
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
    </div>
  );
}
