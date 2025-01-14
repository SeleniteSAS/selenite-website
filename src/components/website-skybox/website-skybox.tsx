"use client";
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import { memo } from "react";

const WebsiteSkybox = memo(function (): null {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  loader.setPath("/textures/skybox/");
  scene.background = loader.load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

  return null;
});

WebsiteSkybox.displayName = "WebsiteSkybox";

export default WebsiteSkybox;
