"use client";

import { Fragment, type ReactNode } from "react";
import { Leva } from "leva";

type CommonLevaProviderProps = Readonly<{ children: ReactNode }>;

export default function CommonLevaProvider({ children }: CommonLevaProviderProps): ReactNode {
  return (
    <Fragment>
      {process.env.NODE_ENV === "development" && <Leva />}
      {children}
    </Fragment>
  );
}
