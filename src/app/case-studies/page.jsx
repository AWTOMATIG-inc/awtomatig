import churassco_laptop from "@/assets/case-studies/churassco-laptop.webp";
import fabusiness_laptop from "@/assets/case-studies/fa-business-laptop.webp";
import royal_safari_laptop from "@/assets/case-studies/royal-safari-laptop.webp";
import Image from "next/image";
import Link from "next/link";
export default function CaseStudies() {
  return (
    <main className="overflow-hidden relative">
        <span className="bg-[#B66DD2] size-[570px] block absolute rounded-full blur-[254px] top-72 -right-20"></span>
        <span className="bg-linear-to-r from-[#02D5E8] to-[#033267] size-[870px] block absolute rounded-full blur-[360px]  top-20 -left-20 "></span>
      <section className="container pt-36 md:pt-40 relative z-10">
        <div className="wrapper flex flex-col lg:flex-row gap-6 sm:gap-8 text-center lg:text-left">
          <h1 className="flex-1 text-4xl sm:text-5xl  xl:text-6xl font-russo-one uppercase">
            Select Work
          </h1>
          <p className="flex-1 font-montserrat uppercase leading-[160%] text-sm sm:text-base">
            We work closely with our clients to create unique projects that take
            their business to the next level. You can check out some of our
            projects, each catered to the brand's needs.
          </p>
        </div>
      </section>
      <section className="container my-20 relative z-10">
        <div className="wrapper">
            <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
          <Link href="/case-studies/churassco">
            <Image src={churassco_laptop} alt="churassco" className="rounded-sm" />
          </Link>
          <Link href="/case-studies/royal-safari">
            <Image src={royal_safari_laptop} alt="royal_safari" className="rounded-sm" />
          </Link>
        </div>
        <Link href="/case-studies/fabusiness" className="mx-auto block w-fit mt-6 md:mt-10">
          <Image src={fabusiness_laptop} alt="fabusiness" className="rounded-sm sm:w-[400px] md:w-[600px] lg:w-[879px]" />
        </Link>
        </div>
        
      </section>
    </main>
  );
}
