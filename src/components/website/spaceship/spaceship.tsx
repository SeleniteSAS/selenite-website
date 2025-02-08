"use client";

import { useGLTF } from "@react-three/drei";
import { type ObjectMap, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

import * as THREE from "three";
import { GLTF } from "three-stdlib";

export default function SpaceShip() {
  const spaceship: GLTF & ObjectMap = useGLTF("/sources/spaceship.glb");

  const [spaceshipPosition, setSpaceshipPosition] = useState([0, -5.5, 80]);
  const [spaceshipRotation, setSpaceshipRotation] = useState([0, 0, 0]);
  const [spaceshipScale] = useState(0.4);

  const [targetX, setTargetX] = useState(0);

  useFrame(() => {
    setSpaceshipPosition((prevPosition) => {
      const newX = THREE.MathUtils.lerp(prevPosition[0], targetX, 0.1);
      const newRotationZ = THREE.MathUtils.lerp(spaceshipRotation[2], newX * 0.05, 0.1);

      setSpaceshipRotation([0, 0, newRotationZ]);
      return [newX, prevPosition[1], prevPosition[2]];
    });
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setTargetX((prev) => Math.max(prev - 1.5, -10));
    } else if (event.key === "ArrowRight") {
      setTargetX((prev) => Math.min(prev + 1.5, 10));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <primitive
      object={spaceship.scene}
      position={spaceshipPosition}
      rotation={spaceshipRotation}
      scale={spaceshipScale}
      emissiveIntensity={0}
    />
  );
}
