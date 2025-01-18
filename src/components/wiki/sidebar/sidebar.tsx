import React, { Fragment, Suspense } from "react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu as SidebarMenuComponent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/_ui/sidebar";
import { AlbumIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/_ui/dropdown-menu";
import SidebarMenu from "@/components/wiki/sidebar-menu/sidebar-menu";
import SidebarMenuSkeleton from "@/components/wiki/sidebar-menu-skeleton/sidebar-menu-skeleton";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import SidebarAccount from "@/components/wiki/sidebar-account/sidebar-account";
import { buttonVariants } from "@/components/_ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Sidebar() {
  const session: Session | null = await auth();

  return (
    <SidebarComponent collapsible={"icon"} side={"left"}>
      <SidebarHeader>
        <SidebarMenuComponent>
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
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <SidebarAccount session={session} />
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenuComponent>
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<SidebarMenuSkeleton />}>
          <SidebarMenu />
        </Suspense>
      </SidebarContent>
      {session?.user && session?.user.role === "ADMIN" ? (
        <SidebarFooter>
          <Link href="/new" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
            New Page
          </Link>
        </SidebarFooter>
      ) : (
        <Fragment />
      )}
    </SidebarComponent>
  );
}
