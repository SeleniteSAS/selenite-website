"use server";

import "server-only";
import { EditPageSchema } from "@/schemas/wiki";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";

type EditReturn = { error: string } | { success: true };

export default async function edit(id: string, values: EditPageSchema): Promise<EditReturn> {
  try {
    const article: Article | null = await WikiArticlesService.updateArticle(id, {
      ...values,
      slug: `${values.slug}${values.slug.endsWith("/") ? "" : "/"}${values.label}`.toLowerCase(),
    });

    revalidatePath("/wiki");

    return article ? { success: true } : { error: "Article not found" };
  } catch {
    return { error: "An error occurred" };
  }
}
