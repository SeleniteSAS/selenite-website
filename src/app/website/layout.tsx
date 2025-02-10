import { ReactNode } from "react";

import Lang from "@/components/common/lang/lang";
import LenisProvider from "@/components/common/lenis-provider/lenis-provider";
import Header from "@/components/website/header/header";
import ThemeProvider from "@/components/website/theme-provider/theme-provider";

type WebsiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <LenisProvider>
      <ThemeProvider>
        <Header />
        {children}
        <Lang />
      </ThemeProvider>
    </LenisProvider>
  );
}
