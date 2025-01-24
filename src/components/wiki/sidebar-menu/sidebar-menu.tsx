import { ChevronRightIcon } from "lucide-react";
import { JSX } from "react";

import Link from "next/link";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/_ui/collapsible";
import Icon from "@/components/_ui/icon";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenu as SidebarMenuComponent,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/_ui/sidebar";

import { getNavigationItems } from "@/services/wiki-navigation/wiki-navigation";
import { WikiNavigation, WikiNavigationGroup, WikiNavigationItem } from "@/types/wiki-navigation";

export default async function SidebarMenu(): Promise<JSX.Element> {
  const navigationItems: WikiNavigation[] = await getNavigationItems();

  return (
    <>
      {navigationItems.map(({ title, items }: WikiNavigation) => (
        <SidebarGroup key={title}>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarMenuComponent>
            {items.map((item: WikiNavigationGroup) => (
              <Collapsible key={item.title} asChild={true} defaultOpen={false}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild={true} tooltip={item.title}>
                    <Link href={item.url}>
                      <Icon name={item.icon ?? "home"} />
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
          </SidebarMenuComponent>
        </SidebarGroup>
      ))}
    </>
  );
}
