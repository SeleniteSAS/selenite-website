"use client";

import type { ReactNode } from "react";

import { ThemeProvider as Provider } from "next-themes";

type ThemeProviderProps = Readonly<{ children: ReactNode }>;

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <Provider forcedTheme="dark">{children}</Provider>;
}
