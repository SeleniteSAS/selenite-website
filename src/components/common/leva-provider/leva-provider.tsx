"use client";

import { Leva } from "leva";
import { type ReactNode, Fragment } from "react";

type LevaProviderProps = Readonly<{ children: ReactNode }>;

export default function LevaProvider({ children }: LevaProviderProps): ReactNode {
  return (
    <Fragment>
      <Leva hidden={process.env.NODE_ENV === "production"} collapsed={true} />
      {children}
    </Fragment>
  );
}
