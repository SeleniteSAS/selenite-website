import React, { ReactNode, Suspense } from "react";
import { SidebarTrigger } from "@/components/_ui/sidebar";
import { Separator } from "@/components/_ui/separator";
import WikiBreadcrumbs from "@/components/wiki-breadcrumps/wiki-breadcrumps";
import WikiBreadcrumbsSkeleton from "@/components/wiki-breadcrumps-skeleton/wiki-breadcrumps-skeleton";

type WikiSlugLayoutProps = Readonly<{
  children: ReactNode;
  params: {
    slugs: string[];
  };
}>;

export default async function WikiSlugLayout({ children, params: { slugs } }: WikiSlugLayoutProps): Promise<ReactNode> {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Suspense fallback={<WikiBreadcrumbsSkeleton />}>
            <WikiBreadcrumbs slug={slugs.join("/")} />
          </Suspense>
        </div>
      </header>
      <section className="px-4">{children}</section>
    </>
  );
}
