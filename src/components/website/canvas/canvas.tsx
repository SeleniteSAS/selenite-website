"use client";

import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { type ReactNode } from "react";
import { useControls } from "leva";

type CanvasProps = Parameters<typeof ThreeCanvas>[0];

export default function Canvas({ children, ...props }: CanvasProps): ReactNode {
  const light = useControls("Light Data", {
    intensity: { value: 4.0, min: 0, max: 10 },
    position: { value: [70, 0, 20], step: 1 },
  });

  return (
    <div className="fixed inset-0 h-screen w-screen">
      <ThreeCanvas {...props} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={light.position} intensity={light.intensity} />
        {children}
      </ThreeCanvas>
    </div>
  );
}
