import { Fragment, ReactNode } from "react";
import Header from "@/components/website/header/header";
import Lang from "@/components/website/lang/lang";
import LenisProvider from "@/components/common/lenis-provider/lenis-provider";

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
