"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { ObjectMap, RootState, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import Skybox from "@/components/website/sky/sky";

import { useControls } from "leva";
import { type Mesh, type Object3D, Object3DEventMap, TextureLoader } from "three";
import { type GLTF, type OrbitControls as OrbitControlsType } from "three-stdlib";

export default function Spaceship() {
  const spaceship: GLTF & ObjectMap = useGLTF("/sources/spaceship.glb");
  const spaceshipRef = useRef<Object3D<Object3DEventMap> | null>(null);
  const controlsRef = useRef<OrbitControlsType>(null);
  const moonRef = useRef<Mesh>(null);
  const { camera }: RootState = useThree();
  const [color, normal] = useLoader(TextureLoader, [
    "/textures/moon/moon-color.webp",
    "/textures/moon/moon-normal.webp",
  ]);

  const { position, rotation, scale } = useControls({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.3,
  });

  useEffect((): (() => void) => {
    function resetCamera(): void {
      if (spaceshipRef.current && controlsRef.current) {
        camera.position.copy(
          spaceshipRef.current.position.clone().add({
            x: 10,
            y: 5,
            z: -70,
          }),
        );
        controlsRef.current.target.copy(spaceshipRef.current.position);
      }
    }

    resetCamera();

    const interval = setInterval(() => {
      resetCamera();
    }, 8000);

    return (): void => {
      clearInterval(interval);
    };
  }, [camera]);

  useFrame((): void => {
    if (spaceshipRef.current && controlsRef.current && moonRef.current) {
      spaceshipRef.current.position.z -= 0.2;
      moonRef.current.position.z -= 0.2;

      controlsRef.current.target.lerp(spaceshipRef.current.position, 0.1);
    }
  });

  return (
    <>
      <primitive object={spaceship.scene} position={position} rotation={rotation} scale={scale} ref={spaceshipRef} />
      <ThrusterTrail spaceshipRef={spaceshipRef} scaleShift={[0.4, 20, 0.4]} positionOffset={[0.8, 0.1, 17]} />
      <ThrusterTrail spaceshipRef={spaceshipRef} scaleShift={[1, 20, 1]} positionOffset={[0.8, 0.1, 17]} />
      <ThrusterTrail spaceshipRef={spaceshipRef} scaleShift={[0.4, 20, 0.4]} positionOffset={[-0.8, 0.1, 17]} />
      <ThrusterTrail spaceshipRef={spaceshipRef} scaleShift={[1, 20, 1]} positionOffset={[-0.8, 0.1, 17]} />
      <OrbitControls ref={controlsRef} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} />
      <mesh position={[0, 0, -400]} scale={8} ref={moonRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={color}
          normalMap={normal}
          emissiveMap={color}
          emissive={"white"}
          emissiveIntensity={-0.5}
        />
      </mesh>
      <directionalLight position={[0, 100, -300]} intensity={0.5} />
      <Skybox />
    </>
  );
}

type ThrusterTrailProps = Readonly<{
  spaceshipRef: React.RefObject<Object3D>;
  scaleShift: [number, number, number];
  positionOffset: [number, number, number];
}>;

function ThrusterTrail({ spaceshipRef, scaleShift, positionOffset }: ThrusterTrailProps) {
  const glowRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!spaceshipRef.current || !glowRef.current) return;

    const spaceshipPos = spaceshipRef.current.position.clone();
    glowRef.current.position.set(
      spaceshipPos.x + positionOffset[0],
      spaceshipPos.y + positionOffset[1],
      spaceshipPos.z + positionOffset[2],
    );

    glowRef.current.scale.set(scaleShift[0], scaleShift[1], scaleShift[2]);
  });

  return (
    <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.2, 0.2, 1.5, 32]} />
      <meshStandardMaterial emissive={0x00e5e5} emissiveIntensity={5} color={0x00e5e5} transparent opacity={0.8} />
    </mesh>
  );
}
