"use client";

import { create, StoreApi, UseBoundStore } from "zustand";

export interface LoaderState {
  isLoaded: boolean;
  setLoaded: (isLoaded: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

export const useLoaderStore: UseBoundStore<StoreApi<LoaderState>> = create<LoaderState>((set) => ({
  isLoaded: false,
  progress: 0,
  setLoaded: (loaded: boolean): void => set({ isLoaded: loaded }),
  setProgress: (progress: number): void => set({ progress }),
}));
