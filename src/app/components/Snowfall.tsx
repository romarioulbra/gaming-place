"use client";
import { useEffect } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // Carrega uma versão mais leve

export default function Snowfall() {
  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles); // Carrega as partículas
      await tsParticles.load("snowfall", {
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 100, // Quantidade de partículas
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff", // Cor das partículas (branco)
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: true,
          },
          size: {
            value: 4,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            straight: false,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
            onClick: {
              enable: false,
            },
          },
        },
      });
    };

    initParticles();
  }, []);

  return <div id="snowfall" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
