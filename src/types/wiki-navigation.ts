import { HomeIcon } from "lucide-react";

type IconType = typeof HomeIcon;

type WikiNavigation = {
  title: string;
  items: WikiNavigationGroup[];
};

type WikiNavigationGroup = {
  title: string;
  url: string;
  icon: IconType;
  items: WikiNavigationItem[];
};

type WikiNavigationItem = {
  title: string;
  url: string;
};

export type { WikiNavigation, WikiNavigationItem, WikiNavigationGroup };
