"use client";

import { useEffect, useState } from "react";

export function useScreenWidth(): number {
  const [width, setWidth] = useState<number>((): number => window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
