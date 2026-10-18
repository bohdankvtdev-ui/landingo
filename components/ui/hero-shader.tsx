"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

type ShaderBackgroundProps = {
  className?: string;
};

/** Full-bleed warm cream → orange mesh for the hero. */
export function ShaderBackground({ className = "" }: ShaderBackgroundProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className={`hero-shader ${className}`} aria-hidden="true">
      {!mounted || reduceMotion ? (
        <div className="hero-shader-fallback" />
      ) : (
        <MeshGradient
          className="hero-shader-canvas"
          colors={["#fffaf3", "#ffe4c4", "#fdba74", "#ea580c"]}
          distortion={0.9}
          swirl={0.55}
          speed={0.38}
          grainMixer={0.2}
          grainOverlay={0.1}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
}
