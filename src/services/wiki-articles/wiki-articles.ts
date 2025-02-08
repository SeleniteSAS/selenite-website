import prisma from "@/db/prisma";
import { Article, NavigationArticle } from "@/types/article";

export async function getNavigationArticles(): Promise<NavigationArticle[]> {
  return prisma.article.findMany({
    select: {
      label: true,
      slug: true,
      icon: true,
    },
    where: {
      isPublished: true,
    },
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return prisma.article.findUnique({ where: { slug } });
}

export async function getParentArticlesLabelBySlug(slug: string): Promise<string[]> {
  const labels: string[] = [];
  const slugs: string[] = slug.split("/");

  for (const item of slugs) {
    const itemSlug = slugs.slice(0, slugs.indexOf(item) + 1).join("/");
    const article: Article | null = await prisma.article.findUnique({ where: { slug: itemSlug } });

    if (article) labels.push(article.label);
  }

  return labels;
}

export async function getParentArticles(id?: string): Promise<{ slug: string; title: string }[]> {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      id: id ? { not: id } : undefined,
    },
  });

  const result = articles
    .filter((article) => article.slug.split("/").length < 3)
    .map(async (article) => ({
      slug: article.slug,
      title: (await getParentArticlesLabelBySlug(article.slug)).join(" / "),
    }));

  return Promise.all(result);
}

export async function updateArticle(
  id: string,
  data: { label: string; markdown: string; icon?: string; slug: string },
): Promise<Article | null> {
  return prisma.article.update({ where: { id }, data });
}

export async function createArticle(data: {
  label: string;
  markdown: string;
  icon?: string;
  slug: string;
}): Promise<Article> {
  return prisma.article.create({
    data: {
      ...data,
      isPublished: true,
    },
  });
}

export async function getArticleSlug(id: string): Promise<string | null> {
  const article = await prisma.article.findUnique({ where: { id } });
  return article ? article.slug : null;
}

export async function getChildArticlesBySlug(slug: string): Promise<Article[]> {
  return prisma.article.findMany({
    where: {
      slug: {
        startsWith: `${slug}/`,
        not: slug,
      },
    },
  });
}

export async function getHomePageArticle(): Promise<Article | null> {
  return prisma.article.findFirst({ where: { slug: "home" } });
}
