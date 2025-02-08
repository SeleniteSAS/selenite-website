"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { type ReactNode, useEffect } from "react";

import { usePathname } from "next/navigation";

import Lenis from "lenis";

type LenisProviderProps = Readonly<{
  children: ReactNode;
}>;

export default function LenisProvider({ children }: LenisProviderProps): ReactNode {
  const pathname: string = usePathname();
  const lenis: Lenis | undefined = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return <ReactLenis root>{children}</ReactLenis>;
}
