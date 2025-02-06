import { Fragment } from "react";

import FontSection from "@/components/design/font-section/font-section";
import Hero from "@/components/wiki/hero/hero";

export default function FontsPage() {
  return (
    <Fragment>
      <Hero
        title="Fonts"
        subtitle="Fonts shape the way we experience a brand. In a universe where typography speaks before words are read, let the right design carry your voice."
        description="These are the fonts that define our brand—use them to craft a seamless and compelling experience."
      />
      <div className="flex flex-col gap-24 px-6 md:px-24">
        <FontSection fontClass="font-poppins" fontName="Poppins" weight={[100, 200, 300, 400, 500, 600, 700, 800, 900]}>
          <div className="flex h-full items-center justify-center rounded-lg bg-blue-500 p-6 text-white">Colonne 1</div>
          <div className="flex h-full items-center justify-center rounded-lg bg-green-500 p-6 text-white">
            Colonne 2
          </div>
          <div className="flex h-full items-center justify-center rounded-lg bg-red-500 p-6 text-white">Colonne 3</div>
        </FontSection>
        <FontSection
          fontClass="font-orbitron"
          fontName="Orbitron"
          isVariable={{
            wght: true,
            ital: true,
          }}
        >
          <div className="flex h-full items-center justify-center rounded-lg bg-blue-500 p-6 text-white">Colonne 1</div>
          <div className="flex h-full items-center justify-center rounded-lg bg-green-500 p-6 text-white">
            Colonne 2
          </div>
          <div className="flex h-full items-center justify-center rounded-lg bg-red-500 p-6 text-white">Colonne 3</div>
        </FontSection>
      </div>
    </Fragment>
  );
}
