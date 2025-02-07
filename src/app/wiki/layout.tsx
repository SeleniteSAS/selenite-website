import type { CSSProperties, ReactNode } from "react";

import { SidebarProvider } from "@/components/_ui/sidebar";
import AppSidebar from "@/components/wiki/sidebar/sidebar";
import ThemeProvider from "@/components/wiki/theme-provider/theme-provider";

type WikiLayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: WikiLayoutProps): ReactNode {
  return (
    <ThemeProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem !important",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <main className="z-10 w-full">{children}</main>
        <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-background"></div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
