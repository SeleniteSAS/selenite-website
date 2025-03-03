"use client";

import { StoreApi, UseBoundStore, create } from "zustand";

export interface LoaderState {
  isMoonLoaded: boolean;
  isShipLoaded: boolean;
  setMoonLoaded: (isLoaded: boolean) => void;
  setShipLoaded: (isLoaded: boolean) => void;
  moonProgress: number;
  setMoonProgress: (progress: number) => void;
  shipProgress: number;
  setShipProgress: (progress: number) => void;
}

export const useLoaderStore: UseBoundStore<StoreApi<LoaderState>> = create<LoaderState>((set) => ({
  isMoonLoaded: false,
  isShipLoaded: false,
  setMoonLoaded: (isLoaded: boolean): void => set({ isMoonLoaded: isLoaded }),
  setShipLoaded: (isLoaded: boolean): void => set({ isShipLoaded: isLoaded }),
  moonProgress: 0,
  setMoonProgress: (progress: number): void => set({ moonProgress: progress }),
  shipProgress: 0,
  setShipProgress: (progress: number): void => set({ shipProgress: progress }),
}));
