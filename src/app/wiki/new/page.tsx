import { Session } from "next-auth";
import { notFound } from "next/navigation";

import MarkdownEdit from "@/components/wiki/markdown-edit/markdown-edit";

import { auth } from "@/lib/auth";
import { getParentArticles } from "@/services/wiki-articles/wiki-articles";

export default async function NewWikiPage() {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return notFound();
  }

  const parentArticles: { slug: string; title: string }[] = await getParentArticles();

  return (
    <section className="p-4">
      <MarkdownEdit article={null} parentArticles={parentArticles} />
    </section>
  );
}
