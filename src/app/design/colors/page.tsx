import { CopyIcon } from "lucide-react";
import { Fragment } from "react";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/_ui/context-menu";

import { getCMYK, getContrasted, getHSL, getRGB } from "@/lib/color";
import { colors } from "@/lib/design-color-theme";
import { cn } from "@/lib/utils";
import Hero from "@/components/wiki/hero/hero";

export default function ColorsPage() {
  return (
    <Fragment>
      <Hero
        title="Colors"
        subtitle="A color defines a side. For humans, blue represents hope and resilience. For aliens, red embodies fear and danger. Each shade tells a story, each hue marks a territory. In a universe where colors signify allegiance, choose your side wisely."
        description="Here are the colors that define our brand. Use them to create a consistent experience for our users."
      />
      <section className="relative min-h-screen w-full px-6 md:px-24 py-12">
        <div className="space-y-4 border border-black p-4">
          {Object.entries(colors).map(([name, colors]: [string, string[]]) => (
            <div key={name} className="w-full">
              <ul className="flex md:h-96 h-[30rem] w-full gap-4 flex-col md:flex-row">
                {colors.map((color: string, i: number) => (
                  <ContextMenu key={color}>
                    <ContextMenuTrigger asChild={true}>
                      <li
                        style={{
                          backgroundColor: color,
                        }}
                        aria-label={color}
                        key={color}
                        className={cn("relative h-full flex-1", color === "#FFFFFF" && "border border-black")}
                      >
                        {i === 0 && (
                          <span
                            className="absolute left-0 top-0 p-4 font-orbitron text-xl font-bold uppercase text-white"
                            style={{
                              color: getContrasted(color),
                            }}
                          >
                            {name}
                          </span>
                        )}
                        <div
                          className="absolute bottom-0 right-0 flex flex-col p-4 text-right font-poppins text-lg"
                          style={{
                            color: getContrasted(color),
                          }}
                        >
                          <span>{color}</span>
                          <span>{getRGB(color)}</span>
                          <span>{getCMYK(color)}</span>
                          <span>{getHSL(color)}</span>
                        </div>
                      </li>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem className="cursor-pointer">
                        <CopyIcon className="mr-2 size-4" />
                        <span>Copy HEX</span>
                      </ContextMenuItem>
                      <ContextMenuItem className="cursor-pointer">
                        <CopyIcon className="mr-2 size-4" />
                        <span>Copy RGB</span>
                      </ContextMenuItem>
                      <ContextMenuItem className="cursor-pointer">
                        <CopyIcon className="mr-2 size-4" />
                        <span>Copy CMYK</span>
                      </ContextMenuItem>
                      <ContextMenuItem className="cursor-pointer">
                        <CopyIcon className="mr-2 size-4" />
                        <span>Copy HSL</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
