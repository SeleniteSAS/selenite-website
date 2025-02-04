import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { CogIcon, MoonIcon, PenIcon, PlusIcon, SunIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";

import { Session } from "next-auth";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/_ui/alert";
import { Button, buttonVariants } from "@/components/_ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/_ui/dropdown-menu";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu as SidebarMenuComponent,
  SidebarMenuItem,
} from "@/components/_ui/sidebar";
import EditButton from "@/components/wiki/edit-button/edit-button";
import SidebarMenuSkeleton from "@/components/wiki/sidebar-menu-skeleton/sidebar-menu-skeleton";
import SidebarMenu from "@/components/wiki/sidebar-menu/sidebar-menu";
import ThemeButton from "@/components/wiki/theme-button/theme-button";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import Logo from "@/components/wiki/logo/logo";

export default async function Sidebar() {
  const session: Session | null = await auth();

  return (
    <SidebarComponent collapsible={"offcanvas"} side={"left"} variant="floating">
      <SidebarHeader className="px-4 pt-4">
        <SidebarMenuComponent>
          <SidebarMenuItem className="relative">
            <h3 className="text-center font-orbitron text-3xl font-bold uppercase relative z-10">Selenite</h3>
            <h4 className="text-center font-poppins text-sm font-light uppercase tracking-wide relative z-10">
              Official Documentation
            </h4>
            <Logo className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-20 z-0" size={400} />
          </SidebarMenuItem>
        </SidebarMenuComponent>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <Alert className="p-2">
          <AlertTitle className="text-md w-full text-center font-semibold">Welcome to the wiki !</AlertTitle>
          <AlertDescription className="text-center text-xs">
            Please check the{" "}
            <Link href="/contribute" className="cursor-pointer underline">
              contribute
            </Link>{" "}
            page.
          </AlertDescription>
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
                <DropdownMenuItem asChild>
                  <ThemeButton theme="light" variant="outline" className="justify-start">
                    <SunIcon />
                    <span>Light</span>
                  </ThemeButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ThemeButton theme="dark" variant="outline" className="justify-start">
                    <MoonIcon />
                    <span>Dark</span>
                  </ThemeButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ThemeButton theme="system" variant="outline" className="justify-start">
                    <CogIcon />
                    <span>System</span>
                  </ThemeButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="flex-1">
            <EditButton
              className={cn(buttonVariants({ size: "icon" }), "w-full")}
              href={session ? "/profile" : `${env.NEXT_PUBLIC_AUTH_URL}/login`}
            >
              <PenIcon />
            </EditButton>
          </li>
          {session?.user && (
            <li className="flex-1">
              <Link
                className={cn(buttonVariants({ size: "icon" }), "w-full")}
                href={`${env.NEXT_PUBLIC_WIKI_URL}/new`}
              >
                <PlusIcon />
              </Link>
            </li>
          )}
          <li className="flex-1">
            <Link
              className={cn(buttonVariants({ size: "icon" }), "w-full")}
              href={session ? "/profile" : `${env.NEXT_PUBLIC_AUTH_URL}/login`}
            >
              <UserIcon />
            </Link>
          </li>
        </ul>
      </SidebarFooter>
    </SidebarComponent>
  );
}
