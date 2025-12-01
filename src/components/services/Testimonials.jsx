export default function Testimonials() {
  return (
    <section className="container mt-20">
      <div className="text-center">
        <h5>[ Testimonials ]</h5>
        <h1 className="font-manrope text-2xl lg:text-3xl xl:text-4xl font-bold mt-8 leading-[48px]">
          Trusted By Leading Companies
        </h1>
        <p className="mt-8 text-lg">
          Join innovative global businesses offering industry-leading <br />{" "}
          employee benefits with Nexros.
        </p>
      </div>
      <div className="grid grid-cols-6 gap-x-5 mt-16">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-w-[250px] min-h-[250px] max-w-[293px] max-h-[293px] bg-dark-white  rounded-4xl"
          ></div>
        ))}
      </div>
    </section>
  );
}
