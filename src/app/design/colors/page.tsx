import { CopyIcon } from "lucide-react";
import { Fragment } from "react";

import { Metadata } from "next";
import { useTranslations } from "next-intl";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/_ui/context-menu";
import Hero from "@/components/wiki/hero/hero";

import { getCMYK, getContrasted, getHSL, getRGB } from "@/lib/color";
import { colors } from "@/lib/design-color-theme";
import { cn } from "@/lib/utils";

const title = "Palette de couleurs de Selenite: Lost Contact - Identité visuelle et ambiance";
const description =
  "Explorez la palette de couleurs de Selenite: Lost Contact. Découvrez comment nos choix chromatiques renforcent l'ambiance immersive et l'identité visuelle du jeu.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/banner.png"],
  },
  robots: "index, follow",
};

export default function ColorsPage() {
  const t = useTranslations("Design.Colors");

  return (
    <Fragment>
      <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />
      <section className="relative min-h-screen w-full px-6 py-12 md:px-24">
        <div className="space-y-4 border border-black p-4">
          {Object.entries(colors).map(([name, colors]: [string, string[]]) => (
            <div key={name} className="w-full">
              <ul className="flex h-[30rem] w-full flex-col gap-4 md:h-96 md:flex-row">
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
