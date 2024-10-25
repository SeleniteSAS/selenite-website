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
}

export default WikiArticlesService;
