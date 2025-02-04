"use client";

import { ComponentProps, ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type EditButtonProps = ComponentProps<typeof Link>;

export default function EditButton(props: EditButtonProps): ReactNode {
  const pathname: string = usePathname();

  return <Link {...props} href={pathname.includes("/edit") ? pathname.replace("/edit", "") : `${pathname}/edit`} />;
}
