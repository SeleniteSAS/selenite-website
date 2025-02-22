export const items: Record<
  string,
  {
    name: string;
    path: string;
  }[]
> = {
  default: [
    {
      name: "intro",
      path: "/",
    },

    {
      name: "team",
      path: "/team",
    },
  ],
  art: [
    {
      name: "logo",
      path: "/logotype",
    },
    {
      name: "colors",
      path: "/colors",
    },
    {
      name: "fonts",
      path: "/fonts",
    },
    {
      name: "assets",
      path: "/assets",
    },
  ],
};
