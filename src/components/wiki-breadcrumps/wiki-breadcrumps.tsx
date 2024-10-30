import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/_ui/breadcrumb";
import { Fragment } from "react";

type WikiBreadcrumbsProps = Readonly<{ slug: string }>;

export default async function WikiBreadcrumbs({ slug }: WikiBreadcrumbsProps) {
  const labels: string[] = await WikiArticlesService.getParentArticlesLabelBySlug(slug);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {labels.map((label: string, index: number) => (
          <Fragment key={index}>
            <BreadcrumbItem key={slug}>
              <BreadcrumbLink
                href={`/${slug
                  .split("/")
                  .slice(0, index + 1)
                  .join("/")}`}
              >
                {label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < labels.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
