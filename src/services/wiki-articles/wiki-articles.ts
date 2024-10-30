import { NavigationArticle } from "@/types/article";
import prisma from "@/db/prisma";
import { Article } from "@/types/article";

class WikiArticlesService {
  static async getNavigationArticles(): Promise<NavigationArticle[]> {
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

  static async getArticleBySlug(slug: string): Promise<Article | null> {
    return prisma.article.findUnique({ where: { slug } });
  }

  static async getParentArticlesLabelBySlug(slug: string): Promise<string[]> {
    const labels: string[] = [];
    const slugs: string[] = slug.split("/");

    for (const item of slugs) {
      const itemSlug = slugs.slice(0, slugs.indexOf(item) + 1).join("/");
      const article: Article | null = await prisma.article.findUnique({ where: { slug: itemSlug } });

      if (article) labels.push(article.label);
    }

    return labels;
  }

  static async getParentArticles(id?: string): Promise<{ slug: string; title: string }[]> {
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
        title: (await this.getParentArticlesLabelBySlug(article.slug)).join(" / "),
      }));

    return Promise.all(result);
  }

  static async updateArticle(
    id: string,
    data: { label: string; markdown: string; icon?: string | undefined; slug: string },
  ): Promise<Article | null> {
    return prisma.article.update({ where: { id }, data });
  }

  static async createArticle(data: {
    label: string;
    markdown: string;
    icon?: string | undefined;
    slug: string;
  }): Promise<Article> {
    return prisma.article.create({
      data: {
        ...data,
        isPublished: true,
      },
    });
  }
}

export default WikiArticlesService;
