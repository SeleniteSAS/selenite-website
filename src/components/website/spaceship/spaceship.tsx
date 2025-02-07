"use client";

import { useGLTF } from "@react-three/drei";
import { ObjectMap, useFrame } from "@react-three/fiber";
import { Fragment, useEffect, useState } from "react";

import * as THREE from "three";
import { GLTF } from "three-stdlib";

export default function SpaceShip() {
  const spaceship: GLTF & ObjectMap = useGLTF("/sources/spaceship.glb");

  const [spaceshipPosition, setSpaceshipPosition] = useState([0, -5.5, 80]); // Current position
  const [spaceshipRotation, setSpaceshipRotation] = useState([0, 0, 0]); // Current rotation
  const [spaceshipScale] = useState(0.4); // Default scale

  const [targetX, setTargetX] = useState(0); // Track target X position

  // Smooth movement logic
  useFrame(() => {
    setSpaceshipPosition((prevPosition) => {
      const newX = THREE.MathUtils.lerp(prevPosition[0], targetX, 0.1); // Smoothly interpolate X
      const newRotationZ = THREE.MathUtils.lerp(
        spaceshipRotation[2],
        newX * 0.05, // Incline in the opposite direction
        0.1,
      );

      setSpaceshipRotation([0, 0, newRotationZ]); // Update rotation
      return [newX, prevPosition[1], prevPosition[2]];
    });
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setTargetX((prev) => Math.max(prev - 1.5, -10)); // Move left, clamp to -10
    } else if (event.key === "ArrowRight") {
      setTargetX((prev) => Math.min(prev + 1.5, 10)); // Move right, clamp to 10
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Fragment>
      <primitive
        object={spaceship.scene}
        position={spaceshipPosition}
        rotation={spaceshipRotation}
        scale={spaceshipScale}
        emissiveIntensity={0}
      />
    </Fragment>
  );
}
