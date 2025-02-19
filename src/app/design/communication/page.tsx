import { Metadata } from "next";

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
  return (
    <Hero
      title="Communication"
      subtitle="A great idea is nothing without the right words. Every message we share builds a connection, every conversation shapes perception. Clarity inspires trust, consistency reinforces identity, and storytelling turns vision into movement."
      description="This is how we communicate our brand—with purpose, precision, and impact."
    />
  );
}
