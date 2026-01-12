import Marquee from "react-fast-marquee";

export default function MarqueHighlightText({ marqueeText }) {
  const textArray = Array.isArray(marqueeText) ? marqueeText : [marqueeText];
  return (
    <div>
      <Marquee speed={50} gradient={false} autoFill={true}>
        {textArray.map((text) => (
          <p className="font-sora text-5xl lg:text-7xl xl:text-8xl bg-linear-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center overflow-hidden py-20 mr-8">
            {text}
          </p>
        ))}
      </Marquee>
    </div>
  );
}
