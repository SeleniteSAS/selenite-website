"use client";

import { useState } from "react";

import { Logo, Text } from "@/components/common/logo/logo";

import variants from "@/lib/design-logo-items";
import { cn } from "@/lib/utils";

type LogoDisplayProps = Readonly<{
  logo: "meatball" | "text";
  title: string;
}>;

export default function LogoDisplay({ logo, title }: LogoDisplayProps) {
  const [current, setCurrent] = useState(0);

  const handleChange = (i: number) => setCurrent(i);

  return (
    <div className="flex h-full w-full items-center">
      <div className="flex flex-1 items-center justify-center space-x-48">
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {variants.map((variant, i) => {
            let color: string;

            if ("mainColor" in variant) {
              color = variant.mainColor !== "#000000" && variant.mainColor !== "#FFFFFF"
                ? variant.mainColor
                : variant.secondaryColor;
            } else {
              color = variant.color;
            }

            return (
              <li key={variant.name}>
                <button className="relative" onClick={() => handleChange(i)}>
                  <div
                    className={cn(
                      "h-12 w-36 rounded",
                      color === "#FFFFFF" || (color === "#F8F7F5" && "border-2 border-black"),
                    )}
                    style={{
                      backgroundColor: color,
                      color: variant.contrastColor,
                    }}
                  ></div>
                  <div
                    className={cn(
                      "absolute left-3/4 top-1/2 flex h-12 w-36 items-center justify-center rounded border-2 border-black bg-white",
                      current === i && "underline",
                    )}
                  >
                    {variant.name}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex h-full flex-col items-center justify-center">
          <div
            className={cn(
              "relative px-36 py-24",
              variants[current].contrastColor === "#FFFFFF" && "border-2 border-black",
            )}
            style={{
              backgroundColor: variants[current].contrastColor,
            }}
          >
            {logo === "meatball" ? (
              <Logo
                size={170}
                mainColor={"mainColor" in variants[current] ? variants[current].mainColor : variants[current].color}
                secondaryColor={
                  "secondaryColor" in variants[current] ? variants[current].secondaryColor : variants[current].color
                }
              />
            ) : (
              <Text
                size={300}
                mainColor={"mainColor" in variants[current] ? variants[current].mainColor : variants[current].color}
                secondaryColor={
                  "secondaryColor" in variants[current] ? variants[current].secondaryColor : variants[current].color
                }
              />
            )}
            <h3
              className="absolute bottom-2 left-0 w-full text-center font-orbitron text-xl uppercase"
              style={{
                color: variants[current].contrastColor === "#FFFFFF" ? "#000000" : "#FFFFFF",
              }}
            >
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
