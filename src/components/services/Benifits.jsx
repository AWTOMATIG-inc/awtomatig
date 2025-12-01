import { benifitsData } from "@/contants/benifits";

export default function Benifits() {
  return (
    <section className="container mt-20">
      <div className="wrapper mt-20 mb-14  text-center sm:text-left relative z-10">
        <div>
          <h5>[ BENEFITS ]</h5>
          <h1 className="font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold mt-8 leading-[48px]">
            Experience The Competitive Advantages That Our A1 Technology <br />
            Brings To Your Business, From Cost Savings To Enhanced Productivity{" "}
            <br />
            And Growth Acceleration
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-14 font-sora mt-18">
          {benifitsData.map((service) => (
            <div key={service.id} className="text-center sm:text-left">
              <h1 className="font-semibold">{service.title}</h1>
              <p className="mt-5 md:mt-8">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
