import { ReactNode } from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton as SidebarMenuSkeletonComponent,
} from "@/components/_ui/sidebar";
import { Skeleton } from "@/components/_ui/skeleton";

export default function SidebarMenuSkeleton(): ReactNode {
  return Array.from({ length: 2 }).map((_, index) => {
    const groupId = `group-${index}-${Math.random()}`;
    return (
      <SidebarGroup key={groupId}>
        <Skeleton className="mb-2 h-4 w-[90%]" />
        <SidebarMenu>
          {Array.from({ length: 5 }).map((_, index) => {
            const itemId = `item-${index}-${Math.random()}`;
            return (
              <SidebarMenuItem key={itemId}>
                <SidebarMenuSkeletonComponent showIcon={true} />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  });
}
