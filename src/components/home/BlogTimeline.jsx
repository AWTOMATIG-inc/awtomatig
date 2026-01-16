import ArticleBar from "@/components/ArticleBar";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
const blogData=[
  {
    id:1,
    date:{
      month:"January",
      day:"5",
      year:"26"
     }
      ,
    theme:"AI",
    name:"What 1 Million Queries Actually Cost",
    link:"https://www.linkedin.com/feed/update/urn:li:activity:7413912290384646144"
  },
  {
    id:2,
    date:{
      month:"December",
      day:"22",
      year:"25"
     },
    theme:"AI",
    name:"The Myth of Cheap AI",
    link:"https://www.linkedin.com/feed/update/urn:li:activity:7408823743042531328"
  },
  {
    id:3,
    date:{
      month:"December",
      day:"8",
      year:"25"
     },
    theme:"Market Insight",
    name:"RAM Reckoninh 2025",
    link:"https://www.linkedin.com/feed/update/urn:li:activity:7403750197694296064"
  },
  {
    id:4,
    date:{
      month:"November",
      day:"24",
      year:"25"
     },
    theme:"AI",
    name:"Beyond Multimodal: Gemini 3",
    link:"https://www.linkedin.com/feed/update/urn:li:activity:7398676850530533376"
  }
]
export default function BlogTimeline() {
  return (
    <div className="container relative">
      <div className="wrapper">
        <div className="">
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 text-center md:text-left items-center justify-between relative z-10">
            <FadeInSection
              initial={{ opacity: 0, x: -150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: -150 }}
              margin="40px 0px -40px 0px"
            >
              <CommonHeading title="Insights">
                Practical insights from <br /> real systems, explore Ideas
              </CommonHeading>
            </FadeInSection>
            <FadeInSection
              initial={{ opacity: 0, x: 150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: 150 }}
              margin="40px 0px -40px 0px"
            >
              <a
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7362829025410519043"
                target="_blank"
              >
                <AnimatedButton
                  name="Read Insights"
                  width="w-[210px]"
                  icon={true}
                />
              </a>
            </FadeInSection>
          </div>
          <div className="hidden md:block">
            <div className="w-[1060px] h-[470px] hidden md:block absolute left-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] blur-[200px] ">
              <div className="relative h-full w-full">
                <span className="bg-purple w-[600px] h-[300px] block rounded-[100%]  absolute left-1/2 top-1/2 -translate-1/2"></span>
              </div>
            </div>
            <span className="w-[1060px] h-[470px] block absolute right-[-15%] top-0 rounded-[50%] bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] blur-[200px]"></span>
          </div>
        </div>

        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
        >
          <div className="max-w-[1114px] ml-auto mt-10 md:mt-20 relative z-10">
            {blogData.map(blog=><ArticleBar key={blog.id} blog={blog}/>)}
            
           
          </div>
        </FadeInSection>

        {/* <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-10 md:py-20 relative z-10 gap-3 gap-y-8">
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
        </div> */}
      </div>
    </div>
  );
}
