import { Fragment, ReactNode } from "react";

import LenisProvider from "@/components/common/lenis-provider/lenis-provider";
import Header from "@/components/website/header/header";
import Lang from "@/components/website/lang/lang";
import ThemeProvider from "@/components/website/theme-provider/theme-provider";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <Fragment>
      <LenisProvider>
        <ThemeProvider>
          <Header />
          {children}
          <Lang />
        </ThemeProvider>
      </LenisProvider>
    </Fragment>
  );
}
