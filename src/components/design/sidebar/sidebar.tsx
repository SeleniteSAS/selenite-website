"use client";

import * as motion from "motion/react-client";
import { Fragment, ReactNode } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar as ShadSidebar, SidebarContent, useSidebar } from "@/components/_ui/sidebar";
import LangSwitcher from "@/components/design/lang-switcher/lang-switcher";

import { items } from "@/lib/design-sidebar-items";
import { cn } from "@/lib/utils";

export default function Sidebar(): ReactNode {
  const { toggleSidebar } = useSidebar();
  const t = useTranslations("Design.Sidebar");
  const pathname: string = usePathname();

  return (
    <ShadSidebar side="right" collapsible="offcanvas" className="border-0" variant="sidebar">
      <SidebarContent className="flex h-full">
        <ul className="flex h-full w-full flex-col bg-[#2E2334] font-poppins text-white">
          {Object.keys(items).map((name) => (
            <Fragment key={name}>
              {name !== "default" && (
                <li className="flex w-full items-center gap-2 uppercase">
                  <div className="h-px flex-1 bg-white"></div>
                  <p className="">{t(name)}</p>
                  <div className="h-px flex-1 bg-white"></div>
                </li>
              )}
              {items[name].map((item, i) => (
                <li
                  key={item.name}
                  className={cn(name === "default" && i !== 0 ? "border-t border-white" : "", "relative w-full flex-1")}
                >
                  <Link href={item.path} className="z-10 flex h-full w-full items-center justify-start p-8">
                    {t(item.name)}
                  </Link>
                  {pathname == item.path && (
                    <motion.div
                      layoutId="sidebar-underline"
                      id="sidebar-underline"
                      className="absolute inset-0 z-0 bg-white/20"
                    ></motion.div>
                  )}
                </li>
              ))}
            </Fragment>
          ))}
          <LangSwitcher />
          <li className="flex w-full flex-1 items-center justify-center border-t border-white">
            <button
              className="flex h-full w-full items-center justify-between gap-4 p-8"
              onClick={() => toggleSidebar()}
            >
              <span className="uppercase">{t("exit")}</span>
              <svg width="25" height="25" viewBox="0 0 342 342" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.81172 0.791305L0.740723 7.8623L334.068 341.19L341.139 334.119L7.81172 0.791305Z"
                  fill="white"
                />
                <path
                  d="M334.509 0.952926L1.13452 334.28L8.20552 341.352L341.58 8.02493L334.509 0.952926Z"
                  fill="white"
                />
              </svg>
            </button>
          </li>
        </ul>
      </SidebarContent>
    </ShadSidebar>
  );
}
