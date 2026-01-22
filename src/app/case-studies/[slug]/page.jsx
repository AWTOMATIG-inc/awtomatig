import { caseStudies } from "@/contants/case-studies";
import Image from "next/image";
import React from "react";

export default async function SingleCaseStudies({ params }) {
  const { slug } = await params;
  const singleCaseStudies = caseStudies.find((item) => item.slug === slug);
  return (
    <main className="">
      <section className="container">
        <div className="max-w-[1200px] mx-auto mt-32">
          <Image
            src={singleCaseStudies.banner}
            alt={singleCaseStudies.slug}
            className="w-full h-auto lg:h-[500px] xl:h-[750px] object-cover"
          />
        </div>
      </section>
      <section className="container mt-10 sm:mt-14 lg:mt-20">
        <div className="max-w-[1200px] mx-auto">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-russo-one text-teal">Overview</h1>
            <p className="font-inter mt-2">About This Project</p>
          </div>
          <hr className="mt-5 mb-8" />
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Project Summary
            </h2>
            <p className="mt-5 font-inter md:text-xl">
              {singleCaseStudies.summary}
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Goal
            </h2>
            <p className="mt-5 font-inter md:text-xl">{singleCaseStudies.goal}</p>
          </div>
          <div className="mt-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Design Process
            </h2>
            <ul className=" mt-10">
              {singleCaseStudies.design_process.map((item) => (
                <li key={item.id}>
                  <span className="flex items-center pr-6 gap-2 border border-teal rounded-full w-fit">
                    <span className="bg-white size-10 lg:size-20 grid place-content-center text-black text-inter text-xl lg:text-2xl rounded-full">
                      {item.id}
                    </span>
                    <span className="font-inter font-semibold text-xl sm:text-2xl">
                      {item.name}
                    </span>
                  </span>
                  <p className="relative  lg:text-lg border-l-2 border-dotted ml-5 lg:ml-10 pl-12 lg:pl-20 py-10 before:border-t-2 before:border-dotted before:w-9 lg:before:w-18 before:h-full before:absolute before:top-1/2 before:left-0 ">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-russo-one text-teal">
                Style Guideline
              </h1>
              <p className="font-inter mt-2">
                Font using Arial for this project
              </p>
            </div>
            <hr className="mt-5 mb-8" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Colors
            </h2>
            <div>
              <p className="capitalize py-5">primary plate</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-8">
                {singleCaseStudies.colors.primary.map((color, cid) => (
                  <div key={cid}>
                    <div
                      style={{ backgroundColor: color }}
                      className={`max-w-[296px] w-full h-[100px] sm:h-[180px] rounded-lg ${color === "#000000" ? "border border-gray-300" : ""}`}
                    />
                    <p className="font-semibold font-inter text-lg mt-4">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="capitalize py-5">secondary plate</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-8">
                {singleCaseStudies.colors.secondary.map((color, cid) => (
                  <div key={cid}>
                    <div
                      style={{ backgroundColor: color }}
                      className={`max-w-[296px] w-full h-[100px] sm:h-[180px] rounded-lg ${color === "#000000" ? "border border-gray-300" : ""}`}
                    />
                    <p className="font-semibold font-inter text-lg mt-4">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-[1171px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Typography
            </h2>
            <div className="flex justify-between mt-8">
              <p className="capitalize ">Type</p>
              <p className="capitalize">Size</p>
            </div>
            <ul>
              {singleCaseStudies.typography.map((typography,index) => (
                <React.Fragment key={typography.id}>
                <li
                  style={{ fontSize: typography.size + "px" }}
                
                  className="hidden sm:flex justify-between  border-b py-10"
                >
                  <p className="font-inter">{typography.name}</p>
                  <span>{typography.size}</span>
                </li>
                <li
                  style={{ fontSize:index<1?typography.size-15 + "px":typography.size + "px" }}
                 
                  className="flex sm:hidden justify-between  border-b py-10"
                >
                  <p className="font-inter">{typography.name}</p>
                  <span>{typography.size}</span>
                </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="mt-20 max-w-[1171px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal">
              Buttons
            </h2>

            <div className="flex gap-8 mt-6">
              {singleCaseStudies.buttons.map((button, bid) => {
                if (button.type == "arrow") {
                  return (
                    <button
                      key={bid}
                      
                      className="flex items-center gap-8"
                    >
                      <svg
                        width="38"
                        height="15"
                        viewBox="0 0 38 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.292892 8.07039C-0.0976295 7.67986 -0.0976295 7.0467 0.292892 6.65617L6.65685 0.292213C7.04738 -0.0983109 7.68054 -0.0983109 8.07107 0.292213C8.46159 0.682738 8.46159 1.3159 8.07107 1.70643L2.41422 7.36328L8.07107 13.0201C8.46159 13.4107 8.46159 14.0438 8.07107 14.4343C7.68054 14.8249 7.04738 14.8249 6.65685 14.4343L0.292892 8.07039ZM38 7.36328V8.36328H1V7.36328V6.36328H38V7.36328Z"
                          fill="white"
                        />
                      </svg>
                      <svg
                        width="38"
                        height="15"
                        viewBox="0 0 38 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M37.7071 8.07039C38.0976 7.67986 38.0976 7.0467 37.7071 6.65617L31.3431 0.292213C30.9526 -0.0983109 30.3195 -0.0983109 29.9289 0.292213C29.5384 0.682738 29.5384 1.3159 29.9289 1.70643L35.5858 7.36328L29.9289 13.0201C29.5384 13.4107 29.5384 14.0438 29.9289 14.4343C30.3195 14.8249 30.9526 14.8249 31.3431 14.4343L37.7071 8.07039ZM0 7.36328V8.36328H37V7.36328V6.36328H0V7.36328Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={bid}
                      style={{
                        backgroundColor: button.bg,
                        border: button.border
                          ? `${button.border} 1px solid`
                          : "",
                      }}
                      className="h-[52px] w-40 rounded-md font-inter font-medium text-lg"
                    >
                      {button.name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <div className="max-w-[1200px] mx-auto ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal mb-8">
            Components
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-10">
            {singleCaseStudies.components.map((component, cid) => (
              <div key={cid} className="">
                <Image
                  src={component}
                  alt="component"
                  width={297}
                  height={384}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mt-10">
        <div className="max-w-[1200px] mx-auto ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal mb-6">
            Sitemap
          </h2>
          <Image
            src={singleCaseStudies.sitemap}
            alt={singleCaseStudies.slug}
            width={1200}
            height={10000}
            className="w-full h-full"
          />
        </div>
      </section>

      <section className="container mt-10">
        <div className="max-w-[1200px] mx-auto ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal mb-6">
            Wireframe
          </h2>
          <Image
            src={singleCaseStudies.wireframe}
            alt={singleCaseStudies.slug}
            width={1200}
            height={10000}
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="container my-10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-inter font-semibold text-teal mb-6">
            Website UI
          </h2>
          <Image
            src={singleCaseStudies.website}
            alt={singleCaseStudies.slug}
            width={1200}
            height={10000}
            className="w-full h-full"
          />
        </div>
      </section>
    </main>
  );
}
