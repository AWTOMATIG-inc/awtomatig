"use client";
import cookieIcon from "@/assets/logo/cookie.png";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function CookiePopup() {
  const [isShowCookie, setisShowCookie] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (cookieAccepted === "true") {
      setisShowCookie(false);
    }
  }, []);
  if (!isShowCookie) {
    return null;
  }

  return (
    <div className="bg-[#4C4A4A5E] fixed top-0 left-0 w-full h-screen z-999">
      <div className="bg-[#02D5E8] fixed bottom-0 left-0 w-full h-80 lg:h-28 shadow-[0px_4px_19.6px_4px_#00000040_inset] border-t-8 border-[#D9D9D9] text-black font-bold pt-4 text-center ">
        <Image
          src={cookieIcon}
          alt="Cookie Icon"
          width={200}
          height={200}
          className="lg:absolute left-50 transform lg:-translate-x-1/2 -top-10 md:-top-16 mx-auto"
        />
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-5">
          <p>Our website uses cookirs to enhance your browsing experience.</p>
          <button
            onClick={() =>
              localStorage.setItem("cookieAccepted", "true") ||
              setisShowCookie(false)
            }
            className="bg-white px-4 py-1 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
