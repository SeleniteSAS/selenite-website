import { Fragment } from "react";

import ColorSwitch from "@/components/design/color-switcher/color-switcher";
import LogoDisplay from "@/components/design/logo-display/logo-display";
import Hero from "@/components/wiki/hero/hero";

export default function LogotypePage() {
  return (
    <Fragment>
      <Hero
        title="Logotype"
        subtitle="A symbol is more than just a shape-it carries meaning, history, and purpose. For Selenite, the lunar eclipse is more than a celestial event; it is a beacon of mystery and survival."
        description=" This is the emblem of Selenite. A mark of exploration, danger, and the fight for humanity's survival."
      />
      <div className="flex flex-col gap-24 px-6 pb-8 text-black md:gap-56 md:px-24 md:pb-96">
        <div className="space-y-8">
          <ColorSwitch />
          <LogoDisplay type="logo" />
        </div>
        <div className="space-y-8">
          <ColorSwitch />
          <LogoDisplay type="baseline" />
        </div>
      </div>
    </Fragment>
  );
}
