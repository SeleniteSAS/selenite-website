"use client";

import { Canvas } from "@react-three/fiber";
import { type ReactNode } from "react";
import { useControls } from "leva";

type WebsiteCanvasProps = Parameters<typeof Canvas>[0];

export default function Canvas({ children, ...props }: WebsiteCanvasProps): ReactNode {
  const light = useControls("Light Data", {
    intensity: { value: 4.0, min: 0, max: 10 },
    position: { value: [70, 0, 20], step: 1 },
  });

  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Canvas {...props} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={light.position} intensity={light.intensity} />
        {children}
      </Canvas>
    </div>
  );
}
