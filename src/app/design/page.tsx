import { Metadata } from "next";

const title = "Selenite: Lost Contact";

const description =
  "Plongez dans l'univers de Selenite: Lost Contact, un jeu de pilotage sur la Lune. Découvrez son histoire, ses visuels et son atmosphère immersive.";

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

export default function DesignMainPage() {
  return <p>Introduction page</p>;
}
