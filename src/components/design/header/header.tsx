"use client";

import { ReactNode } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/_ui/button";
import { useSidebar } from "@/components/_ui/sidebar";

import { items } from "@/lib/design-sidebar-items";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

export default function Header(): ReactNode {
  const { toggleSidebar, state } = useSidebar();
  const pathname: string = usePathname();
  const flattenItems = Object.values(items).flat();
  const t = useTranslations("Design.Sidebar");

  return (
    <header
      className={cn("fixed left-0 top-6 z-50 h-16 w-full transition-[width] md:top-12")}
      style={{
        width: state === "expanded" ? "calc(100% - var(--sidebar-width))" : "100%",
      }}
    >
      <div
        className={cn(
          "mx-auto flex h-16 justify-between px-6 transition-[padding] sm:px-12 md:px-24",
          state === "expanded" && "px-8",
        )}
      >
        <Link href={env.NEXT_PUBLIC_ROOT_URL} className="flex h-fit items-center font-orbitron text-xl sm:text-2xl">
          <Image
            src={"/images/studio-logo.png"}
            alt={"SELENITE STUDIO"}
            width={64}
            height={64}
            className={"relative size-12 rounded md:size-16"}
          />
          <span className="relative ml-4 text-black">SELENITE STUDIO</span>
        </Link>
        <Button
          onClick={(): void => toggleSidebar()}
          className={"group h-fit flex-col p-0 pt-4 text-black no-underline hover:no-underline active:no-underline"}
          variant={"link"}
        >
          <span className="flex h-4 w-6 origin-top flex-col justify-between border-0 transition-[height] group-hover:h-6">
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
            }}
            className="mt-6 font-poppins text-lg font-light text-black"
          >
            {t(flattenItems.find((item): boolean => item.path === pathname)?.name ?? "default")}
          </span>
        </Button>
      </div>
    </header>
  );
}
