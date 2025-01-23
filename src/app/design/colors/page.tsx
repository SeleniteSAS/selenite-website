import { Fragment } from "react";
import { colors } from "@/lib/design-color-theme";
import { cn } from "@/lib/utils";
import { getCMYK, getContrasted, getHSL, getRGB } from "@/lib/color";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/_ui/context-menu";
import { CopyIcon } from "lucide-react";

export default function DesignMainPage() {
  return (
    <Fragment>
      <section className="flex h-[calc(100vh-10rem)] w-full flex-col items-start justify-center px-24 pb-32 font-poppins text-black">
        <div>
          <div className="flex items-center gap-8 px-8">
            <h1
              className="text-xl font-bold uppercase"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              Colors
            </h1>
            <h3 className="text-3xl">
              A color defines a side. For humans, blue represents hope and resilience. For aliens, red embodies fear and
              danger. Each shade tells a story, each hue marks a territory. In a universe where colors signify
              allegiance, choose your side wisely.
            </h3>
          </div>
          <p className="mt-8 text-center text-xl">
            Here are the colors that define our brand. Use them to create a consistent experience for our users.
          </p>
          <svg
            width="42"
            height="42"
            viewBox="0 0 341 344"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-16"
          >
            <path
              d="M0.550049 7.14977L7.65063 0.0497901L170.75 163.15L333.85 0.0498044L340.95 7.14978L170.75 177.35L0.550049 7.14977Z"
              fill="black"
            />
            <path
              d="M0.550049 173.75L7.65063 166.75L170.75 329.85L333.85 166.75L340.95 173.75L170.75 343.95L0.550049 173.75Z"
              fill="black"
            />
          </svg>
        </div>
      </section>
      <section className="relative min-h-screen w-full px-24 py-12">
        <div className="space-y-4 border border-black p-4">
          {Object.entries(colors).map(([name, colors]: [string, string[]]) => (
            <div key={name} className="w-full">
              <ul className="flex h-96 w-full gap-4">
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
