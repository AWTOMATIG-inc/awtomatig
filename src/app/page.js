"use client";
import BlogTimeline from "@/components/home/BlogTimeline";
import FutureChanges from "@/components/home/FutureChanges";
import Hero from "@/components/home/Hero";
import KeepFlyingMarquee from "@/components/home/KeepFlyingMarquee";
import OurCapabilities from "@/components/home/OurCapabilities";
import OurProccess from "@/components/home/OurProccess";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import ThreeBoxes from "@/components/home/ThreeBoxes";
import WhyUs from "@/components/home/WhyUs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-home-banners overflow-hidden">
      <Image
        src={"/images/banners/home-banner.webp"}
        alt="aside_image"
        width={2500}
        height={772}
        className="absolute left-0 w-full h-full "
      />

      <Hero />
      <WhyUs />
      <Services />
      <OurProccess />
      <ThreeBoxes />
      <KeepFlyingMarquee />
      <FutureChanges />
      <OurCapabilities />
      <Testimonials />
      <BlogTimeline />
    </main>
  );
}
