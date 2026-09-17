export default function CommonHeading({
  title,
  description,
  color = "text-white",
  align = "center",
  highlightLastWord = true,
  className = "",
  children,
}) {
  const isLeft = align === "left" || className.includes("text-left");

  // Automatically apply the brand gradient to the last word
  const renderHeadingContent = () => {
    if (!highlightLastWord) return children;

    let text = "";
    if (typeof children === "string") {
      text = children;
    } else if (Array.isArray(children)) {
      text = children
        .map((child) => {
          if (typeof child === "string") return child;
          if (child && child.type === "br") return " ";
          return "";
        })
        .join("");
    }

    if (text) {
      const words = text.trim().split(/\s+/);
      if (words.length > 1) {
        const mainText = words.slice(0, -1).join(" ");
        const lastWord = words[words.length - 1];
        return (
          <>
            {mainText}{" "}
            <span className="bg-gradient-to-r from-white via-[#7eedf8] to-[#02d5e8] bg-clip-text text-transparent">
              {lastWord}
            </span>
          </>
        );
      } else if (words.length === 1) {
        return (
          <span className="bg-gradient-to-r from-[#02d5e8] via-[#44b6e9] to-[#b66dd2] bg-clip-text text-transparent">
            {words[0]}
          </span>
        );
      }
    }

    return children;
  };

  return (
    <div
      className={`flex flex-col ${
        isLeft
          ? "items-start text-left"
          : "items-center justify-center text-center"
      } ${className}`}
    >
      {title && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase">
            {title}
          </span>
        </div>
      )}
      <h2
        className={`font-russo-one text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] [&_br]:hidden whitespace-normal md:whitespace-nowrap max-w-none ${color}`}
      >
        {renderHeadingContent()}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base font-inter text-neutral-400 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
