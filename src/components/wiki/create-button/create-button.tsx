"use client";

import { ComponentProps, ReactNode } from "react";

import Link from "next/link";

import { useSidebar } from "@/components/_ui/sidebar";

import { env } from "@/lib/env";

type CreateButtonProps = Omit<ComponentProps<typeof Link>, "href">;

export default function CreateButton(props: CreateButtonProps): ReactNode {
  const { setOpenMobile } = useSidebar();

  const handleClick = () => {
    setOpenMobile(false);
  };

  return <Link {...props} href={`${env.NEXT_PUBLIC_WIKI_URL}/new`} onClick={handleClick} />;
}
