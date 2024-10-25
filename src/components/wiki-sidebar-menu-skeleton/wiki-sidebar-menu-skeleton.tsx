import { ReactNode } from "react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from "@/components/_ui/sidebar";
import { Skeleton } from "@/components/_ui/skeleton";

export default function WikiSidebarMenuSkeleton(): ReactNode {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <SidebarGroup key={index}>
          <Skeleton className="mb-2 h-4 w-[90%]" />
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon={true} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
