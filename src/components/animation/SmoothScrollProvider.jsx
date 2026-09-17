"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SmoothScrollProvider({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const pathname = usePathname();
  const smootherRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch / mobile devices
    const isTouchDevice =
      ScrollTrigger.isTouch === 1 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    // On touch devices, never hijack native touch scrolling
    if (isTouchDevice) {
      ScrollTrigger.refresh();
      return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const ctx = gsap.context(() => {
      // Create the smooth scroller instance for desktop only
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
        smoothTouch: false, // Strictly disable touch interception
      });
    });

    return () => {
      ctx.revert();
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  // Recalculate and reset on route navigation
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (smootherRef.current) {
        smootherRef.current.scrollTo(0, false);
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
