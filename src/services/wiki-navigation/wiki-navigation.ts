import { WikiNavigation } from "@/types/wiki-navigation";
import { HomeIcon } from "lucide-react";

class WikiNavigationServices {
  static navigation: WikiNavigation[] = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Getting Started",
          url: "/wiki/getting-started",
          icon: HomeIcon,
          items: [
            {
              title: "Installation",
              url: "/wiki/getting-started/installation",
            },
            {
              title: "Configuration",
              url: "/wiki/getting-started/configuration",
            },
          ],
        },
        {
          title: "Components",
          url: "/wiki/components",
          icon: HomeIcon,
          items: [
            {
              title: "Button",
              url: "/wiki/components/button",
            },
            {
              title: "Input",
              url: "/wiki/components/input",
            },
          ],
        },
      ],
    },
    {
      title: "API",
      items: [
        {
          title: "API",
          url: "/wiki/api",
          icon: HomeIcon,
          items: [
            {
              title: "useApi",
              url: "/wiki/api/use-api",
            },
            {
              title: "useQuery",
              url: "/wiki/api/use-query",
            },
          ],
        },
        {
          title: "Hooks",
          url: "/wiki/hooks",
          icon: HomeIcon,
          items: [
            {
              title: "useClickOutside",
              url: "/wiki/hooks/use-click-outside",
            },
            {
              title: "useDebounce",
              url: "/wiki/hooks/use-debounce",
            },
          ],
        },
      ],
    },
  ];

  static getNavigationItem(): WikiNavigation[] {
    return this.navigation;
  }
}

export default WikiNavigationServices;
