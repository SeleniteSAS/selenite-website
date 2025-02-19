"use server";

import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { CreateUpdateWikiPage } from "@/schemas/wiki";
import { createArticle } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";
import { UserRole } from "@/types/user";
import { normalizeSlug } from "@/lib/slug";

type CreateReturn = { error: string } | { success: true; slug: string };

export default async function create(values: CreateUpdateWikiPage): Promise<CreateReturn> {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  try {
    const article: Article | null = await createArticle({
      ...values,
      slug: normalizeSlug(values.slug, values.label), 
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
