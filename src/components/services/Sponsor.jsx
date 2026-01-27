import Image from "next/image";
import Marquee from "react-fast-marquee";
import CommonHeading from "../CommonHeading";
const sponsorLogos = [
  "/images/sponsor/partner-1.png",
  "/images/sponsor/partner-2.png",
  "/images/sponsor/partner-3.png",
  "/images/sponsor/partner-4.png",
  "/images/sponsor/partner-5.png",
  "/images/sponsor/partner-6.png",
  "/images/sponsor/partner-7.png",  
];
export default function Sponsor() {
  return (
    <div>
      <div className="container ">
        <div className="wrapper">
          <CommonHeading title="Partners">
            Trusted By Leading Companies
          </CommonHeading>
        </div>
      </div>
      <div className="md:py-8 mt-14">
        <Marquee speed={50} gradient={false} autoFill={true}>
          {sponsorLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[200px] h-[130px] sm:w-[250px] sm:h-[180px] lg:w-[250px] lg:h-[250px] max-w-[293px] max-h-[293px] bg-[#000000] shadow-[15px_19px_44.5px_-27px_#8A38F5]  rounded-4xl mr-8 my-5 grid place-items-center"
            >
              <Image
                src={logo}
                alt="sponsor"
                width={200}
                height={200}
                className={`h-auto p-8 object-contain ${index==4?"w-[70%] lg:w-[80%] xl:w-[90%]":"w-full"}`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
