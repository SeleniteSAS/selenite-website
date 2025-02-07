import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/_ui/breadcrumb";

import { getParentArticlesLabelBySlug } from "@/services/wiki-articles/wiki-articles";

type WikiBreadcrumbsProps = Readonly<{ slug: string }>;

export default async function WikiBreadcrumbs({ slug }: WikiBreadcrumbsProps) {
  const labels: string[] = await getParentArticlesLabelBySlug(slug);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {labels.map((label: string, index: number) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index === 0 ? (
                <span>{label}</span>
              ) : (
                <BreadcrumbLink
                  href={`/${slug
                    .split("/")
                    .slice(0, index + 1)
                    .join("/")}`}
                >
                  {label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < labels.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
        {labels.length === 0 && slug === "/" && (
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {labels.length === 0 && slug === "/new" && (
          <BreadcrumbItem>
            <BreadcrumbLink href="/new">Nouvel article</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {labels.length === 0 && slug !== "/new" && slug !== "/" && (
          <BreadcrumbItem>
            <span>Aucune page trouvée</span>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
