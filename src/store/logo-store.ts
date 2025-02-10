"use client";

import type { Color } from "@/types/color";

import { StoreApi, UseBoundStore, create } from "zustand";

export interface LogoState {
  name: string;
  colors: [Color, Color, Color];
  setName: (name: string) => void;
  setColors: (colors: [Color, Color, Color]) => void;
}

export const useLogoStore: UseBoundStore<StoreApi<LogoState>> = create<LogoState>((set) => ({
  name: "Selenite",
  colors: ["#000000", "#FFFFFF", "#FF0000"],
  setName: (name) => set({ name }),
  setColors: (colors) => set({ colors }),
}));
