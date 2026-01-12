import Image from "next/image";
import Marquee from "react-fast-marquee";
const sponsorLogos = [
  "/images/sponsor/sponsor1.png",
  "/images/sponsor/sponsor2.png",
  "/images/sponsor/sponsor3.png",
  "/images/sponsor/sponsor4.png",
  "/images/sponsor/sponsor5.png",
  "/images/sponsor/sponsor6.png",
];
export default function Testimonials() {
  return (
    <section className=" mt-20">
      <div className="text-center">
        <h5>[ Testimonials ]</h5>
        <h1 className="font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold mt-8 leading-[48px]">
          Trusted By Leading Companies
        </h1>
        <p className="mt-8 text-lg">
          Join innovative global businesses offering industry-leading <br />{" "}
          employee benefits with Nexros.
        </p>
      </div>
      <div className=" py-8">
        <Marquee speed={50} gradient={false} autoFill={true}>
          {sponsorLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[250px] h-[150px] lg:w-[250px] lg:h-[250px] max-w-[293px] max-h-[293px] bg-white/10 backdrop-blur-[215.4px]
shadow-[15px_19px_44.5px_-27px_#8A38F5_inset,-15px_-19px_44.5px_-27px_#FFFFFF40_inset,-2px_0px_8.4px_0px_#02D5E8]  rounded-4xl mr-8 my-5 grid place-items-center"
            >
              <Image
                src={logo}
                alt=""
                width={200}
                height={200}
                className="w-[150px] lg:w-full h-auto p-8 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
