import { PenIcon } from "lucide-react";
import { Suspense } from "react";

import type { Session } from "next-auth";

import { buttonVariants } from "@/components/_ui/button";
import { Separator } from "@/components/_ui/separator";
import { SidebarTrigger } from "@/components/_ui/sidebar";
import Avatar from "@/components/wiki/avatar/avatar";
import WikiBreadcrumbsSkeleton from "@/components/wiki/breadcrumb-skeleton/breadcrumb-skeleton";
import WikiBreadcrumbs from "@/components/wiki/breadcrumb/breadcrumb";
import EditButton from "@/components/wiki/edit-button/edit-button";

import { cn } from "@/lib/utils";

type HeaderProps = Readonly<{
  path: string;
  session: Session | null;
}>;

export default function Header({ path, session }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Suspense fallback={<WikiBreadcrumbsSkeleton />}>
          <WikiBreadcrumbs slug={path.replace("/edit", "")} />
        </Suspense>
      </div>
      <div className="flex items-center gap-2 px-4">
        {(!path.includes("/edit") && path !== "/") && (
          <EditButton
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden text-foreground md:inline-flex")}
          >
            <PenIcon className="size-2" />
            Edit
          </EditButton>
        )}
        {!path.includes("/edit") && session?.user && (
          <Separator orientation="vertical" className="mx-2 hidden h-4 md:block" />
        )}
        {session?.user && (
          <Avatar
            src="https://that.image.doesnt.exist.fr"
            alt={session.user.name ?? session.user.email ?? "User"}
            fallback={
              session.user?.name
                ?.split(" ")
                .map((name: string): string => name[0].toUpperCase())
                .join("") ?? "DU"
            }
          />
        )}
      </div>
    </header>
  );
}
