import ArticleBar from "@/components/ArticleBar";
import FadeInSection from "../animation/FadeEffect";
export default function BlogTimeline() {
  return (
    <section className="container relative">
      <div className="wrapper">
        <div className="pt-14 md:py-20">
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 text-center md:text-left items-center justify-between relative z-10">
            <FadeInSection
              initial={{ opacity: 0, x: -150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: -150 }}
              margin="40px 0px -40px 0px"
            >
              <h5>[ blog ]</h5>
              <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-8">
                Useful articles
                <br />
                from our company
              </h1>
            </FadeInSection>
            <FadeInSection
              initial={{ opacity: 0, x: 150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: 150 }}
              margin="40px 0px -40px 0px"
            >
              <button className="border px-4 py-3 rounded-lg border-teal  hover:bg-teal/80 hoverEffect">
                Get started
              </button>
            </FadeInSection>
          </div>
          <div className="hidden md:block">
            <div className="w-[1060px] h-[470px] hidden md:block absolute left-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_94.4%)] blur-[200px] ">
              <div className="relative h-full w-full">
                <span className="bg-purple w-[600px] h-[300px] block rounded-[100%]  absolute left-1/2 top-1/2 -translate-1/2"></span>
              </div>
            </div>
            <span className="w-[1060px] h-[470px] block absolute right-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,_rgba(2,213,232,0.55)_18.02%,_rgba(3,50,103,0.55)_94.4%)] blur-[200px]"></span>
          </div>
        </div>

        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
        >
          <div className="max-w-[1114px] ml-auto mt-10 md:mt-20">
            <ArticleBar />
            <ArticleBar />
            <ArticleBar />
            <ArticleBar />
          </div>
        </FadeInSection>

        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-10 md:py-20 relative z-10 gap-3 gap-y-8">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-sora">
              Artificial Intellegance
              <br /> create digital future.
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, x: 150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: 150 }}
            margin="40px 0px -40px 0px"
          >
            <button className="text-xs md:text-lg lg:text-xl border size-[100px] md:size-[130px] lg:size-[173px] rounded-full capitalize px-2 hover:border-teal hover:text-teal hoverEffect">
              Get in touch
            </button>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
