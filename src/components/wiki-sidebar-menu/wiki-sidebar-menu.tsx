import React, { JSX } from "react";
import { WikiNavigation, WikiNavigationGroup, WikiNavigationItem } from "@/types/wiki-navigation";
import WikiNavigationServices from "@/services/wiki-navigation/wiki-navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/_ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/_ui/collapsible";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default async function WikiSidebarMenu(): Promise<JSX.Element> {
  const navigationItems: WikiNavigation[] = await WikiNavigationServices.getNavigationItem();

  return (
    <>
      {navigationItems.map(({ title, items }: WikiNavigation) => (
        <SidebarGroup key={title}>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item: WikiNavigationGroup) => (
              <Collapsible key={item.title} asChild={true} defaultOpen={false}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild={true} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRightIcon />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem: WikiNavigationItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
