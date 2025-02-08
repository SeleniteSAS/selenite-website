"use client";

import { cn } from "@/lib/utils";

type BoldCopyProps = Readonly<{
  text: string;
  className?: string;
  textClassName?: string;
  backgroundTextClassName?: string;
}>;

export default function BoldCopy({
  text = "Demo text",
  className,
  textClassName,
  backgroundTextClassName,
}: BoldCopyProps) {
  if (!text?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative flex h-full w-full items-center justify-center overflow-hidden bg-background px-2 py-2 md:px-6 md:py-4",
        className,
      )}
    >
      <div
        className={cn(
          "text-center text-3xl font-bold uppercase text-foreground/15 transition-all group-hover:opacity-50 md:text-6xl",
          backgroundTextClassName,
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          "text-md absolute text-center font-bold uppercase text-foreground transition-all group-hover:text-2xl md:text-2xl group-hover:md:text-6xl",
          textClassName,
        )}
      >
        {text}
      </div>
    </div>
  );
}
