"use server";

import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { normalizeSlug } from "@/lib/slug";
import { CreateUpdateWikiPage } from "@/schemas/wiki";
import { getArticleSlug, getChildArticlesBySlug, updateArticle } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { UserRole } from "@/types/user";

import "server-only";

type EditReturn = { error: string } | { success: true; slug: string };

export default async function edit(id: string, values: CreateUpdateWikiPage): Promise<EditReturn> {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  try {
    const oldSlug: string | null = await getArticleSlug(id);

    const article: Article | null = await updateArticle(id, {
      ...values,
      slug: normalizeSlug(values.slug, values.label),
    });

    try {
      if (oldSlug) {
        const children: Article[] = await getChildArticlesBySlug(oldSlug);

        for (const child of children) {
          const newSlug: string = child.slug.replace(oldSlug, normalizeSlug(values.slug, values.label));
          const childWithoutId = { ...child, id: undefined };
          await updateArticle(child.id, { ...childWithoutId, icon: child.icon ?? undefined, slug: newSlug });
        }
      }
    } catch (e: unknown) {
      console.log(e);
      revalidatePath("/wiki");
      return { error: "An error occurred updating children slugs" };
    }

    if (article) {
      revalidatePath("/wiki");
      return { success: true, slug: article.slug };
    } else {
      return { error: "An error occurred there" };
    }
  } catch {
    return { error: "An error occurred elsewhere" };
  }
}
