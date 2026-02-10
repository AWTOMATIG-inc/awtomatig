"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function GsapScrollEffect({
  children,
  initial = { y: 40 },
  scrollTop = { y: 0 },
  delay = 0,
}) {
  const ref = useRef(null);
  const initialRef = useRef(initial);
  const scrollTopRef = useRef(scrollTop);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      gsap.set(el, {
        ...initialRef.current,
        willChange: "transform",
      });

      gsap.to(el, {
        ...scrollTopRef.current,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
        delay,
        ease: "none",
      });
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
