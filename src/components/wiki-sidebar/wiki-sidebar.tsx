import React, { ReactNode, Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/_ui/sidebar";
import { AlbumIcon, ChevronsRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/_ui/dropdown-menu";
import WikiSidebarMenu from "@/components/wiki-sidebar-menu/wiki-sidebar-menu";
import WikiSidebarMenuSkeleton from "@/components/wiki-sidebar-menu-skeleton/wiki-sidebar-menu-skeleton";

export default function WikiSidebar(): ReactNode {
  return (
    <Sidebar collapsible={"icon"} side={"left"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <AlbumIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Selenite Lost Contact</span>
                    <span className="truncate text-xs">Official Documentation</span>
                  </div>
                  <ChevronsRightIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">Content</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<WikiSidebarMenuSkeleton />}>
          <WikiSidebarMenu />
        </Suspense>
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*</SidebarFooter>*/}
    </Sidebar>
  );
}
