import GridAnimatedBg from "@/components/animation/GridAnimatedBg";
import BlogTimeline from "@/components/home/BlogTimeline";
import FutureChanges from "@/components/home/FutureChanges";
import Hero from "@/components/home/Hero";
import Impact from "@/components/home/Impact";
import KeepFlyingMarquee from "@/components/home/KeepFlyingMarquee";
import OurCapabilities from "@/components/home/OurCapabilities";
import OurProccess from "@/components/home/OurProccess";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import MarqueHighlightText from "@/components/MarqueHighlightText";
import Sponsor from "@/components/services/Sponsor";

export const metadata = {
  title: "Business Automation, Operations & Web Development Agency",
  description:
    "Your extended tech and operations team without the overhead. We build custom web platforms, automate AI workflows, implement ERPNext, and manage back-office operations. Founder-led since 2022.",
  alternates: { canonical: "https://awtomatig.com" },
  openGraph: {
    url: "https://awtomatig.com",
    title: "Awtomatig — Business Automation, Operations & Web Development Agency",
    description:
      "Your extended tech and operations team without the overhead. Custom web platforms, AI automation, ERPNext, and back-office management.",
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <GridAnimatedBg>
        <Hero />
      </GridAnimatedBg>
      
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
        <Impact />
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
