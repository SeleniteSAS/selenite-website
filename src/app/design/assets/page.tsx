import { Fragment } from "react";

import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Separator } from "@/components/_ui/separator";
import Hero from "@/components/wiki/hero/hero";

const title = "Assets, illustrations et icônes de Selenite: Lost Contact";

const description =
  "Découvrez les assets visuels de Selenite: Lost Contact. Illustrations, icônes et éléments graphiques, explorez le travail artistique qui façonne l'univers unique du jeu.";

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

const icons: { label: string; src: string }[] = [
  {
    label: "iconsItems.global",
    src: "XMLID_20_.svg",
  },
  {
    label: "iconsItems.lang",
    src: "XMLID_21_.svg",
  },
  {
    label: "iconsItems.out",
    src: "XMLID_50_.svg",
  },
  {
    label: "iconsItems.down",
    src: "XMLID_61_.svg",
  },
  {
    label: "iconsItems.planet",
    src: "XMLID_64_.svg",
  },
  {
    label: "iconsItems.center",
    src: "XMLID_74_.svg",
  },
  {
    label: "iconsItems.page",
    src: "XMLID_80_.svg",
  },
  {
    label: "iconsItems.cross",
    src: "XMLID_88_.svg",
  },
  {
    label: "iconsItems.corner",
    src: "XMLID_100_.svg",
  },
  {
    label: "iconsItems.reticula",
    src: "XMLID_119_.svg",
  },
  {
    label: "iconsItems.target",
    src: "XMLID_133_.svg",
  },
];

const assets: { label: string; src: string }[] = [
  {
    label: "poster",
    src: "affiche.png",
  },
  {
    label: "poster1",
    src: "affiche1.png",
  },
  {
    label: "poster2",
    src: "affiche2.png",
  },
  {
    label: "cover",
    src: "jaquette-de-face.png",
  },
  {
    label: "cover1",
    src: "jaquette-ouverte-exterieur.png",
  },
  {
    label: "cover2",
    src: "jaquette-ouverte-interieur.png",
  },
];

export default function AssetsPage() {
  const t = useTranslations("Design.Assets");

  return (
    <Fragment>
      <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />
      <section className="px-6 pb-8">
        <div>
          <Separator />
          <h2 className="my-4 text-center text-2xl font-bold uppercase text-black">{t("icons")}</h2>
          <Separator />
        </div>
        <div>
          <ul className="my-8 flex flex-wrap justify-center gap-8">
            {icons.map((icon) => (
              <li key={icon.label}>
                <Image
                  src={`/images/icons/${icon.src}`}
                  alt={t(icon.label)}
                  className="h-16 w-16"
                  width={64}
                  height={64}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-32">
          <Separator />
          <h2 className="my-4 text-center text-2xl font-bold uppercase text-black">{t("assets")}</h2>
          <Separator />
        </div>
        <div>
          <ul className="mx-0 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-16 md:grid-cols-4">
            {assets.map((asset, index) => (
              <li key={asset.label} className={index % 3 === 0 ? "row-span-2" : ""}>
                <Image
                  src={`/images/assets/${asset.src}`}
                  alt={t(asset.label)}
                  className="h-full w-full object-cover"
                  width={400}
                  height={index % 3 === 0 ? 800 : 400}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-32">
          <Separator />
          <h2 className="my-4 text-center text-2xl font-bold uppercase text-black">{t("ingame")}</h2>
          <Separator />
        </div>
        <div className="flex flex-wrap my-8 space-y-8">
          <div className="w-full md:w-1/2 flex items-center justify-between sm:px-8 gap-4 px-0 flex-wrap">
            <Image src="/images/ingame/bluemenu.svg" alt={t("ingame.bluemenu")} width={200} height={40}  className="flex-1"/>
            <Image src="/images/ingame/redmenu.svg" alt={t("ingame.redmenu")} width={200} height={40} className="flex-1"/>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-between px-8">
            <Image src="/images/ingame/aim.svg" alt={t("ingame.aim")} width={64} height={64} />
            <Image src="/images/ingame/aim-outpost.svg" alt={t("ingame.aimoutpost")} width={64} height={64} />
            <Image src="/images/ingame/target.svg" alt={t("ingame.target")} width={64} height={64} />
            <Image src="/images/ingame/target-outpost.svg" alt={t("ingame.targetoutpost")} width={64} height={64} />
            <Image src="/images/ingame/arrow.svg" alt={t("ingame.arrow")} width={64} height={64} className="size-8"/>
            <Image src="/images/ingame/cursor.svg" alt={t("ingame.cursor")} width={64} height={64} />
          </div>
          <div className="w-full flex items-center justify-center px-8">
            <Image src="/images/ingame/boostbar.svg" alt={t("ingame.boostbar")} width={40} height={140} />
            <Image src="/images/ingame/aimzone.svg" alt={t("ingame.aimzone")} width={400} height={130} />
            <Image src="/images/ingame/healbar.svg" alt={t("ingame.healbar")} width={40} height={140} />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
