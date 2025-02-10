"use client";

import { Fragment, ReactNode } from "react";

import useMediaQuery from "@/hooks/use-media-query";

type MdOnlyProps = Readonly<{
  children: ReactNode;
}>;

export default function MdOnly({ children }: MdOnlyProps): ReactNode {
  const isMd: boolean = useMediaQuery("(min-width: 768px)");

  return isMd ? <Fragment>{children}</Fragment> : <></>;
}
