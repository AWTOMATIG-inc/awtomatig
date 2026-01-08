"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = ({ className }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // ✅ FIX
  }, []);

  return (
    <Particles
      className={className}
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 120,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          number: { value: 200 },
          color: { value: "#02d5e8" },
          links: { enable: true, color: "#02d5e8" },
          move: { enable: true, speed: 1 },
        },

        // ✅ responsive MUST be here (root level)
        responsive: [
          {
            maxWidth: 1024,
            options: {
              particles: {
                number: { value: 50 },
                move: { speed: 1.5 },
              },
            },
          },
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: 30 },
                size: { value: 2 },
                move: { speed: 1 },
              },
            },
          },
          {
            maxWidth: 480,
            options: {
              particles: {
                number: { value: 15 },
                size: { value: 1.5 },
                move: { speed: 0.6 },
              },
            },
          },
        ],
      }}
    />
  );
};

export default ParticleBackground;
