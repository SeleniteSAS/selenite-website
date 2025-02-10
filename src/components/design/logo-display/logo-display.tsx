"use client";

import { Logo, Text } from "@/components/common/logo/logo";

import { useLogoStore } from "@/store/logo-store";

type LogoDisplayProps = Readonly<{
  type: "logo" | "baseline";
}>;

export default function LogoDisplay({ type }: LogoDisplayProps) {
  const { colors } = useLogoStore();

  return (
    <div
      className="flex items-center justify-center rounded-md border border-black px-4 sm:px-8 py-16"
      style={{ backgroundColor: colors[2], color: colors[0] }}
    >
      {type === "logo" && <Logo mainColor={colors[0]} secondaryColor={colors[1]} size={400} />}
      {type === "baseline" && <Text mainColor={colors[0]} secondaryColor={colors[1]} size={700} />}
    </div>
  );
}
