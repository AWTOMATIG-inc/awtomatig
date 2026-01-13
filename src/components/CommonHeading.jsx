export default function CommonHeading({ title, heading }) {
  return (
    <div>
      <h5 className="font-montserrat uppercase">[ {title} ]</h5>
      <h1 className="font-russo-one text-2xl sm:text-3xl md:text-4xl lg:text-6xl   mt-6">
        {heading}
      </h1>
    </div>
  );
}
