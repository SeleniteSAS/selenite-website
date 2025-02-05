import { Fragment, type ReactNode } from "react";

import { Session } from "next-auth";

import Header from "@/components/wiki/header/header";

import { auth } from "@/lib/auth";

export default async function WikiPage(): Promise<ReactNode> {
  const session: Session | null = await auth();
  return (
    <Fragment>
      <Header session={session} path="/" />
      <section className="p-4 text-foreground">
        This is the main page
      </section>
    </Fragment>
  );
}
