type WikiNavigation = {
  title: string;
  items: WikiNavigationGroup[];
  slug: string;
};

type WikiNavigationGroup = {
  title: string;
  url: string;
  slug: string;
  icon?: string;
  items: WikiNavigationItem[];
};

type WikiNavigationItem = {
  title: string;
  slug: string;
  url: string;
};

export type { WikiNavigation, WikiNavigationItem, WikiNavigationGroup };
