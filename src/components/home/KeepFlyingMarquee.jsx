import awtomatig_logo from "@/assets/logo/awtomatig-logo.png";
import Image from "next/image";
import Marquee from "react-fast-marquee";
export default function KeepFlyingMarquee() {
  return (
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
  );
}
