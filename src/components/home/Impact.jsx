import CommonHeading from "../CommonHeading";

const data = [
  {
    id: 1,
    title: "Operational Speed",
    subTitle: "2–4× faster task execution",
    desc: "Processes that previously required multiple follow-ups and approvals were redesigned into clear, system-driven flows. Daily tasks completed in hours instead of days. Fewer internal blockers Clear ownership at every step",
  },
  {
    id: 2,
    title: "Website & Conversion",
    subTitle: "20–55% improvement in conversion rates",
    desc: "After rebuilding websites and platforms with performance, clarity, and user flow in mind, clients saw measurable increases in engagement and conversions. Faster load times Cleaner navigation and CTAs Reduced friction in key journeys",
  },
  {
    id: 3,
    title: "Data & System Reliability",
    subTitle: "40–60% fewer data and system issues",
    desc: "With QA layers, monitoring, and validation processes in place, clients reported significantly fewer reporting errors, broken workflows, and system interruptions. Most issues were identified early — often before impacting customers or revenue.",
  },
  {
    id: 4,
    title: "Scalable Growth",
    subTitle: "Handled 2–3× volume without adding headcount",
    desc: "As order volume, leads, or data loads increased, systems absorbed the pressure without requiring proportional team growth.Automation and structure carried the load — not more people.",
  },
];
export default function Impact() {
  return (
    <section className="container relative z-10">
      <div className="wrapper">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <CommonHeading title="Impact">
            Measured improvements across <br /> operations, systems, and growth
          </CommonHeading>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="impact-card relative min-h-[451px]  rounded-lg "
            >
              <div className="absolute inset-1.5 rounded-lg  flex flex-col justify-center  p-8  bg-black overflow-hidden">
                <span className="size-[140px] blur-[80px]  bg-[#02D5E8] absolute top-10 left-10 impact-top-glow"></span>
                <span className="size-[150px] blur-[60px]  bg-[#2B388D] absolute bottom-0 right-10 impact-bottom-glow"></span>
                <span></span>
                <div className="relative z-10 font-russo-one text-[19.1px]">
                  <h2>{item.title}</h2>
                  <h2 className="text-teal mt-3">{item.subTitle}</h2>
                </div>
                <div className="relative z-10 mt-12 border-l border-teal pl-4 font-inter text-sm">
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
