import { WikiNavigation, WikiNavigationGroup, WikiNavigationItem } from "@/types/wiki-navigation";
import { NavigationArticle } from "@/types/article";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";

class WikiNavigationServices {
  static async getNavigationItem(): Promise<WikiNavigation[]> {
    const articles: NavigationArticle[] = await WikiArticlesService.getNavigationArticles();

    const navigationItems: WikiNavigation[] = [];
    const firstLevelMap = new Map<string, WikiNavigation>();
    const secondLevelMap = new Map<string, WikiNavigationGroup>();

    articles.forEach((article: NavigationArticle): void => {
      const slugParts: string[] = article.slug.split("/");

      if (slugParts.length === 1) {
        const firstLevelItem: WikiNavigation = {
          title: article.label,
          slug: article.slug,
          items: [],
        };
        firstLevelMap.set(article.slug, firstLevelItem);
        navigationItems.push(firstLevelItem);
      } else if (slugParts.length === 2) {
        const parentSlug: string = slugParts[0];
        const firstLevelItem: WikiNavigation | undefined = firstLevelMap.get(parentSlug);

        if (firstLevelItem) {
          const secondLevelItem: WikiNavigationGroup = {
            title: article.label,
            slug: article.slug,
            url: `/${article.slug}`,
            icon: article.icon ?? "home",
            items: [],
          };
          firstLevelItem.items.push(secondLevelItem);
          secondLevelMap.set(article.slug, secondLevelItem);
        }
      } else if (slugParts.length === 3) {
        const parentSlug: string = slugParts.slice(0, 2).join("/");
        const secondLevelItem: WikiNavigationGroup | undefined = secondLevelMap.get(parentSlug);

        if (secondLevelItem) {
          const thirdLevelItem: WikiNavigationItem = {
            title: article.label,
            slug: article.slug,
            url: `/${article.slug}`,
          };
          secondLevelItem.items.push(thirdLevelItem);
        }
      }
    });

    return navigationItems;
  }
}

export default WikiNavigationServices;
