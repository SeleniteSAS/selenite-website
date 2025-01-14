import { ReactNode } from "react";
import { getArticleBySlug, getParentArticles } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { notFound } from "next/navigation";
import WikiMarkdownRemote from "@/components/wiki-markdown-remote/wiki-markdown-remote";
import WikiMarkdownEdit from "@/components/wiki-markdown-edit/wiki-markdown-edit";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { UserRole } from "@/types/user";

type WikiPageProps = {
  params: Promise<{
    slugs: string[];
  }>;
};

export default async function WikiPage(props: WikiPageProps): Promise<ReactNode> {
  const params = await props.params;

  const { slugs } = params;

  const isEditMode: boolean = slugs.join("/").includes("/edit");
  const session: Session | null = await auth();

  const article: Article | null = await getArticleBySlug(slugs.join("/").replace("/edit", ""));

  if (!article) return notFound();

  if (isEditMode && session?.user.role === UserRole.ADMIN) {
    const parentArticles: { slug: string; title: string }[] = await getParentArticles(article.id);

    return <WikiMarkdownEdit article={article} parentArticles={parentArticles} />;
  }

  return <WikiMarkdownRemote source={article.markdown} />;
}
