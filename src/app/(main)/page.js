import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

// Below-the-fold sections: code-split out of the route's initial JS instead
// of importing eagerly at module top-level (still server-rendered, so
// there's no content flash or SEO loss) — shrinks the hydration payload the
// browser has to process on first load (see task.md TASK-13).
const WhyUs = dynamic(() => import("@/components/home/WhyUs"));
const MarqueHighlightText = dynamic(() => import("@/components/MarqueHighlightText"));
const Services = dynamic(() => import("@/components/home/Services"));
const OurProccess = dynamic(() => import("@/components/home/OurProccess"));
const Impact = dynamic(() => import("@/components/home/Impact"));
const KeepFlyingMarquee = dynamic(() => import("@/components/home/KeepFlyingMarquee"));
const FutureChanges = dynamic(() => import("@/components/home/FutureChanges"));
const OurCapabilities = dynamic(() => import("@/components/home/OurCapabilities"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const BlogTimeline = dynamic(() => import("@/components/home/BlogTimeline"));
const Sponsor = dynamic(() => import("@/components/services/Sponsor"));

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
    <main className="overflow-x-clip">
      <Hero />
      
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
