import { Fragment } from "react";

import { Metadata } from "next";
import { useTranslations } from "next-intl";

import {
  OrbitronDisplayOne,
  OrbitronDisplayThree,
  OrbitronDisplayTwo,
  PoppinsDisplayOne,
  PoppinsDisplayThree,
  PoppinsDisplayTwo,
} from "@/components/design/font-displays/font-displays";
import FontSection from "@/components/design/font-section/font-section";
import Hero from "@/components/wiki/hero/hero";

const title = "Les polices de caractères de Selenite: Lost Contact";

const description =
  "Découvrez les polices de caractères utilisées dans Selenite: Lost Contact. Explorez l'identité visuelle qui donne son style unique au jeu.";

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

export default function FontsPage() {
  const t = useTranslations("Design.Fonts");
  return (
    <Fragment>
      <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />
      <div className="flex flex-col gap-24 px-6 md:gap-36 md:px-24">
        <FontSection
          fontClass="font-orbitron"
          fontName="Orbitron"
          isVariable={{
            wght: true,
            ital: true,
          }}
        >
          <OrbitronDisplayOne />
          <OrbitronDisplayTwo />
          <OrbitronDisplayThree />
        </FontSection>
        <FontSection fontClass="font-poppins" fontName="Poppins" weight={[100, 200, 300, 400, 500, 600, 700, 800, 900]}>
          <PoppinsDisplayOne />
          <PoppinsDisplayTwo />
          <PoppinsDisplayThree />
        </FontSection>
      </div>
    </Fragment>
  );
}
