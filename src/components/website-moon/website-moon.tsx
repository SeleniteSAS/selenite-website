"use client";

import { useLoader } from "@react-three/fiber";
import { type Mesh, TextureLoader } from "three";
import { type RefObject, type ReactNode, useRef } from "react";

export default function WebsiteMoon(): ReactNode {
  const [color, normal] = useLoader(TextureLoader, ["/textures/moon/moon-color.png", "/textures/moon/moon-normal.png"]);
  const sphereRef: RefObject<Mesh | null> = useRef<Mesh>(null);

  return (
    <mesh ref={sphereRef} rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1.7}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial map={color} normalMap={normal} shininess={10} />
    </mesh>
  );
}
