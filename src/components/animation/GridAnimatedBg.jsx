"use client";
import { useEffect, useRef } from "react";

export default function GridAnimatedBg({ children }) {
  const glowRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    function handleMove(evt) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (evt.clientX / w - 0.5) * 50; // -25px to +25px
      const y = (evt.clientY / h - 0.5) * 30; // -15px to +15px

      targetRef.current = { x, y };
    }

    window.addEventListener("mousemove", handleMove, { passive: true });

    function animate() {
      const glow = glowRef.current;
      if (glow) {
        const target = targetRef.current;
        const current = currentRef.current;
        current.x += (target.x - current.x) * 0.08;
        current.y += (target.y - current.y) * 0.08;
        currentRef.current = current;

        glow.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#000000] flex flex-col justify-center overflow-hidden">
      {/* Background Ambient Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Fine cybernetic grid with radial fade mask */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(2, 213, 232, 0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2, 213, 232, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, black 25%, transparent 80%)",
          }}
        />

        {/* Micro-dot constellation layer */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 35%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 35%, black 20%, transparent 75%)",
          }}
        />

        {/* Interactive Smooth Ambient Glow Orbs */}
        <div ref={glowRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
          {/* Primary Cyan Glow Aura */}
          <div className="absolute top-[18%] w-[320px] sm:w-[540px] md:w-[700px] h-[260px] sm:h-[380px] bg-[#02d5e8]/14 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

          {/* Secondary Deep Indigo Accent Glow */}
          <div className="absolute top-[28%] w-[260px] sm:w-[460px] md:w-[580px] h-[220px] sm:h-[320px] bg-[#4f46e5]/12 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

          {/* Soft Top Rim Light */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#02d5e8]/30 to-transparent" />
        </div>

        {/* Bottom smooth fade to pitch black so it connects seamlessly to next sections */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Hero Content in Natural Layout Flow */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
