import Marquee from "react-fast-marquee";

export default function MarqueHighlightText({ text }) {
  return (
    <div>
      <Marquee speed={50} gradient={false} autoFill={true}>
        <p className="font-sora text-5xl lg:text-7xl xl:text-8xl bg-linear-to-l from-blue-light to-dark-white bg-clip-text text-transparent text-center overflow-hidden">
          {text}
        </p>
      </Marquee>
    </div>
  );
}
