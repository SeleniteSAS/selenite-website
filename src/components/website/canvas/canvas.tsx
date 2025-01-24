"use client";

import { Canvas as ThreeCanvas } from "@react-three/fiber";
import type { ReactNode } from "react";

type CanvasProps = Parameters<typeof ThreeCanvas>[0];

export default function Canvas({ children, ...props }: CanvasProps): ReactNode {
  return <ThreeCanvas {...props}>{children}</ThreeCanvas>;
}
