"use server";

import "server-only";
import { CreateUpdateWikiPage } from "@/schemas/wiki";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UserRole } from "@/types/user";

type EditReturn = { error: string } | { success: true; slug: string };

export default async function edit(id: string, values: CreateUpdateWikiPage): Promise<EditReturn> {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  try {
    const article: Article | null = await WikiArticlesService.updateArticle(id, {
      ...values,
      slug: `${values.slug}${values.slug.endsWith("/") ? "" : "/"}${values.label}`.toLowerCase().replace(/ /g, "-"),
    });

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
