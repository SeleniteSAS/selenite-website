"use client";

import { Fragment, type ReactNode } from "react";

import { Leva } from "leva";

type LevaProviderProps = Readonly<{ children: ReactNode }>;

export default function LevaProvider({ children }: LevaProviderProps): ReactNode {
  return (
    <Fragment>
      <Leva hidden={process.env.NODE_ENV === "production"} collapsed={true} />
      {children}
    </Fragment>
  );
}
