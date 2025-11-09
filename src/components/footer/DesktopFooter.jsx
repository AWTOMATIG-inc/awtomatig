import awtomatig_logo from "@/assets/logo/awtomatig-full-logo.png";
import sinceText from "@/assets/logo/since-text.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function DesktopFooter() {
  return (
    <footer
      className="hidden sm:block container relative bg-[#201F1F78]  min-h-[668px] shadow-[0px_4px_18.5px_0px_rgba(2,_213,_232,_1)]
 rounded-[45px] py-16 mb-6 overflow-hidden"
    >
      <div>
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
      </div>

      <div className="wrapper">
        <div className="flex justify-between items-center">
          <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-[linear-gradient(90deg,_#FFFFFF_0%,_#02D5E8_100%)] text-transparent bg-clip-text">
            It’s blow your mind! <br />
            Meet Neural Networks
          </h1>
          <button className="flex gap-x-1 border px-6 py-2 rounded-xl hover:border-teal hover:text-teal hoverEffect">
            <span>Get a quote</span>
            <Icon icon="humbleicons:arrow-right-up" width="24" height="24" />
          </button>
        </div>
        <hr className="mt-20 mb-16" />
        <div className="grid grid-cols-[4fr_1fr]">
          <div>
            <div>
              <Image
                src={awtomatig_logo}
                width={238}
                height={80}
                className="w-[210px] md:w-full max-w-[238px] h-auto"
                alt="Awtomatig Logo"
              />
              <div className="flex items-center gap-x-8 mt-8">
                <a href="">
                  <Icon icon="ic:baseline-facebook" width="25" height="25" />
                </a>
                <a href="">
                  <Icon icon="prime:twitter" width="19" height="19" />
                </a>
                <a href="">
                  <Icon icon="mdi:linkedin" width="25" height="25" />
                </a>
                <a href="">
                  <Icon icon="mdi:youtube" width="26" height="26" />
                </a>
              </div>
            </div>
            <div className="mt-10">
              <Image src={sinceText} width={695} height={106} alt="text-logo" />
            </div>

            {/* <h1 className="relative text-[80px] font-extrabold text-white uppercase gradient-border">
              since 2022
            </h1> */}
          </div>
          <div className="flex justify-between">
            <div className="text-right">
              <h1 className="font-semibold text-xl mb-2">Company</h1>
              <div className="flex flex-col gap-y-5 text-sm mt-6">
                <Link href="/about">About</Link>
                <Link href="/about">Expertise</Link>
                <Link href="/about">Sustainability</Link>
                <Link href="/about">News & Media</Link>
                <Link href="/about">Case Studies</Link>
                <Link href="/about">Contacts</Link>
              </div>
            </div>
            <div className="text-right">
              <h1 className="font-semibold text-xl mb-2">Services</h1>
              <div className="flex flex-col gap-y-5 text-sm mt-6">
                <Link href="/about">Air Freight</Link>
                <Link href="/about">Sea Freight</Link>
                <Link href="/about">Land</Link>
                <Link href="/about">Groupage</Link>
                <Link href="/about">Consultancy</Link>
                <Link href="/about">Value Added Services</Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-16 text-center text-sm font-medium relative z-10">
          <p>Copyright @ AWTOMATIG 2025. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
