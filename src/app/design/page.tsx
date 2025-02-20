import { Metadata } from "next";

import Hero from "@/components/wiki/hero/hero";
import { useTranslations } from "next-intl";

const title = "Selenite: Lost Contact";

const description =
  "Plongez dans l'univers de Selenite: Lost Contact, un jeu de pilotage sur la Lune. Découvrez son histoire, ses visuels et son atmosphère immersive.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/og/og-selenite-live-weare.png"],
  },
  robots: "index, follow",
};

export default function DesignMainPage() {
  const t = useTranslations("Design.Intro");
  return (
    <Hero
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      isIntro={t("cta")}
    />
  );
}
