import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/_ui/sidebar";
import AppSidebar from "@/components/wiki-sidebar/wiki-sidebar";
import { Separator } from "@/components/_ui/separator";

type WikiLayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: WikiLayoutProps): ReactNode {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            There will be the breadcrumbs here
          </div>
        </header>
        <section className="px-4">{children}</section>
      </main>
    </SidebarProvider>
  );
}
