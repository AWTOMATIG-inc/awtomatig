import awtomatig_logo from "@/assets/logo/awtomatig-full-logo.png";
import sinceText from "@/assets/logo/since-text.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
export default function Footer() {
  return (
    <footer className="container relative py-10">
      <FadeInSection
        initial={{ opacity: 0, y: 150 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: 150 }}
        margin="40px 0px -40px 0px"
      >
        {/* <div>
          <span className="bg-[#B66DD2C9] inline-block absolute size-[570px] -bottom-20 left-0 rounded-full blur-[220px] -z-1"></span>
          <span
            style={{
              background:
                "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
            }}
            className=" inline-block absolute size-[1145px]  -left-40 -top-40 rounded-full blur-[520px] -z-2"
          ></span>
          <span
            style={{
              background:
                "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
            }}
            className=" inline-block absolute size-[1145px]  -right-[30%] -top-40 rounded-full blur-[820px] "
          ></span>
        </div> */}

        <div className="wrapper relative z-9">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="font-russo-one text-3xl text-center md:text-left mb-8 md:mb-0 sm:text-4xl  lg:text-6xl  bg-[linear-gradient(90deg,#FFFFFF_0%,#02D5E8_100%)] text-transparent bg-clip-text leading-10 sm:leading-12 lg:leading-[61px]">
              Systems that work. <br />
              Results that last.
            </h1>
            <Link href="/contact">
              <AnimatedButton name="Get a quote" icon={true} />
            </Link>
          </div>
          <hr className="my-10 md:my-16 " />
          <div className="grid grid-cols-1 md:grid-cols-[4fr_3fr] lg:grid-cols-[4fr_2.5fr] xl:grid-cols-[4fr_1.5fr] justify-center lg:gap-x-10">
            <div>
              <div>
                <Image
                  src={awtomatig_logo}
                  width={238}
                  height={80}
                  className="w-[210px] md:w-full max-w-[238px] h-auto mx-auto  md:mx-0"
                  alt="Awtomatig Logo"
                />
                <div className="flex items-center justify-center md:justify-start gap-x-12.5 mt-8">
                  <a href="https://www.linkedin.com/company/awtomatig/" target="_blank">
                    <Icon icon="mdi:linkedin" width="25" height="25" />
                  </a>
                  <a href="https://x.com/awtomatig86939" target="_blank">
                    <Icon icon="prime:twitter" width="19" height="19" />
                  </a>

                  <a href="https://medium.com/@awtomatig" target="_blank">
                    <Icon icon="mingcute:medium-fill" width="26" height="26" />
                  </a>
                  <a href="https://www.instagram.com/awtomatig/" target="_blank">
                    <Icon icon="lets-icons:insta" width="25" height="25" />
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <Image
                  src={sinceText}
                  width={506}
                  height={77}
                  className="max-w-[506px] lg:w-full w-[300px] sm:w-[400px] mx-auto my-2 sm:my-6 md:my-0 md:mx-0"
                  alt="text-logo"
                />
              </div>

              {/* <h1 className="relative text-[80px] font-extrabold text-white uppercase gradient-border">
              since 2022
            </h1> */}
            </div>
            <div className="flex justify-center gap-x-16 sm:gap-x-36 md:gap-x-0 md:justify-between mt-10">
              <div className="text-center md:text-right">
                <h1 className=" md:text-xl mb-2 font-russo-one">USEFUL LIKS</h1>
                <div className="flex flex-col gap-y-5 text-sm mt-6 font-inter ">
                  <Link href="/services">Services</Link>
                  <Link href="/process">Process</Link>
                  <Link href="/contact">Contacts</Link>
                  <Link href="/case-studies">Case Studies</Link>
                  <Link href="/about-us">About Us</Link>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h1 className="font-russo-one  md:text-xl mb-2 uppercase">
                  Industries
                </h1>
                <div className="flex flex-col gap-y-5 text-sm mt-6 font-inter ">
                  <Link href="/about">Retail & eCommerce</Link>
                  <Link href="/about">Travel & Tourism</Link>
                  <Link href="/about">Food on Demand</Link>
                  <Link href="/about">Technology</Link>
                  <Link href="/about">SAAS</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="font-manrope mt-10 text-center text-sm font-medium relative z-10">
            <p>Copyright @ AWTOMATIG 2026. All Rights Reserved.</p>
          </div>
        </div>
      </FadeInSection>
    </footer>
  );
}
