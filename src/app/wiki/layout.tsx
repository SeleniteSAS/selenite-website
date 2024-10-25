import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/_ui/sidebar";
import AppSidebar from "@/components/wiki-sidebar/wiki-sidebar";

type WikiLayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: WikiLayoutProps): ReactNode {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
