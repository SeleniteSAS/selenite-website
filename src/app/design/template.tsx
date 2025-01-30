"use client";

import { ReactNode, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { items } from "@/lib/design-sidebar-items";

import { motion } from "framer-motion";

type DesignTemplateProps = {
  children: ReactNode;
};

export default function DesignTemplate({ children }: DesignTemplateProps): ReactNode {
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
