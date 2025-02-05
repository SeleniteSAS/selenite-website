import { PenIcon } from "lucide-react";
import { ReactNode, Suspense } from "react";

import { buttonVariants } from "@/components/_ui/button";
import { Separator } from "@/components/_ui/separator";
import { SidebarTrigger } from "@/components/_ui/sidebar";
import WikiBreadcrumbsSkeleton from "@/components/wiki/breadcrumb-skeleton/breadcrumb-skeleton";
import WikiBreadcrumbs from "@/components/wiki/breadcrumb/breadcrumb";
import EditButton from "@/components/wiki/edit-button/edit-button";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import Avatar from "@/components/wiki/avatar/avatar";

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
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Suspense fallback={<WikiBreadcrumbsSkeleton />}>
            <WikiBreadcrumbs slug={path.replace("/edit", "")} />
          </Suspense>
        </div>
        <div className="px-4 flex items-center gap-2">
          {!path.includes("/edit") && (
            <EditButton className={cn(buttonVariants({ variant: "outline" }), "text-foreground")}>
              <PenIcon className="size-2" />
              Edit
            </EditButton>
          )}
          {session?.user && (
            <Avatar
              src="https://that.image.doesnt.exist.fr"
              alt={session.user.name || session.user.email || "User"}
              fallback={
                session.user?.name?.split(" ").map((name: string) => name[0].toUpperCase()).join("") || "DU"
              }
            />
          )}
        </div>
        
      </header>
      <section className="px-4">{children}</section>
    </>
  );
}
