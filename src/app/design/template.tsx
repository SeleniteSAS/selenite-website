"use client";

import { ReactNode } from "react";

import { usePath } from "@/hooks/use-paths";
import { items } from "@/lib/design-sidebar-items";

import { motion } from "framer-motion";

type DesignTemplateProps = Readonly<{
  children: ReactNode;
}>;

export default function DesignTemplate({ children }: DesignTemplateProps): ReactNode {
  const { previousPath, currentPath } = usePath();

  if (currentPath === undefined || previousPath === undefined) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
    );
  }

  const flattenedItems = Object.values(items).reduce((acc, val) => acc.concat(val), []);

  const currentPathItemIndex: number = flattenedItems.findIndex((item) => item.path === currentPath) || 0;
  const previousPathItemIndex: number = flattenedItems.findIndex((item) => item.path === previousPath) || 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: currentPathItemIndex > previousPathItemIndex ? "30px" : "-30px",
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
