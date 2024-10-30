"use server";

import { CreateUpdateWikiPage } from "@/schemas/wiki";
import WikiArticlesService from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { UserRole } from "@/types/user";
import { redirect } from "next/navigation";

type CreateReturn = { error: string } | never;

export default async function create(values: CreateUpdateWikiPage): Promise<CreateReturn> {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  try {
    const article: Article | null = await WikiArticlesService.createArticle({
      ...values,
      slug: `${values.slug}${values.slug.endsWith("/") ? "" : "/"}${values.label}`.toLowerCase().replace(/ /g, "-"),
    });

    if (article) {
      try {
        revalidatePath("/wiki");
        return redirect(article.slug);
      } catch {}
      return { error: "An error occurred" };
    } else {
      return { error: "An error occurred" };
    }
  } catch {
    return { error: "An error occurred" };
  }
}
