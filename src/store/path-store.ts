import { create } from "zustand";
import type { StoreApi, UseBoundStore } from "zustand/index";

export type PathStoreType = {
  previousPath: string | undefined;
  currentPath: string | undefined;
};

export const pathStore: UseBoundStore<StoreApi<PathStoreType>> = create<PathStoreType>(() => ({
  previousPath: undefined,
  currentPath: undefined,
}));
