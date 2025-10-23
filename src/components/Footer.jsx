import awtomatig_logo from "@/assets/logo/awtomatig-full-logo.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="container relative">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 py-12 relative z-10">
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

        <div>
          <h1 className="font-semibold text-xl mb-2">Address</h1>
          <p>Logico, USA, New York - 1060 Str. First Avenue 1</p>
        </div>
        <div>
          <h1 className="font-semibold text-xl mb-2">Say Hello</h1>
          <p>+ 800 350 84 31</p>
        </div>
      </div>
      <div className="border-t max-w-[1343px] mx-auto mt-10 py-6 text-center text-sm font-medium relative z-10">
        <p>Copyright @ AWTOMATIG 2025. All Rights Reserved.</p>
      </div>

      <div className="hidden md:block">
        <div className="w-[900px] h-[570px] block absolute left-[-10%] bottom-[-10%] rounded-t-full bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_60.4%)] blur-[160px]">
          <div className="relative h-full w-full">
            <span className="bg-purple size-[320px] block rounded-[100%] absolute left-[10%] top-[40%] "></span>
          </div>
        </div>
        <span className="w-[1460px] h-[370px] block absolute right-[-10%] bottom-[-15%] rounded-[50%] bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_94.4%)] blur-[180px]"></span>
      </div>
    </footer>
  );
}
