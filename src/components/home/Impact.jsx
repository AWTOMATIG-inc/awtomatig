import CostEfficiencyCard from "../CostEfficiencyCard"

const data=[{id:1,title:"cost efficiency",subTitle:"18-32% reduction in operational costs",desc:"Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page"},{id:2,title:"cost efficiency",subTitle:"18-32% reduction in operational costs",desc:"Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page"},{id:3,title:"cost efficiency",subTitle:"18-32% reduction in operational costs",desc:"Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page"}]
export default function Impact() {
  return (
    <section className="container sm:mt-20 md:mt-40">
          <div className="wrapper">
            <div className="grid grid-cols-4 gap-4">
<CostEfficiencyCard/>
            
            {data.map((item)=><div key={item.id} className="border p-8 bg-black/50 backdrop-blur-xl blur-2xl">
                <div>
                    <h2>{item.title}</h2>
                    <h2>{item.subTitle}</h2>
                </div>
                <div>
                    <p>{item.desc}</p>
                </div>
            </div>)}
            </div>
          </div>
        </section>
  )
}
