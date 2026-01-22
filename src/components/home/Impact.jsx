
const data = [
  {
    id: 1,
    title: "cost efficiency",
    subTitle: "18-32% reduction in operational costs",
    desc: "Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page",
  },
  {
    id: 2,
    title: "cost efficiency",
    subTitle: "18-32% reduction in operational costs",
    desc: "Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page",
  },
  {
    id: 3,
    title: "cost efficiency",
    subTitle: "18-32% reduction in operational costs",
    desc: "Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page",
  },
];
export default function Impact() {
  return (
    <section className="container sm:mt-20 md:mt-40 relative z-10">
      <div className="wrapper">
        <div className="grid grid-cols-2 lg:grid-cols-3  gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="impact-card relative h-[451px] w-[325px] rounded-lg "
            >
              
              <div className="absolute inset-1.5 rounded-lg  flex flex-col justify-between p-2  bg-black">
               <span className="size-[150px] blur-[60px]  bg-[#02D5E8] absolute top-10 left-10"></span>
               <span className="size-[150px] blur-[60px]  bg-[#2B388D] absolute bottom-0 right-10"></span>
               <span></span>
              <div className="relative z-10">
                <h2>{item.title}</h2>
                <h2>{item.subTitle}</h2>
              </div>
              <div className="relative z-10">
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
