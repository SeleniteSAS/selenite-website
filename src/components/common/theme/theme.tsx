"use client";

import { MoonIcon } from "lucide-react";
import { ReactNode } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/_ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/_ui/dropdown-menu";

export default function Theme(): ReactNode {
  const { setTheme, theme } = useTheme();

  const themes: string[] = ["light", "dark", "system"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true} className={"fixed bottom-8 right-20"}>
        <Button variant={"default"} className={"[&_svg]:size-auto"} size={"icon"}>
          <MoonIcon strokeWidth={1} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((item: string) => (
          <DropdownMenuItem
            key={theme}
            onClick={(): void => setTheme(item)}
            className="cursor-pointer"
            disabled={theme === item}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
