import { ReactNode } from "react";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { notFound } from "next/navigation";

type WikiPageProps = {
  params: {
    slugs: string[];
  };
};

export default async function WikiPage({ params: { slugs } }: WikiPageProps): Promise<ReactNode> {
  const article: Article | null = await WikiArticlesService.getArticleBySlug(slugs.join("/"));

  if (!article) return notFound();

  return <p>{article.markdown}</p>;
}
