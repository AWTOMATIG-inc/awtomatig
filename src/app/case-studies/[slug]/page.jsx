import { caseStudies } from "@/contants/case-studies";
import Image from "next/image";

export default async function SingleCaseStudies({ params }) {
  const { slug } = await params;
  const singleCaseStudies = caseStudies.find((item) => item.slug === slug);
  return (
    <main className="">
      <section className="container">
        <div className="max-w-[1200px] mx-auto mt-32">
            <Image src={singleCaseStudies.banner} alt={singleCaseStudies.slug} className="w-full h-[789px] object-cover"/>
        </div>
      </section>
      <section>
        <div>
          <h1>Overview</h1>
        <p>About This Project</p>  
        </div>
        <hr /> 
        <div>
            <h2>Project Summary</h2>
            <p>{singleCaseStudies.summary}</p>
        </div>
        
      </section>
    </main>
  );
}
