import { Fragment, ReactNode } from "react";

import LenisProvider from "@/components/common/lenis-provider/lenis-provider";
import Header from "@/components/website/header/header";
import Lang from "@/components/website/lang/lang";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <Fragment>
      <LenisProvider>
        <Header />
        {children}
        <Lang />
      </LenisProvider>
    </Fragment>
  );
}
