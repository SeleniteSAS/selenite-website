"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useLenis } from "lenis/react";
import { Fragment, type ReactNode, type RefObject, useEffect, useRef } from "react";

import { type LoaderState, useLoaderStore } from "@/store/3d-store";

import Lenis from "lenis";
import { useControls } from "leva";
import { DirectionalLightHelper, type PerspectiveCamera as PC, TextureLoader } from "three";

export default function Moon(): ReactNode {
  const setLoaded = useLoaderStore((state: LoaderState) => state.setMoonLoaded);
  const setProgress = useLoaderStore((state: LoaderState) => state.setMoonProgress);

  const [color, normal] = useLoader(
    TextureLoader,
    ["/textures/moon/moon-color.webp", "/textures/moon/moon-normal.webp"],
    (loader: TextureLoader): void => {
      loader.manager.onProgress = (_: string, loaded: number, total: number): void => {
        const progress: number = (loaded / total) * 100;
        setProgress(progress);
      };

      loader.manager.onLoad = (): void => {
        setLoaded(true);
      };
    },
  );

  const cameraRef: RefObject<PC> = useRef<PC>(null);
  const lightRef = useRef(null);
  const { scene } = useThree();

  const [{ moonPosition, moonScale, moonRotation, moonEmissive }, setMoon] = useControls(() => ({
    moonPosition: {
      value: [-1.5, 8.5, 5.5],
    },
    moonScale: {
      value: 7,
    },
    moonRotation: {
      value: [0.2, 3, 0],
    },
    moonEmissive: {
      value: -0.5,
    },
  }));

  const [{ cameraRotation, cameraPosition, cameraFov, cameraFar, cameraNear, cameraFocus }, setCamera] = useControls(
    () => ({
      cameraRotation: {
        value: [2, 0, 0],
      },
      cameraPosition: {
        value: [0, 0, 10],
      },
      cameraFov: {
        value: 50,
      },
      cameraNear: {
        value: 0.1,
      },
      cameraFar: {
        value: 1000,
      },
      cameraFocus: {
        value: 10,
      },
    }),
  );

  const [{ sunPosition, sunIntensity }, setSun] = useControls(() => ({
    sunPosition: {
      value: [9, 0, 23],
    },
    sunIntensity: {
      value: 10,
    },
  }));

  const [{ bloomThreshold, bloomIntensity, bloomRadius }, setBloom] = useControls(() => ({
    bloomThreshold: {
      value: 0.3,
    },
    bloomIntensity: {
      value: 3,
    },
    bloomRadius: {
      value: 1,
    },
  }));

  useEffect(() => {
    if (lightRef.current && process.env.NODE_ENV === "development") {
      const helper = new DirectionalLightHelper(lightRef.current, 5);
      scene.add(helper);

      return (): void => {
        scene.remove(helper);
      };
    }
  }, [scene, sunPosition, sunIntensity]);

  useLenis((l: Lenis): void => {
    const scrollProgress: number = l.rootElement.scrollTop / (l.rootElement.scrollHeight - window.innerHeight * 2);

    setMoon({
      moonPosition: [
        moonPosition[0] - scrollProgress * moonPosition[0],
        moonPosition[1] - scrollProgress * moonPosition[1],
        moonPosition[2] - scrollProgress * moonPosition[2],
      ],
      moonScale,
      moonRotation: [moonRotation[0], moonRotation[1] - scrollProgress * 4.7, moonRotation[2]],
      moonEmissive,
    });

    setCamera({
      cameraRotation: [
        cameraRotation[0] - scrollProgress * cameraRotation[0],
        cameraRotation[1] - scrollProgress * cameraRotation[1],
        cameraRotation[2] - scrollProgress * cameraRotation[2],
      ],
      cameraPosition: [cameraPosition[0], cameraPosition[1], cameraPosition[2] + scrollProgress * 90],
      cameraFov,
      cameraNear,
      cameraFar,
      cameraFocus,
    });

    setBloom({
      bloomThreshold,
      bloomIntensity: bloomIntensity - scrollProgress * 2,
      bloomRadius,
    });

    setSun({
      sunPosition: [
        sunPosition[0] - scrollProgress * 39,
        sunPosition[1] + scrollProgress * 15,
        sunPosition[2] + scrollProgress * 37,
      ],
      sunIntensity,
    });
  });

  return (
    <Fragment>
      <ambientLight intensity={0} />
      <directionalLight
        position={sunPosition}
        intensity={sunIntensity}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        ref={lightRef}
      />
      <mesh position={moonPosition} scale={moonScale} rotation={moonRotation}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={color}
          normalMap={normal}
          emissiveMap={color}
          emissive={"white"}
          emissiveIntensity={moonEmissive}
        />
      </mesh>
      <PerspectiveCamera
        ref={cameraRef}
        position={cameraPosition}
        rotation={cameraRotation}
        fov={cameraFov}
        near={cameraNear}
        far={cameraFar}
        focus={cameraFocus}
        makeDefault={true}
      />
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={bloomIntensity}
          radius={bloomRadius}
          luminanceThreshold={bloomThreshold}
          kernelSize={5}
        />
      </EffectComposer>
    </Fragment>
  );
}
