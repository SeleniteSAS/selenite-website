import { Fragment } from "react";

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

export default function FontsPage() {
  return (
    <Fragment>
      <Hero
        title="Fonts"
        subtitle="Fonts shape the way we experience a brand. In a universe where typography speaks before words are read, let the right design carry your voice."
        description="These are the fonts that define our brand—use them to craft a seamless and compelling experience."
      />
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
