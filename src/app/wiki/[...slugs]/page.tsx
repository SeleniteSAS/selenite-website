import { ReactNode } from "react";

import { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";

import MarkdownEdit from "@/components/wiki/markdown-edit/markdown-edit";
import WikiMarkdownRemote from "@/components/wiki/markdown-remote/markdown-remote";

import { auth } from "@/lib/auth";
import { getArticleBySlug, getParentArticles } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { UserRole } from "@/types/user";
import { env } from "@/lib/env";

type WikiPageProps = {
  params: {
    slugs: string[];
  };
};

export default async function WikiPage({ params: { slugs } }: WikiPageProps): Promise<ReactNode> {
  const isEditMode: boolean = slugs.join("/").includes("/edit");
  const session: Session | null = await auth();

  const article: Article | null = await getArticleBySlug(slugs.join("/").replace("/edit", ""));

  if (!article) return notFound();

  if(isEditMode && !session) return redirect(`${env.NEXT_PUBLIC_AUTH_URL}/login`);

  if (isEditMode && session?.user.role === UserRole.ADMIN) {
    const parentArticles: { slug: string; title: string }[] = await getParentArticles(article.id);

    return <MarkdownEdit article={article} parentArticles={parentArticles} />;
  }

  return <WikiMarkdownRemote source={article.markdown} />;
}
