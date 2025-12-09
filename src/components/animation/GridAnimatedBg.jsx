"use client";
import "@/app/animate.css";
import { useEffect, useRef } from "react";
export default function GridAnimatedBg({ children }) {
  const planeRef = useRef(null);
  const targetRef = useRef({ rotateZ: 0, offsetY: 0 });
  const currentRef = useRef({ rotateZ: 0, offsetY: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    function handleMove(evt) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = evt.clientX / w; // 0..1
      const y = evt.clientY / h; // 0..1

      // Map mouse position to VERY subtle rotation & offset (1/5th of v5)
      const rotateZ = (x - 0.5) * 0.8; // approx -0.4deg .. 0.4deg
      const offsetY = (y - 0.5) * 1.2; // approx -0.6px .. 0.6px

      targetRef.current = { rotateZ, offsetY };
    }

    window.addEventListener("mousemove", handleMove);

    function animate() {
      const plane = planeRef.current;
      if (!plane) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const target = targetRef.current;
      const current = currentRef.current;

      // Simple linear interpolation towards target for smoothness
      const lerpFactor = 0.14;
      current.rotateZ += (target.rotateZ - current.rotateZ) * lerpFactor;
      current.offsetY += (target.offsetY - current.offsetY) * lerpFactor;

      currentRef.current = current;

      const transform =
        "translateX(-50%) " +
        "translateY(" +
        current.offsetY.toFixed(3) +
        "px) " +
        "perspective(1450px) " +
        "rotateX(78deg) " +
        "rotateZ(" +
        current.rotateZ.toFixed(3) +
        "deg) " +
        "scaleY(1.04)";

      plane.style.transform = transform;

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative h-fit w-full">
      <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden ">
        <div className="grid-plane" ref={planeRef}></div>
      </div>
      <div className="absolute w-full h-full bottom-0  bg-gradient-to-b  to-black from-20% to-60% z-[101]"></div>
      <div className="absolute w-full top-0 z-[102]">{children}</div>
    </section>
  );
}
