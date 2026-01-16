import { benifitsData } from "@/contants/benifits";
import CommonHeading from "../CommonHeading";

export default function Benifits() {
  return (
    <div className="container">
      <div className="wrapper mb-14  text-center sm:text-left relative z-10">
        <CommonHeading title="BENEFITS">
          Experience The Competitive Advantages That Our A1 Technology <br />
            Brings To Your Business, From Cost Savings To Enhanced Productivity{" "}
            <br />
            And Growth Acceleration
        </CommonHeading>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-14 font-sora mt-18">
          {benifitsData.map((service) => (
            <div key={service.id} className="text-center sm:text-left">
              <h1 className="font-semibold">{service.title}</h1>
              <p className="mt-5 md:mt-8 text-justify">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
