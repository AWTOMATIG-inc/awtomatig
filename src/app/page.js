"use client";
import GridAnimatedBg from "@/components/animation/GridAnimatedBg";
import BlogTimeline from "@/components/home/BlogTimeline";
import EarphoneShowcase from "@/components/home/EarPhoneShowcase";
import FutureChanges from "@/components/home/FutureChanges";
import Hero from "@/components/home/Hero";
import KeepFlyingMarquee from "@/components/home/KeepFlyingMarquee";
import OurCapabilities from "@/components/home/OurCapabilities";
import OurProccess from "@/components/home/OurProccess";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <GridAnimatedBg>
        <Hero />
      </GridAnimatedBg>

      <WhyUs />
      <Services />
      <OurProccess />
      <EarphoneShowcase />
      <KeepFlyingMarquee />
      <FutureChanges />
      <OurCapabilities />
      <Testimonials />
      <BlogTimeline />
    </main>
  );
}
