import { Skeleton } from "@/components/_ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/_ui/breadcrumb";

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
