"use client";

import { Leva } from "leva";
import { type ReactNode, Fragment } from "react";

type CommonLevaProviderProps = Readonly<{ children: ReactNode }>;

export default function CommonLevaProvider({ children }: CommonLevaProviderProps) {
  return (
    <Fragment>
      <Leva hidden={process.env.NODE_ENV === "production"} />
      {children}
    </Fragment>
  );
}
