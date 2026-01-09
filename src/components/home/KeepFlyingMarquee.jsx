import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const marqueeLogos = [
  "/images/tech/airtable.png",
  "/images/tech/HubSpot.png",
  "/images/tech/Mailchimp.png",
  "/images/tech/make-seeklogo.png",
  "/images/tech/MondayCom.png",
  "/images/tech/n8n.png",
  "/images/tech/next-js.png",
  "/images/tech/node-js.png",
  "/images/tech/tailwind-css.png",
  "/images/tech/notion.png",
  "/images/tech/Salesforce.png",
  "/images/tech/sendgrid.png",
  "/images/tech/trello.png",
  "/images/tech/twilio.png",
  "/images/tech/zapier.png",
];
export default function KeepFlyingMarquee() {
  return (
    <section className="container pt-10 md:pt-10">
      <div className="wrapper bg-[#201F1FAD] flex flex-col lg:flex-row items-center  gap-8 text-black px-12 lg:px-20 py-9 rounded-xl mt-8 min-h-[296px] shadow-[0px_4px_18.5px_0px_#02D5E8]">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-russo-one w-full min-w-[550px] text-center lg:text-left bg-linear-to-r from-white to-[#02D5E8] bg-clip-text text-transparent to-50% ">
          Keep flying with <br /> your favorite service
        </h1>
        {/* <div className="w-full overflow-hidden">
          <Marquee speed={50} gradient={false} autoFill={true}>
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
          </Marquee>
        </div> */}
        <div className="w-full overflow-hidden">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
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
                      className="w-[150px] h-auto mx-8 object-contain absolute top-1/2 -translate-y-1/2 left-0"
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
    </section>
  );
}
