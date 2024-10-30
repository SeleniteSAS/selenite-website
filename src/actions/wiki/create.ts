"use server";

import { CreateUpdateWikiPage } from "@/schemas/wiki";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UserRole } from "@/types/user";
import { redirect } from "next/navigation";

type CreateReturn = { error: string } | { success: true; slug: string };

export default async function create(values: CreateUpdateWikiPage): Promise<CreateReturn> {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  try {
    const article: Article | null = await WikiArticlesService.createArticle({
      ...values,
      slug: `${values.slug !== "/" ? values.slug : ""}${values.slug.endsWith("/") ? "" : "/"}${values.label}`
        .toLowerCase()
        .replace(/ /g, "-"),
    });

    if (article) {
      revalidatePath("/wiki");
      return { success: true, slug: article.slug };
    } else {
      return { error: "An error occurred" };
    }
  } catch {
    return { error: "An error occurred" };
  }
}
