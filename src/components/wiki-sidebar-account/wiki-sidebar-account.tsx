"use client";

import { Session } from "next-auth";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/_ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/_ui/button";
import { logout } from "@/actions/auth/logout";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { env } from "@/lib/env";

type WikiSidebarAccountProps = {
  session: Session | null;
};

export default function WikiSidebarAccount({ session }: WikiSidebarAccountProps) {
  const pathname: string = usePathname();

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      align="center"
      side="bottom"
      sideOffset={4}
    >
      {session?.user ? (
        <>
          <DropdownMenuItem>
            <div className="flex items-center">
              <Image
                src={"/images/defaultuser.jpg"}
                alt={"Profile Picture"}
                width={32}
                height={32}
                className={"size-8 rounded-full"}
              />
              <div className="flex-1">
                <span className="ml-2">{session.user.name}</span>
                <span className="ml-2 block max-w-40 overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form className="w-full">
              <Button size="sm" className="w-full" variant="outline" formAction={logout}>
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`${env.NEXT_PUBLIC_AUTH_URL}/login?redirect=${env.NEXT_PUBLIC_WIKI_URL}${pathname}`}>
              Sign in
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`${env.NEXT_PUBLIC_AUTH_URL}/register?redirect=${env.NEXT_PUBLIC_WIKI_URL}${pathname}`}>
              Register
            </Link>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );
}
