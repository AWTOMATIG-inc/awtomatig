import InputBox from "@/components/InputBox";
import TextBox from "@/components/TextBox";
import { Icon } from "@iconify/react";

export default function Services() {
  return (
    <main>
      <section className="hero-banner min-h-[823px] relative">
        <div className="container">
          <div className="flex flex-col justify-center items-center min-h-screen text-center gap-4">
            <h1 className="font-bold text-7xl uppercase">
              /Artificial Intelligence (AI) <br /> systems/
            </h1>
          </div>
          <h5 className="text-8xl text-border text-transparent uppercase absolute -right-30 top-1/2 -translate-y-1/2 opacity-80 -rotate-90 select-none pointer-events-none tracking-[30%] font-sora">
            Services
          </h5>
          <p className="absolute bottom-5 left-5 font-bold">Home / services</p>
        </div>
      </section>
      <section className="container">
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
            <div className="service-white-card h-[400px] mt-20 rounded-3xl text-black flex flex-col justify-center items-center px-20 py-10 text-center">
              <h1 className="max-w-[405px] text-3xl font-bold  leading-[62px] text-center">
                Network Integration Deep learning solution Transfer learning
                Model evaluation Real-time prediction
              </h1>
            </div>
            <div className="service-blue-card h-[400px] mt-20 rounded-3xl text-black   px-40 py-10  text-center flex flex-col justify-center items-center gap-6">
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
          </div>
        </div>
      </section>
      <section>
        <div className="container  font-sora pt-32">
          <div className="wrapper">
            <div className="grid grid-cols-2 gap-20 max-w-[1430px] mx-auto">
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
