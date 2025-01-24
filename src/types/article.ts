import { Article } from "@prisma/client";

type NavigationArticle = Partial<Article> & { label: string; slug: string; icon: string | null };

export type { Article, NavigationArticle };
