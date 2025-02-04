"use client";

import { forwardRef } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/_ui/button";

type ThemeButtonProps = React.ComponentProps<typeof Button> & { theme: string };

const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  ({ theme, ...props }, ref) => {
    const { setTheme } = useTheme();

    return <Button {...props} ref={ref} onClick={() => setTheme(theme)} />;
  }
);

ThemeButton.displayName = "ThemeButton";

export default ThemeButton;