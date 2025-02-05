"use client";

import { ElementRef, forwardRef } from "react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/_ui/dropdown-menu";

type ThemeButtonProps = React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & { theme: string };
type ThemeButtonRef = ElementRef<typeof DropdownMenuItem>;

const ThemeButton = forwardRef<ThemeButtonRef, ThemeButtonProps>(
  ({ theme, ...props }, ref) => {
    const { setTheme } = useTheme();

    return <DropdownMenuItem {...props} ref={ref} onClick={() => setTheme(theme)} />;
  }
);

ThemeButton.displayName = "ThemeButton";

export default ThemeButton;