"use client";
import { useState } from "react";
export default function Accordion({ children, title, serial }) {
  const [showAccordion, setShowAccordion] = useState(false);
  return (
    <div className=" border-t">
      <button
        onClick={() => setShowAccordion((prev) => !prev)}
        className="flex justify-between w-full py-2.5 font-medium"
      >
        <span>{title}</span>
        <span>/{serial}</span>
      </button>
      <div
        className={`border-t border-gray-700 transition-transform duration-300  ${
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
