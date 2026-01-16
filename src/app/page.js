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
import MarqueHighlightText from "@/components/MarqueHighlightText";
import Sponsor from "@/components/services/Sponsor";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <GridAnimatedBg>
        <Hero />
      </GridAnimatedBg>
      {/* <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <CardScroll />
      </section> */}
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <WhyUs />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">       
          <MarqueHighlightText
            marqueeText={[
              "/From growth pressure to structured momentum",
              "/From execution overload to scalable systems",
              "/From manual effort to intelligent flow",
            ]}
          />        
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <Services />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <OurProccess />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <EarphoneShowcase />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <KeepFlyingMarquee />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <FutureChanges />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <OurCapabilities />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <Testimonials />
      </section>
      <section className="mt-14 sm:mt-16 md:mt-20 lg:mt-32">
        <BlogTimeline />
      </section>

      <section className="my-14 sm:my-16 md:my-20 lg:my-32">
        <Sponsor />
      </section>
    </main>
  );
}
