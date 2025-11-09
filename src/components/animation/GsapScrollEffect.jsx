"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function GsapScrollEffect({
  children,
  initial = { opacity: 0, y: 40 },
  scrollTop = { opacity: 1, y: 0 },
  scrollBottom = { opacity: 0, y: 80 },
  margin = "400px 0px -100px 0px",
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state
    gsap.set(el, initial);

    // Create ScrollTrigger animation
    const anim = gsap.to(el, {
      ...scrollTop,
      scrollTrigger: {
        trigger: el,
        start: "top bottom", // when element top hits bottom of viewport
        end: "bottom top", // when element bottom hits top of viewport
        scrub: true, // smooth link with scroll
        markers: false, // set to true to debug
        toggleActions: "play reverse play reverse",
      },
      duration: 0.5,
      delay,
      ease: "power2.out",
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [initial, scrollTop, scrollBottom, delay]);

  return <div ref={ref}>{children}</div>;
}
