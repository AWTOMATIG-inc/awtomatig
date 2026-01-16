"use client";
import { useState } from "react";
export default function Accordion({ children, title, serial }) {
  const [showAccordion, setShowAccordion] = useState(false);
  return (
    <div
      className={`odd:border-t border-b transition-colors duration-300  group hover:border-gray-100 ${
        showAccordion ? "border-white" : "border-gray-400"
      }`}
    >
      <button
        onClick={() => setShowAccordion((prev) => !prev)}
        className={`flex justify-between w-full py-5 font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-300  group-hover:text-white font-inter text-left ${
          showAccordion ? "text-white" : "text-gray-300"
        }`}
      >
        <span>{title}</span>
        <span>/{serial}</span>
      </button>
      <div
        className={`border-t border-gray-700 transition-transform duration-300 lg:text-lg  ${
          showAccordion
            ? "h-full py-3 scale-y-100 origin-top"
            : "h-0 scale-y-0 origin-bottom"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
