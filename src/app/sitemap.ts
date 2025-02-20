import { MetadataRoute } from "next";

import prisma from "@/db/prisma";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studioWebsitePath: string[] = ["/assets", "/colors", "/communication", "/fonts", "/logotype", "/team"];
  const auth: string[] = ["/login", "/register"];
  const wikiPath: string[] = await prisma.article.findMany().then((articles) => articles.map(({ slug }) => slug));

  return [
    {
      url: env.NEXT_PUBLIC_ROOT_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...studioWebsitePath.map((path) => ({
      url: `${env.NEXT_PUBLIC_STUDIO_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...auth.map((path) => ({
      url: `${env.NEXT_PUBLIC_AUTH_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...wikiPath.map((path) => ({
      url: `${env.NEXT_PUBLIC_WIKI_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
