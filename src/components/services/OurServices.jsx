"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function OurService() {
  const sectionRef = useRef(null);
  const sidebarRef = useRef(null);
  const boxesRef = useRef(null);
  const handleClick = (value) => {
    const section = document.getElementById(value);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const sidebar = sidebarRef.current;
    const boxes = boxesRef.current;

    // Correct end value
    const endValue = boxes.scrollHeight - section.offsetHeight;

    // Fix: Prevent negative values (if boxes shorter than section)
    const finalEnd = Math.max(endValue, 0);

    // PIN SIDEBAR
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: finalEnd,
      pin: sidebar,
      pinSpacing: false,
      scrub: true,
    });

    // SCROLLING CONTENT
    gsap.to(boxes, {
      y: -finalEnd,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: finalEnd,
        scrub: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);
  useEffect(() => {
    const section = sectionRef.current;
    const sidebar = sidebarRef.current;
    const handleResize = (e) => {
      if (window.scrollY > section.offsetHeight + 300) {
        sidebar.classList.add("hidden");
      } else {
        sidebar.classList.remove("hidden");
      }
    };
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);
  return (
    <section className="container mt-20" ref={sectionRef}>
      <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
        <div>
          <h5 className="font-inter">[ OUR SERVICES ]</h5>
          <h1 className="font-russo-one text-2xl lg:text-3xl xl:text-4xl  mt-8 leading-[48px]">
            Powerful AI Features and Advanced Tools Built <br />
            for Your Long-Term Business Succes
          </h1>
        </div>
        <div className="grid md:grid-cols-[300px_1fr] gap-20 mt-20 ">
          <aside ref={sidebarRef} className="relative">
            <span className="absolute top-0 size-[400px]  bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] rounded-full block  blur-[150px]"></span>
            <ul className="font-bold space-y-3 mt-12 transition-all duration-500 relative z-10">
              <li>
                <button
                  className="py-3 border-b w-full text-left"
                  onClick={() => handleClick("chatbot-1")}
                >
                  Custom AI Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("chatbot-2")}
                  className="py-3 border-b w-full text-left"
                >
                  Smart Analytics Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("chatbot-3")}
                  className="py-3 border-b w-full text-left"
                >
                  Workflow Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("chatbot-4")}
                  className="py-3 border-b w-full text-left"
                >
                  Smart Analytics Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("chatbot-5")}
                  className="py-3 border-b w-full text-left"
                >
                  Workflow Automation
                </button>
              </li>
            </ul>
          </aside>

          <div ref={boxesRef}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="mb-20"
                id={"chatbot-" + (Number(index) + 1)}
              >
                {/* <div>
                  <h1 className="font-extrabold text-2xl">
                    Custom AI Chatbots
                  </h1>
                  <p className="font-medium mt-5">
                    Deploy intelligent conversational agents that understand
                    context, learn from interactions, and provide personalized
                    responses to enhance customer experience and support.
                  </p>
                </div> */}
                <div>
                  <div
                    className="bg-linear-90 from-teal to-white rounded-2xl p-1.5  mt-10 shadow-[-4px_10px_33.9px_0px_#FFFFFF87] ]
"
                  >
                    <div className="bg-white text-black px-4 pt-4 pb-8  rounded-xl">
                      <h1 className="font-russo-one text-xl pb-4">
                        A2 chatbot settings
                      </h1>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="border border-dark-3 p-4 rounded-xl group hover:bg-dark-2/30 hover:border-transparent group-active:bg-dark-3 transition-colors duration-300 cursor-pointer h-[286px]">
                          <h2 className="font-bold font-inter mt-2">
                            Natural Language
                          </h2>
                          <p className="mt-2 text-sm  font-montserrat ">
                            Send funds at a regular frequency.
                          </p>
                        </div>
                        <div className="border  p-4 rounded-xl group bg-dark-2/30 border-transparent transition-colors duration-300 cursor-pointer h-[286px]">
                          <h2 className="font-bold font-inter mt-2">
                            Smart Learning
                          </h2>
                          <p className="mt-2 text-sm  font-montserrat ">
                            Providing personalized experiences
                          </p>
                        </div>
                        <div className="border border-dark-3 p-4 rounded-xl group hover:bg-dark-2/30 hover:border-transparent transition-colors duration-300 cursor-pointer h-[286px]">
                          <h2 className="font-bold font-inter mt-2">
                            Seamless Human Handoff
                          </h2>
                          <p className="mt-2 text-sm  font-montserrat ">
                            Easily connect with a human when needed.
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex justify-between gap-6 mt-8">
                        <button className="border w-full rounded-lg py-2 font-semibold capitalize">
                          close
                        </button>
                        <button className="border w-full rounded-lg py-2 font-semibold capitalize bg-dark-2 text-white">
                          submit
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
