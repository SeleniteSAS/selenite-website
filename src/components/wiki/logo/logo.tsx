"use client";

import type { ComponentProps, ReactNode } from "react";

import { useTheme } from "next-themes";

import { Logo as DefaultLogo } from "@/components/common/logo/logo";

type LogoProps = Omit<ComponentProps<typeof DefaultLogo>, "mainColor" | "secondaryColor">;

const light: [string, string] = ["#CDCDCD", "#BDBDBD"];
const dark: [string, string] = ["#666666", "#888888"];

export default function Logo(props: LogoProps): ReactNode {
  const { theme } = useTheme();

  return (
    <DefaultLogo
      {...props}
      mainColor={theme === "light" ? light[0] : dark[0]}
      secondaryColor={theme === "light" ? light[1] : dark[1]}
    />
  );
}
