"use client";

import { type RootState, useFrame } from "@react-three/fiber";
import { type ReactNode, type RefObject, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { type PerspectiveCamera as PC } from "three";

export default function WebsiteCamera(): ReactNode {
  const cameraRef: RefObject<PC> = useRef<PC>(null);
  const initialPosition: [number, number, number] = [10, 0, 10];

  useFrame(({ clock }: RootState): void => {
    if (cameraRef.current) {
      const t: number = clock.getElapsedTime() / 20;
      cameraRef.current.position.x = initialPosition[0] * Math.sin(t);
      cameraRef.current.position.z = initialPosition[2] * Math.cos(t);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} position={initialPosition} makeDefault={true} />;
}
