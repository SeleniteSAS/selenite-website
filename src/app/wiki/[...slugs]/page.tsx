import { ReactNode } from "react";

import { Metadata } from "next";
import { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";

import MarkdownEdit from "@/components/wiki/markdown-edit/markdown-edit";
import WikiMarkdownRemote from "@/components/wiki/markdown-remote/markdown-remote";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { extractPlainText, getFirstImageUrl } from "@/lib/markdown";
import { getArticleBySlug, getParentArticles } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { UserRole } from "@/types/user";

type WikiPageProps = Readonly<{
  params: {
    slugs: string[];
  };
}>;

export async function generateMetadata({ params: { slugs } }: WikiPageProps): Promise<Metadata> {
  const isEditMode: boolean = slugs.join("/").includes("/edit");
  const slug: string = slugs.join("/").replace("/edit", "");
  const article: Article | null = await getArticleBySlug(slug);

  if (!article) return { title: "Page non trouvée" };

  const title: string =
    (isEditMode ? `Édition de ${article.label}` : article.label) + " | Selenite - Wiki & Documentation";
  const description: string = extractPlainText(article.markdown);
  const image: string | null = getFirstImageUrl(article.markdown);

  return {
    title,
    description,
    robots: isEditMode ? "noindex, nofollow" : "index, follow",
    keywords: article.keywords,
    openGraph: {
      title,
      description,
      url: `${env.NEXT_PUBLIC_WIKI_URL}/${slug}`,
      siteName: "Selenite - Wiki & Documentation officielle",
      images: image ? [{ url: image }] : [],
      type: "article",
      authors: article.author ? [article.author, "Selenite Studio"] : ["Selenite Studio"],
      publishedTime: article.createdAt.toLocaleString(),
      modifiedTime: article.updatedAt.toLocaleString(),
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function WikiPage({ params: { slugs } }: WikiPageProps): Promise<ReactNode> {
  const isEditMode: boolean = slugs.join("/").includes("/edit");
  const session: Session | null = await auth();

  const article: Article | null = await getArticleBySlug(slugs.join("/").replace("/edit", ""));

  if (!article) return notFound();

  if (isEditMode && !session) return redirect(`${env.NEXT_PUBLIC_AUTH_URL}/login`);

  if (isEditMode && session?.user.role === UserRole.ADMIN) {
    const parentArticles: { slug: string; title: string }[] = await getParentArticles(article.id);

    return <MarkdownEdit article={article} parentArticles={parentArticles} />;
  }

  return <WikiMarkdownRemote source={article.markdown} />;
}
