import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const marqueeLogos = [
  "/images/tech/airtable.png",
  "/images/tech/HubSpot.png",
  "/images/tech/make-seeklogo.png",
  "/images/tech/MondayCom.png",
  "/images/tech/n8n.png",
  "/images/tech/node-js.png",
  "/images/tech/tailwind-css.png",
  "/images/tech/notion.png",
  "/images/tech/sendgrid.png",
  "/images/tech/trello.png",
  "/images/tech/twilio.png",
  "/images/tech/zapier.png",
  "/images/tech/Salesforce.png",
  "/images/tech/Mailchimp.png",
  "/images/tech/next-js.png",
];
export default function KeepFlyingMarquee() {
  return (
    <div className="container">
      <div className="wrapper bg-[#02D5E8] flex flex-col lg:flex-row items-center  gap-8 text-black px-6 sm:px-12 lg:px-20 py-9 rounded-xl mt-8 min-h-[296px] shadow-[0px_4px_18.5px_0px_#02D5E8]">
        <h1 className="text-3xl md:text-4xl xl:text-[44px] font-russo-one w-full sm:min-w-[600px] text-center lg:text-left text-black leading-13">
          Keep flying. We stabilize <br className="hidden sm:block" /> what’s
          underneath.
        </h1>

        <div className="w-full overflow-hidden">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
             
            }}
            loop={true}
            autoHeight={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            modules={[Autoplay]}
          >
            {marqueeLogos?.map((logo, id) => {
              return (
                <SwiperSlide key={id}>
                  <div className="h-[150px]  relative">
                    <Image
                      key={id}
                      src={logo}
                      width={150}
                      height={150}
                      alt="logo"
                      className={`h-auto mx-8 object-contain absolute top-1/2 -translate-y-1/2 left-0 ${
                        marqueeLogos.length === id + 1
                          ? "w-[100px]"
                          : "w-[150px]"
                      }`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* <Marquee speed={50} gradient={false} autoFill={true}>
            {marqueeLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                width={150}
                height={150}
                alt="logo"
                className="w-[150px] h-auto mx-8 object-contain"
              />
            ))}
          </Marquee> */}
        </div>
      </div>
    </div>
  );
}
