import NotFound404 from "@/assets/404.png";
import awtomatig_logo from "@/assets/logo/awtomatig-full-logo.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function notFound() {
  return (
    <div className="hero-banner h-screen">
      <div className="container">
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <Image
            src={awtomatig_logo}
            width={238}
            height={80}
            className="w-[210px] md:w-full max-w-[238px] h-auto my-8"
            alt="Awtomatig Logo"
          />
          <Image src={NotFound404} width={604} height={276} alt="404" />
          <h1 className="font-bold text-7xl my-4">Oooops! Page not found</h1>
          <p className="text-center">
            You are here because you entered the address of a page that no
            longer exists <br /> or has been moved to a different address
          </p>
          <Link
            href={"/"}
            className="flex border gap-2 items-center px-4 py-2 font-bold rounded-md"
          >
            <span>Home page</span>
            <Icon icon="humbleicons:arrow-right-up" width="24" height="24" />
          </Link>
          <div className="text-center mt-12 ">
            <div className="flex justify-center items-center gap-x-8">
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
            <p className="mt-8">
              Copyright @ AWTOMATIG 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
