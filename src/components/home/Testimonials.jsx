import rainbow_bg from "@/assets/home/rainbow-bg.webp";
import Image from "next/image";
import FadeInSection from "../animation/FadeEffect";
export default function Testimonials() {
  return (
    <section className="container mt-20">
      <div className="wrapper grid md:grid-cols-2 gap-8">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
        >
          <Image
            src={rainbow_bg}
            width={920}
            height={750}
            className="rounded-2xl w-full max-w-[920px] h-auto"
            alt="rainbow-image"
          />
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
        >
          <div className="max-w-[690px] text-center md:text-left">
            <h5>[ Testimonials ]</h5>
            <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-6 lg:mt-8 leading-[55px] lg:leading-[70px]">
              Awesome Thouths
              <br className="hidden md:block" />
              About Artificial <br /> Intelligence
            </h1>
            <p className="mt-6 sm:mt-10 lg:mt-20">
              Halosaur duckbilled barracudina, goosefish gar pleco, chum salmon
              armoured catfish gudgeon sawfish whitefish orbicular batfish
              mummichog paradise fish! Pacific hake false trevally queen
              parrotfish black prickleback moss revally queen parrotfish black
              prickleback moss. Queen parrotfish black prickleback moss pacific
              hake false trevally queen parrotfish black prickleback moss
              revally
            </p>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-13 md:text-center">
              <div>
                <h5 className="font-bold text-xl">Adrian Mitchel</h5>
                <p className="text-sm font-bold mt-1">SolarInc</p>
              </div>
              <div className="flex items-center gap-8 mt-5 lg:mt-0">
                <span className="w-10 md:w-20 h-2 bg-white block"></span>
                <span className="w-10 md:w-20 h-1 bg-white block"></span>
                <span className="w-10 md:w-20 h-1 bg-white block"></span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
