import Accordion from "@/components/Accordion";
import FadeInSection from "@/components/animation/FadeEffect";
import GridAnimatedBg from "@/components/animation/GridAnimatedBg";

import InputBox from "@/components/InputBox";
import Benifits from "@/components/services/Benifits";
import OurServices from "@/components/services/OurServices";
import Testimonials from "@/components/services/Testimonials";
import TextBox from "@/components/TextBox";
import { capabilities } from "@/contants/capabilities";
import { Icon } from "@iconify/react";
export default function Services() {
  return (
    <main>
      <GridAnimatedBg>
        <div className="container">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <div className="flex flex-col justify-center items-center min-h-screen text-center gap-4">
              <h1 className="font-bold text-7xl uppercase">
                /Artificial Intelligence (AI) <br /> systems/
              </h1>
            </div>
          </FadeInSection>
          <h5 className="text-8xl text-border text-transparent uppercase absolute -right-30 top-1/2 -translate-y-1/2 opacity-80 -rotate-90 select-none pointer-events-none tracking-[30%] font-sora">
            Services
          </h5>
          <p className="absolute bottom-5 left-5 font-bold">Home / services</p>
        </div>
      </GridAnimatedBg>
      {/* <section className="hero-banner min-h-[823px] relative">
        <div className="container">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
          >
            <div className="flex flex-col justify-center items-center min-h-screen text-center gap-4">
              <h1 className="font-bold text-7xl uppercase">
                /Artificial Intelligence (AI) <br /> systems/
              </h1>
            </div>
          </FadeInSection>
          <h5 className="text-8xl text-border text-transparent uppercase absolute -right-30 top-1/2 -translate-y-1/2 opacity-80 -rotate-90 select-none pointer-events-none tracking-[30%] font-sora">
            Services
          </h5>
          <p className="absolute bottom-5 left-5 font-bold">Home / services</p>
        </div>
      </section> */}
      {/* <section className="container relative">
        <span
          style={{
            background:
              "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
          }}
          className=" inline-block absolute size-[1145px]  -left-40 top-1/2 -translate-y-1/2 rounded-full blur-[320px] -z-1"
        ></span>
        <div className="wrapper">
          <div className="text-center mt-20">
            <h1 className="text-[48px] font-bold">
              Neural networks are a fundamental component of Artificial
              Intelligence <br />
              (AI) systems
            </h1>
            <p className="font-bold text-[30px] mt-8">
              Integrating neural network models into existing systems or
              software applications, enabling businesses to leverage AI
              capabilities seamlessly.
            </p>
            <p className="text-lg mt-8">
              In today’s fast-paced and data-driven world, businesses are
              constantly seeking innovative ways to gain a competitive edge,
              make smarter decisions, and deliver exceptional customer
              experiences. One technology that is transforming industries across
              the globe is neural networks. Harnessing the power of artificial
              intelligence, neural networks have the ability to analyze vast
              amounts of data, identify complex patterns, and make accurate
              predictions, enabling businesses to unlock new opportunities and
              drive growth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FadeInSection
              initial={{ opacity: 0, x: -150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: -150 }}
              margin="40px 0px -40px 0px"
              className="service-white-card h-[400px] mt-20 rounded-3xl text-black flex flex-col justify-center items-center px-20 py-10 text-center"
            >
              <h1 className="max-w-[405px] text-3xl font-bold  leading-[62px] text-center">
                Network Integration Deep learning solution Transfer learning
                Model evaluation Real-time prediction
              </h1>
            </FadeInSection>
            <FadeInSection
              initial={{ opacity: 0, x: 150 }}
              scrollTop={{ opacity: 1, x: 0 }}
              scrollBottom={{ opacity: 0, x: 150 }}
              margin="40px 0px -40px 0px"
              className="service-blue-card h-[400px] mt-20 rounded-3xl text-black   px-40 py-10  text-center flex flex-col justify-center items-center gap-6"
            >
              <div>
                <div className="max-w-[236px]">
                  <h5 className="font-bold text-2xl">/ download /</h5>
                  <h1 className="text-4xl font-bold my-8 tracking-[10px]">
                    Services brochure{" "}
                  </h1>
                  <button className="flex gap-2 mt-6 px-10 py-2 border border-black rounded-2xl font-bold w-full justify-center items-center hover:bg-black hover:text-white transition">
                    <span>Download</span>
                    <Icon
                      icon="humbleicons:arrow-right-up"
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section> */}
      <OurServices />
      <Benifits />
      <Testimonials />
      {/* <section className="container mt-20">
        <div className="wrapper service-awtomatig-banner h-[354px] flex flex-col justify-center items-center text-center px-20 py-10 rounded-sm">
          <FadeInSection
            initial={{ opacity: 0, y: -150 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: -150 }}
            margin="40px 0px -40px 0px"
          >
            <h1 className="text-5xl font-bold">AI Strategy and Consulting</h1>
            <p className="font-bold text-3xl mt-10">
              Provide expert guidance on <br /> developing an AI strategy
            </p>
          </FadeInSection>
        </div>
      </section> */}
      {/* <section className="container mt-20 relative">
        <span
          style={{
            background:
              "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
          }}
          className=" inline-block absolute size-[1145px]  -left-40 top-1/2 -translate-y-1/2 rounded-full blur-[320px] -z-1"
        ></span>
        <div className="wrapper">
          <p className="text-[22px] text-center leading-[40px] tracking-[3px]">
            In today's fast-paced and data-driven world, businesses are
            constantly seeking innovative ways to <br /> gain a competitive
            edge, make <br />
            smarter decisions, and deliver exceptional customer experiences. One
            technology that is <br /> transforming industries across the globe
            is <br />
            neural networks. Harnessing the power of artificial intelligence,
            neural networks have the ability to <br /> analyze vast amounts of
            data, <br />
            identify complex patterns, and make accurate predictions, enabling
            businesses to unlock new <br /> opportunities and drive growth.
          </p>
          <ul className="text-[22px] space-y-4 mt-14 ml-8">
            <li className="flex gap-3 items-center">
              <Icon icon="humbleicons:arrow-right-up" width="26" height="26" />
              <span>Pacific hake false trevally queen parrotfish black</span>
            </li>
            <li className="flex gap-3 items-center">
              <Icon icon="humbleicons:arrow-right-up" width="26" height="26" />
              <span>Prickleback moss revally queen parrotfish black</span>
            </li>
            <li className="flex gap-3 items-center">
              <Icon icon="humbleicons:arrow-right-up" width="26" height="26" />
              <span>Queen parrotfish black prickleback moss pacific</span>
            </li>
            <li className="flex gap-3 items-center">
              <Icon icon="humbleicons:arrow-right-up" width="26" height="26" />
              <span>Hake false trevally queen</span>
            </li>
          </ul>
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
            className="w-full object-cover h-auto mt-14"
          >
            <Image
              src={awtomatigBanner}
              width={1334}
              height={1145}
              alt="awtomatig-banner"
            />
          </FadeInSection>
        </div>
      </section> */}
      <section className="container mt-20 relative">
        <span
          style={{
            background:
              "linear-gradient(215.67deg, rgba(2, 213, 232, 0.55) 18.02%, rgba(3, 50, 103, 0.55) 94.4%)",
          }}
          className=" inline-block absolute size-[800px]  -left-40 -bottom-10 rounded-full blur-[320px] -z-1"
        ></span>
        <FadeInSection
          initial={{ opacity: 0, y: -150 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -150 }}
          margin="40px 0px -40px 0px"
          className="wrapper"
        >
          <div className="">
            <p>[ FAQ ]</p>
            <h1 className="font-press-start text-2xl sm:text-3xl md:text-4xl  font-bold  leading-[135%] mt-10">
              Open questions <br />
              from our customers
            </h1>
          </div>

          <div className="mt-14">
            {capabilities.map((capability) => (
              <Accordion
                key={capability.id}
                title={capability.title}
                serial={"0" + capability.id}
              >
                <p>{capability.description}</p>
              </Accordion>
            ))}
          </div>
        </FadeInSection>
      </section>
      <section>
        <div className="container  font-sora py-32">
          <div className="wrapper">
            <div className="grid grid-cols-2 gap-20 max-w-[1430px] mx-auto">
              <FadeInSection
                initial={{ opacity: 0, x: -150 }}
                scrollTop={{ opacity: 1, x: 0 }}
                scrollBottom={{ opacity: 0, x: -150 }}
                margin="40px 0px -40px 0px"
              >
                <div>
                  <h1>[ get in touch ]</h1>
                  <h5 className="text-5xl leading-[70px] mt-4">
                    We are always ready to help you and answer your questions
                  </h5>
                  <p className="text-xl my-12">
                    Pacific hake false trevally queen parrotfish black
                    prickleback mosshead warbonnet sweeper! Greenling sleeper.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h1 className="">Call Center</h1>
                    <div className="mt-8">
                      <a href="#">800 100 975 20 34</a>
                      <br />
                      <a href="#">+ (123) 1800-234-5678</a>
                    </div>
                    <div className="mt-14">
                      <h1>Email</h1>
                      <a href="#">aiero@mail.co</a>
                    </div>
                  </div>
                  <div>
                    <h1>Our Location</h1>
                    <div className="mt-10">
                      <a href="#">261/c khilgaon, road no 9 ,maibag</a>
                    </div>
                    <div className="mt-12">
                      <h1>Social network</h1>
                      <div className="flex justify-center items-center gap-x-8 mt-5">
                        <a href="">
                          <Icon
                            icon="ic:baseline-facebook"
                            width="25"
                            height="25"
                          />
                        </a>
                        <a href="">
                          <Icon icon="prime:twitter" width="19" height="19" />
                        </a>
                        <a href="">
                          <Icon icon="mdi:linkedin" width="25" height="25" />
                        </a>
                        <a href="">
                          <Icon icon="mdi:youtube" width="26" height="26" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection
                initial={{ opacity: 0, x: 150 }}
                scrollTop={{ opacity: 1, x: 0 }}
                scrollBottom={{ opacity: 0, x: 150 }}
                margin="40px 0px -40px 0px"
              >
                <form
                  action="#"
                  className="rounded-xl shadow-lg shadow-teal p-8 bg-[#201F1F78] max-w-[605px] mx-auto"
                >
                  <h1 className="text-right font-bold text-3xl capitalize mb-8">
                    get touch
                  </h1>
                  <div className=" rounded-md space-y-5 w-[80%] ml-auto">
                    <InputBox name="fullname" placeholder="FullName" />
                    <InputBox name="email" placeholder="Email" />
                    <InputBox name="subject" placeholder="Subject" />
                    <TextBox name="message" placeholder="Message" />
                  </div>
                  <button className="capitalize px-8 py-2 border border-gray-500 mt-8 rounded-2xl block ml-auto text-gray-400">
                    send message
                  </button>
                </form>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
