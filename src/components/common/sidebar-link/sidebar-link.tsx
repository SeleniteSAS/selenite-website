"use client";

import { ComponentProps } from "react";

import Link from "next/link";

import { useSidebar } from "@/components/_ui/sidebar";

type SidebarLinkProps = Readonly<ComponentProps<typeof Link>>;

export default function SidebarLink({ children, ...props }: SidebarLinkProps) {
  const { isMobile, toggleSidebar } = useSidebar();

  const handleClick = () => isMobile && toggleSidebar();

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
