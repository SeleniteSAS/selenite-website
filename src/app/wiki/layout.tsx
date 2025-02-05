import { ReactNode } from "react";

import { SidebarProvider } from "@/components/_ui/sidebar";
import AppSidebar from "@/components/wiki/sidebar/sidebar";
import ThemeProvider from "@/components/wiki/theme-provider/theme-provider";

type WikiLayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: WikiLayoutProps): ReactNode {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <AppSidebar />
        <main className="w-full z-10">{children}</main>
        <div className="fixed w-screen h-screen inset-0 bg-background pointer-events-none z-0"></div>
      </ThemeProvider>
    </SidebarProvider>
  );
}
