"use client";

import ReactLenis from "lenis/react";
import type { ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps): ReactNode {
  return <ReactLenis root>{children}</ReactLenis>;
}
