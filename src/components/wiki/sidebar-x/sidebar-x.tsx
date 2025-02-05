"use client";

import { XIcon } from "lucide-react";

import { Button } from "@/components/_ui/button";
import { useSidebar } from "@/components/_ui/sidebar";

export default function SidebarX() {
  const { isMobile, setOpenMobile } = useSidebar();

  if (!isMobile) {
    return null;
  }

  const handleClick = () => {
    setOpenMobile(false);
  };

  return (
    <Button size="icon" variant="ghost" className="absolute right-0 top-0 z-50" onClick={handleClick}>
      <XIcon />
    </Button>
  );
}
