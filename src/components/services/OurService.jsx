"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
const servicesCard = [
  {
    id: 1,
    headding: "Core Support Streamline",
    box1: {
      heading: "Streamline Your Core Administrative Functions",
      desc: "We manage the day-to-day tasks that keep your business running reliably. From administrative execution to documentation, we ensure your operations never depend on memory or urgency.",
    },
    box2: {
      heading: "Enhance Accuracy Through Structured Workflows",
      desc: "Our team implements rigorous task coordination and follow-up protocols. By organizing your internal processes, we eliminate bottlenecks and ensure nothing critical falls through the cracks.",
    },
    box3: {
      heading: "Scale Your Business Without Overhead",
      desc: "Outsource your operational heavy lifting to allow your core team to focus on growth. We provide the reliable support needed to maintain stability while you expand your market reach.",
    },
  },
  {
    id: 2,
    headding: "Smart Architecture Systems",
    box1: {
      heading: "Systems Designed For Real-World Performance ",
      desc: "We configure structured CRM systems that reflect how your team actually works. By aligning pipelines and ownership rules, we ensure work flows clearly from one stage to the next.",
    },
    box2: {
      heading: "Eliminate Confusion with Clear Reporting",
      desc: "Gain full visibility into your sales and operational funnels with custom reporting tools. We build the dashboards you need to make data-driven decisions without the manual guesswork.",
    },
    box3: {
      heading: "Automate Handoffs for Better Efficiency",
      desc: "Bridge the gap between departments with seamless internal workflows. Our configurations ensure that communication is instant and every team member knows exactly what their next step is.",
    },
  },
  {
    id: 3,
    headding: "Rapid Optimization",
    box1: {
      heading: "Redesign Manual Processes for Speed",
      desc: "We identify repetitive tasks and replace them with intelligent, AI-assisted workflows. By connecting your favorite tools, we help your team save hundreds of hours every month.",
    },
    box2: {
      heading: "Reduce Human Error with Technology",
      desc: "Minimize the risks associated with manual data entry and handoffs. Our automation solutions provide a consistent, error-free environment that maintains high standards of output.",
    },
    box3: {
      heading: "Future-Proof Your Scalable Operations",
      desc: "Leverage cutting-edge AI to grow your business without adding unnecessary headcount. Our custom automations allow you to handle increased volume while keeping your operational costs low.",
    },
  },
  {
    id: 4,
    headding: "Centralized Control System",
    box1: {
      heading: "Unify Your Business Data Ecosystem",
      desc: "We implement ERPNext to centralize your finance, inventory, sales, and HR into a single source of truth. Stop toggling between apps and start managing your business from one platform.",
    },
    box2: {
      heading: "Customized Solutions for Unique Needs",
      desc: "Our experts adapt the ERP setup to fit your existing processes rather than forcing rigid workflows. We ensure the technology supports your business logic and operational style.",
    },
    box3: {
      heading: "Real-Time Insights and Integrated Reporting",
      desc: "Get a 360-degree view of your company’s health with integrated operational reporting. We build the infrastructure that turns complex data into actionable business intelligence.",
    },
  },
  {
    id: 5,
    headding: "Growth Infrastructure",
    box1: {
      heading: "Operational Systems That Drive Revenue",
      desc: "We build the technical foundation behind your marketing and sales efforts. From conversion tracking to performance optimization, we make sure your growth is measurable and repeatable.",
    },
    box2: {
      heading: "Data-Driven Analytics for Better ROI",
      desc: "Stop guessing which strategies work and start seeing the numbers. We set up advanced analytics and tracking systems that provide clear insights into your customer journey.",
    },
    box3: {
      heading: "Aligning Marketing with Operational Reality",
      desc: `Ensure your growth efforts are perfectly synced with your fulfillment and support teams. We bridge the gap between "getting leads" and "serving customers" for a seamless experience.`,
    },
  },
];
gsap.registerPlugin(ScrollTrigger);

export default function OurService() {
  const sectionRef = useRef(null);
  const sidebarRef = useRef(null);
  const boxesRef = useRef(null);

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
      if (window.scrollY > section.offsetHeight + 200) {
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
          <h5>[ OUR SERVICES ]</h5>
          <h1 className="font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold mt-8 leading-[48px]">
            Powerful AI Features and Advanced Tools Built <br />
            for Your Long-Term Business Succes
          </h1>
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-20 mt-20">
          <aside ref={sidebarRef} className="relative">
            <span className="absolute top-0 size-[400px]  bg-[linear-gradient(215.67deg,rgba(2,213,232,0.55)_18.02%,rgba(3,50,103,0.55)_94.4%)] rounded-full block z-99 blur-[150px]"></span>
            <ul className="font-bold space-y-3 mt-12 transition-all duration-500">
              <li>
                <a
                  href="#chatbot-1"
                  className="py-3 border-b w-full inline-block"
                >
                  Back-Office Operational Excellence
                </a>
              </li>
              <li>
                <a
                  href="#chatbot-2"
                  className="py-3 border-b w-full inline-block"
                >
                  CRM & Workflow Management
                </a>
              </li>
              <li>
                <a
                  href="#chatbot-3"
                  className="py-3 border-b w-full inline-block"
                >
                  Automation & AI Workflows
                </a>
              </li>
              <li>
                <a
                  href="#chatbot-4"
                  className="py-3 border-b w-full inline-block"
                >
                  Custom ERPNext Implementation
                </a>
              </li>
              <li>
                <a
                  href="#chatbot-5"
                  className="py-3 border-b w-full inline-block"
                >
                  Growth & Digital Enablement
                </a>
              </li>
            </ul>
          </aside>

          <div ref={boxesRef}>
            {servicesCard.map((cardData) => (
              <div
                key={cardData.id}
                className="mb-20"
                id={"chatbot-" + cardData.id}
              >
                <div>
                  <h1 className="font-extrabold text-2xl">
                    Custom AI Chatbots
                  </h1>
                  <p className="font-medium mt-5">
                    Deploy intelligent conversational agents that understand
                    context, learn from interactions, and provide personalized
                    responses to enhance customer experience and support.
                  </p>
                </div>
                <div>
                  <div
                    className="bg-teal rounded-2xl p-10 mt-10 shadow-[-4px_10px_33.9px_0px_#FFFFFF87] ]
"
                  >
                    <div className="bg-white text-black p-6 rounded-xl">
                      <h1 className="font-bold pb-4">AI chatbot settingsss</h1>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border border-dark-3 p-4 rounded-xl group hover:bg-dark-2/30 hover:border-transparent group-active:bg-dark-3 transition-colors duration-300 cursor-pointer">
                          {" "}
                          <span className="border border-dark-3 size-6 inline-block rounded-full group-hover:bg-dark-3"></span>
                          <h2 className="font-bold text-lg mt-4">
                            Natural Language
                          </h2>
                          <p className="my-4">
                            Send funds at a regular frequency.
                          </p>
                        </div>
                        <div className="border  p-4 rounded-xl group bg-dark-2/30 border-transparent transition-colors duration-300 cursor-pointer">
                          {" "}
                          <span className="border border-dark-3 size-6 inline-block rounded-full bg-dark-3"></span>
                          <h2 className="font-bold text-lg mt-4">
                            Smart Learning
                          </h2>
                          <p className="my-4">
                            Providing personalized experiences
                          </p>
                        </div>
                        <div className="border border-dark-3 p-4 rounded-xl group hover:bg-dark-2/30 hover:border-transparent transition-colors duration-300 cursor-pointer">
                          {" "}
                          <span className="border border-dark-3 size-6 inline-block rounded-full group-hover:bg-dark-3"></span>
                          <h2 className="font-bold text-lg mt-4">
                            Seamless Human Handoff
                          </h2>
                          <p className="my-4">
                            Easily connect with a human when needed.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between gap-6 mt-8">
                        <button className="border w-full rounded-lg py-2 font-semibold capitalize">
                          close
                        </button>
                        <button className="border w-full rounded-lg py-2 font-semibold capitalize bg-dark-2 text-white">
                          submit
                        </button>
                      </div>
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
