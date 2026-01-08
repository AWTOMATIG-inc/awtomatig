import card_bg from "@/assets/home/card-bg.webp";
import glove_card from "@/assets/home/glove-card.webp";
import Image from "next/image";
import FadeInSection from "../animation/FadeEffect";

export default function ThreeBoxes() {
  return (
    <section className="container mt-20 md:mt-40 z-1 relative">
      <div className=" sm:hidden text-center sm:text-left mb-8">
        <h5>[ Why Us ]</h5>
        <h1 className="font-press-start text-2xl lg:text-3xl mt-8 ">
          Unique, ownable <br />
          intelligence
        </h1>
      </div>
      <div className="wrapper grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_400px_279px] gap-5 text-center sm:text-left">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
          className="relative w-fit text-black rounded-2xl overflow-hidden "
        >
          <Image
            src={card_bg}
            width={659}
            height={471}
            alt="card"
            className="w-[659px] h-[471px] object-cover"
          />

          <p className="absolute top-0 left-1/2 -translate-x-1/2 font-silkscreen px-6 md:px-8 lg:px-10 pt-14 text-2xl lg:text-3xl w-full">
            Build, compare, and <br />
            ship <br />
            Generation apps in <br />
            minutes
          </p>

          <div className="absolute bottom-14 right-1/2 translate-x-1/2 sm:bottom-8 sm:right-10 font-silkscreen w-full">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">20k</h1>
            <p className="font-bold text-center sm:text-right">
              happy customer
            </p>
          </div>
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, y: -150 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -150 }}
          margin="40px 0px -40px 0px"
          className="bg-[linear-gradient(149.96deg,_#FFFFFF_3.15%,_#02D5E8_99.07%)] text-black rounded-2xl p-8 w-full relative min-h-[450px]"
        >
          <h4 className="text-3xl font-silkscreen">
            Explore <br className="hidden sm:block" /> Scale <br />
            Spellbook
          </h4>
          <p className="mt-4">
            Triggerfish bluntnose knifefish <br /> upside-down catfish kfish
            convict.
          </p>
          <Image
            src={glove_card}
            width={177}
            height={181}
            alt="card"
            className="w-[177px] h-[181px] object-cover absolute bottom-0 right-0"
          />
        </FadeInSection>

        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
          className="bg-black px-8 py-12 rounded-2xl w-full border border-gray-400"
        >
          <p className="font-bold font-press-start text-center text-[0.6rem]">
            Welcome to the future, brought to you by the past.
          </p>
          <div className="bg-stone-500 h-25 w-full border border-teal mt-10 rounded-lg"></div>
          <div className="bg-stone-500 h-25 w-full border border-teal mt-8 rounded-lg"></div>
        </FadeInSection>
      </div>
    </section>
  );
}
