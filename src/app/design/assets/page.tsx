import { Metadata } from "next";

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
  return (
    <Hero
      title="Illustration"
      subtitle="A symbol is never just a shape. An element carries meaning, shaping perception before a single word is read. Every visual is a bridge between function and emotion, guiding users through a seamless experience."
      description="These are the illustration and iconography principles that define our brand—use them to create a cohesive and memorable experience."
    />
  );
}
