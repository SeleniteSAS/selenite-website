import type { CSSProperties, ReactNode } from "react";

import { SidebarProvider } from "@/components/_ui/sidebar";
import LenisProvider from "@/components/common/lenis-provider/lenis-provider";
import PathProvider from "@/components/common/path-provider/path-provider";
import Header from "@/components/design/header/header";
import Sidebar from "@/components/design/sidebar/sidebar";

type DesignLayoutProps = Readonly<{ children: ReactNode }>;

export default function DesignMainPage({ children }: DesignLayoutProps): ReactNode {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "20rem",
        } as CSSProperties
      }
    >
      <PathProvider>
        <LenisProvider>
          <div className="min-h-screen w-full overflow-hidden bg-white">
            <Header />
            <div className="transition-[padding]">{children}</div>
          </div>
          <Sidebar />
        </LenisProvider>
      </PathProvider>
    </SidebarProvider>
  );
}
