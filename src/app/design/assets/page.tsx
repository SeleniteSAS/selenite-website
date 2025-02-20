import { Metadata } from "next";
import { useTranslations } from "next-intl";

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

export default function AssetsPage() {
  const t = useTranslations("Design.Assets");

  return <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />;
}
