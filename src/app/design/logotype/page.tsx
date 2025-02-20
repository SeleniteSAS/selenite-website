import { Fragment } from "react";

import { useTranslations } from "next-intl";

import ColorSwitch from "@/components/design/color-switcher/color-switcher";
import LogoDisplay from "@/components/design/logo-display/logo-display";
import Hero from "@/components/wiki/hero/hero";

export default function LogotypePage() {
  const t = useTranslations("Design.Logo");
  return (
    <Fragment>
      <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />
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
