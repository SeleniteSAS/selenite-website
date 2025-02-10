"use client";

import { Button } from "@/components/_ui/button";
import { Separator } from "@/components/_ui/separator";

import variants, { Variant } from "@/lib/design-logo-items";
import { useLogoStore } from "@/store/logo-store";
import { Color } from "@/types/color";

export default function ColorSwitch() {
  const { name, setName, setColors } = useLogoStore();

  const handleClick = (mainColor: Color, secondaryColor: Color, contrastColor: Color, name: string) => {
    setName(name);
    setColors([mainColor, secondaryColor, contrastColor]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Separator />
      <ul className="flex flex-col flex-wrap items-center justify-center gap-4 xs:flex-row">
        {variants.map((variant: Variant) => (
          <li key={variant.name} className="w-full xs:w-auto">
            <Button
              onClick={(): void => {
                if ("mainColor" in variant) {
                  handleClick(variant.mainColor, variant.secondaryColor, variant.contrastColor, variant.name);
                } else {
                  handleClick(variant.color, variant.color, variant.contrastColor, variant.name);
                }
              }}
              variant={"outline"}
              size={"lg"}
              className="w-full justify-between px-4 xs:w-auto xs:justify-center"
              disabled={name === variant.name}
            >
              <div
                className="size-5 rounded-md"
                style={{ backgroundColor: "mainColor" in variant ? variant.mainColor : variant.color }}
              ></div>
              <span>{variant.name}</span>
            </Button>
          </li>
        ))}
      </ul>
      <Separator />
    </div>
  );
}
