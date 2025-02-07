"use client";

import { ReactNode } from "react";

import { usePathInitiate } from "@/hooks/use-paths";

type PathProviderProps = Readonly<{ children: ReactNode }>;

export default function PathProvider({ children }: PathProviderProps): ReactNode {
  usePathInitiate();

  return children;
}
