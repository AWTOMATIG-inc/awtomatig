"use client";
import card_bg from "@/assets/home/card-bg.webp";
import earphone from "@/assets/home/earphone.png";
import glove_card from "@/assets/home/glove-card.webp";
import laptopBg from "@/assets/home/laptop.webp";
import Image from "next/image";
import { useRef } from "react";

export default function EarphoneShowcase() {
  const cardRef = useRef(null);
  const handleHover = (e) => {
    const cardWrapper = cardRef.current;
    if (!cardWrapper) return;
    cardWrapper.childNodes.forEach((element) => {
      console.log(element.classList.remove("active-earphone"));
    });

    e.currentTarget.classList.add("active-earphone");
  };
  return (
    <section className="container mt-20 md:mt-52 z-1 relative">
      <div className=" sm:hidden text-center sm:text-left mb-8">
        <h5 className="text-montserrat uppercase">[ Why Us ]</h5>
        <h1 className="font-press-start text-2xl lg:text-3xl mt-8 ">
          Unique, ownable <br />
          intelligence
        </h1>
      </div>
      <div
        className="wrapper flex gap-5 text-center sm:text-left"
        ref={cardRef}
      >
        <div
          className="relative rounded-2xl overflow-hidden earphone-card"
          onMouseOver={handleHover}
        >
          <Image
            src={card_bg}
            width={666}
            height={499}
            alt="card"
            className="w-full h-full object-cover"
          />
          <Image
            src={earphone}
            width={659}
            height={471}
            alt="card"
            className="earphone object-cover absolute top-1/2 left-1/2 -translate-1/2"
          />
        </div>
        <div
          className="bg-[linear-gradient(149.96deg,_#FFFFFF_3.15%,_#02D5E8_99.07%)] text-black rounded-2xl p-8  relative earphone-card active-earphone"
          onMouseOver={handleHover}
        >
          <Image
            src={glove_card}
            width={177}
            height={181}
            alt="card"
            className="w-[140px] h-[140px] object-cover absolute bottom-0 right-0"
          />
          <Image
            src={earphone}
            width={659}
            height={471}
            alt="card"
            className="earphone object-cover absolute top-1/2 left-1/2 -translate-1/2"
          />
        </div>
        <div
          className="rounded-2xl p-8 relative  bg-black earphone-card"
          onMouseOver={handleHover}
        >
          <Image
            src={earphone}
            width={666}
            height={499}
            alt="card"
            className="earphone object-cover absolute top-1/2 left-1/2 -translate-1/2"
          />
        </div>
        <div
          className="relative  rounded-2xl overflow-hidden earphone-card"
          onMouseOver={handleHover}
        >
          <Image
            src={laptopBg}
            width={177}
            height={181}
            alt="card"
            className="w-[659px] h-[471px] object-cover"
          />
          <Image
            src={earphone}
            width={659}
            height={471}
            alt="card"
            className="earphone object-cover absolute top-1/2 left-1/2 -translate-1/2"
          />
        </div>
        <div
          className="bg-[radial-gradient(50%_50%_at_50%_50%,_#D9D9D9_0%,_#FFFBCE_100%)]
rounded-2xl p-8 relative bg-black earphone-card "
          onMouseOver={handleHover}
        >
          <Image
            src={earphone}
            width={659}
            height={471}
            alt="card"
            className="earphone object-cover absolute top-1/2 left-1/2 -translate-1/2"
          />
        </div>
      </div>
    </section>
  );
}
