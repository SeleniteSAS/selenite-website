import { ReactNode } from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton as SidebarMenuSkeletonComponent,
} from "@/components/_ui/sidebar";
import { Skeleton } from "@/components/_ui/skeleton";

export default function SidebarMenuSkeleton(): ReactNode {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <SidebarGroup key={index}>
          <Skeleton className="mb-2 h-4 w-[90%]" />
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeletonComponent showIcon={true} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
