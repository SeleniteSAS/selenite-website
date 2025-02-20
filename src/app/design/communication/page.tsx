import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Hero from "@/components/wiki/hero/hero";

const title = "Plan de communication de Selenite: Lost Contact";
const description =
  "Découvrez la stratégie de communication de Selenite: Lost Contact. De la promotion sur les réseaux sociaux aux partenariats, explorez comment nous partageons notre univers avec la communauté.";

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

export default function CommuninationPage() {
  const t = useTranslations("Design.Communication");

  return <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />;
}
