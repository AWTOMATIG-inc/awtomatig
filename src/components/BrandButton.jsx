"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function BrandButton({
  href = "#",
  onClick,
  children,
  text,
  className = "",
  target,
  rel,
}) {
  const content = text || children;

  const buttonClasses = `group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 h-[48px] sm:h-[52px] min-w-[200px] sm:min-w-[210px] w-full sm:w-auto rounded-full bg-gradient-to-r from-[#02d5e8] via-[#44b6e9] to-[#b66dd2] text-[#050508] font-inter font-bold text-sm sm:text-[15px] tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(2,213,232,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer select-none ${className}`;

  if (target === "_blank" || (typeof href === "string" && href.startsWith("http"))) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        className={buttonClasses}
      >
        <span>{content}</span>
        <Icon
          icon="meteor-icons:arrow-up-right"
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={buttonClasses}>
      <span>{content}</span>
      <Icon
        icon="meteor-icons:arrow-up-right"
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
