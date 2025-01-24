import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/_ui/breadcrumb";
import { Skeleton } from "@/components/_ui/skeleton";

export default function WikiBreadcrumbsSkeleton() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-[100px]" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className="h-4 w-[100px]" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
