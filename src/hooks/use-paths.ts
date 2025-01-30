import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { PathStoreType, pathStore } from "@/store/path-store";

export const usePath = (): PathStoreType => {
  return pathStore((state: PathStoreType): PathStoreType => state);
};

export const usePathInitiate = (): void => {
  const pathname: string = usePathname();
  const { currentPath } = usePath();

  useEffect((): void => {
    if (currentPath !== pathname) {
      pathStore.setState(
        (state: PathStoreType): PathStoreType => ({
          ...state,
          previousPath: state.currentPath,
          currentPath: pathname,
        }),
      );
    }
  }, [currentPath, pathname]);
};
