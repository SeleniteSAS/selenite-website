"use client";

import { Fragment, type ReactNode } from "react";
import { Leva } from "leva";

type CommonLevaProviderProps = Readonly<{ children: ReactNode }>;

export default function CommonLevaProvider({ children }: CommonLevaProviderProps): ReactNode {
  const displayLeva: boolean = process.env.NODE_ENV === "development";
  return (
    <Fragment>
      <Leva hidden={!displayLeva} />
      {children}
    </Fragment>
  );
}
