import { CogIcon, MoonIcon, PenIcon, PlusIcon, SunIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";

import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/_ui/alert";
import { Button, buttonVariants } from "@/components/_ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/_ui/dropdown-menu";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu as SidebarMenuComponent,
  SidebarMenuItem,
} from "@/components/_ui/sidebar";
import CreateButton from "@/components/wiki/create-button/create-button";
import EditButton from "@/components/wiki/edit-button/edit-button";
import Logo from "@/components/wiki/logo/logo";
import SidebarMenuSkeleton from "@/components/wiki/sidebar-menu-skeleton/sidebar-menu-skeleton";
import SidebarMenu from "@/components/wiki/sidebar-menu/sidebar-menu";
import SidebarX from "@/components/wiki/sidebar-x/sidebar-x";
import ThemeButton from "@/components/wiki/theme-button/theme-button";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

export default async function Sidebar() {
  const session: Session | null = await auth();
  const t = await getTranslations("Wiki");

  return (
    <SidebarComponent collapsible={"offcanvas"} side={"left"} variant="floating" className="z-10">
      <SidebarHeader className="px-4 pt-4">
        <SidebarMenuComponent>
          <SidebarMenuItem className="relative">
            <h3 className="relative z-10 text-center font-orbitron text-3xl font-bold uppercase">
              <Link href={`${env.NEXT_PUBLIC_ROOT_URL}`}>Selenite</Link>
            </h3>
            <h4 className="relative z-10 text-center font-poppins text-sm font-light uppercase tracking-wide">
              <Link href={`${env.NEXT_PUBLIC_WIKI_URL}`}>Official Documentation</Link>
            </h4>
            <Logo className="absolute left-1/2 top-1/2 z-0 size-20 -translate-x-1/2 -translate-y-1/2" size={400} />
          </SidebarMenuItem>
        </SidebarMenuComponent>
        <SidebarX />
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <Alert className="p-2">
          <AlertTitle className="text-md w-full text-center font-semibold">{t("title")}</AlertTitle>
          <AlertDescription className="text-center text-xs">{t("description")}</AlertDescription>
        </Alert>
        <Suspense fallback={<SidebarMenuSkeleton />}>
          <SidebarMenu />
        </Suspense>
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4">
        <ul className="w-hull flex gap-4">
          <li className="flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="w-full">
                  <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
                  <span className="sr-only">Change theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" sideOffset={12} className="flex flex-col gap-2">
                <DropdownMenuLabel>Update theme :</DropdownMenuLabel>
                <ThemeButton theme="light">
                  <SunIcon />
                  <span>Light</span>
                </ThemeButton>
                <ThemeButton theme="dark">
                  <MoonIcon />
                  <span>Dark</span>
                </ThemeButton>
                <ThemeButton theme="system">
                  <CogIcon />
                  <span>System</span>
                </ThemeButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="flex-1">
            <EditButton className={cn(buttonVariants({ size: "icon" }), "w-full")}>
              <span className="sr-only">Edit this page</span>
              <PenIcon />
            </EditButton>
          </li>
          {session?.user && (
            <li className="flex-1">
              <CreateButton className={cn(buttonVariants({ size: "icon" }), "w-full")}>
                <span className="sr-only">Create a new page</span>
                <PlusIcon />
              </CreateButton>
            </li>
          )}
          <li className="flex-1">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="icon" className="w-full">
                    <UserIcon />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" sideOffset={12} className="flex flex-col gap-2">
                  <DropdownMenuLabel>Account Settings :</DropdownMenuLabel>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className={cn(buttonVariants({ size: "icon" }), "w-full")}
                href={`${env.NEXT_PUBLIC_AUTH_URL}/login`}
              >
                <UserIcon />
                <span className="sr-only">Log into your account</span>
              </Link>
            )}
          </li>
        </ul>
      </SidebarFooter>
    </SidebarComponent>
  );
}
