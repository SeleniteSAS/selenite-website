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
  name: "Alien Red",
  colors: ["#A4191F", "#171717", "#FFFFFF"],
  setName: (name) => set({ name }),
  setColors: (colors) => set({ colors }),
}));
