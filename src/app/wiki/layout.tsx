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
        <main className="w-full">{children}</main>
      </ThemeProvider>
    </SidebarProvider>
  );
}
