import { ReactNode } from "react";

import { Session } from "next-auth";

import Header from "@/components/wiki/header/header";

import { auth } from "@/lib/auth";

type WikiSlugLayoutProps = Readonly<{
  children: ReactNode;
  params: {
    slugs: string[];
  };
}>;

export default async function WikiSlugLayout({ children, params: { slugs } }: WikiSlugLayoutProps): Promise<ReactNode> {
  const path: string = slugs.join("/");
  const session: Session | null = await auth();

  return (
    <>
      <Header path={path} session={session} />
      <section className="px-4 text-foreground">{children}</section>
    </>
  );
}
