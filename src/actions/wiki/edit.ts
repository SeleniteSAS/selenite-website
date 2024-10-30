"use server";

import "server-only";
import { CreateUpdateWikiPage } from "@/schemas/wiki";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UserRole } from "@/types/user";
import { redirect } from "next/navigation";

type EditReturn = { error: string } | never;

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
      try {
        revalidatePath("/wiki");
        redirect(article.slug);
      } catch {}
      return { error: "An error occurred here" };
    } else {
      return { error: "An error occurred there" };
    }
  } catch {
    return { error: "An error occurred elsewhere" };
  }
}
