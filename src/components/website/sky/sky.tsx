"use client";

import { useThree } from "@react-three/fiber";
import { memo } from "react";

import { CubeTextureLoader } from "three";

const Skybox = memo(function (): null {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  loader.setPath("/textures/skybox/");
  scene.background = loader.load(["right.png", "left.png", "top.png", "bottom.png", "front.png", "back.png"]);

  return null;
});

Skybox.displayName = "Skybox";

export default Skybox;
