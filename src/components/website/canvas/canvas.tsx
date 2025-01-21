"use client";

import type { ReactNode } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";

type CanvasProps = Parameters<typeof ThreeCanvas>[0];

export default function Canvas({ children, ...props }: CanvasProps): ReactNode {
  return <ThreeCanvas {...props}>{children}</ThreeCanvas>;
}
