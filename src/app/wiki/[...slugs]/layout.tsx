import { ReactNode, Suspense } from "react";

import { Session } from "next-auth";
import Link from "next/link";

import { buttonVariants } from "@/components/_ui/button";
import { Separator } from "@/components/_ui/separator";
import { SidebarTrigger } from "@/components/_ui/sidebar";
import WikiBreadcrumbsSkeleton from "@/components/wiki/breadcrumb-skeleton/breadcrumb-skeleton";
import WikiBreadcrumbs from "@/components/wiki/breadcrumb/breadcrumb";

import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user";

type WikiSlugLayoutProps = Readonly<{
  children: ReactNode;
  params: {
    slugs: string[];
  };
}>;

export default async function WikiSlugLayout({ children, params: { slugs } }: WikiSlugLayoutProps): Promise<ReactNode> {
  const session: Session | null = await auth();

  const path: string = slugs.join("/");

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Suspense fallback={<WikiBreadcrumbsSkeleton />}>
            <WikiBreadcrumbs slug={path.replace("/edit", "")} />
          </Suspense>
        </div>
        <div className="flex items-center gap-4 px-4">
          {session && session?.user.role === UserRole.ADMIN && !path.includes("/edit") ? (
            <Link href={`/${path}/edit`} className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
              Edit
            </Link>
          ) : null}
          {session && session?.user.role === UserRole.ADMIN && path.includes("/edit") ? (
            <Link
              href={`/${path.replace("/edit", "")}`}
              className={cn(buttonVariants({ variant: "destructive" }), "h-8")}
            >
              Cancel
            </Link>
          ) : null}
        </div>
      </header>
      <section className="px-4">{children}</section>
    </>
  );
}
