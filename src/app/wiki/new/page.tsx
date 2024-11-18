import WikiMarkdownEdit from "@/components/wiki-markdown-edit/wiki-markdown-edit";
import { getParentArticles } from "@/services/wiki-articles/wiki-articles";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function NewWikiPage() {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return notFound();
  }

  const parentArticles: { slug: string; title: string }[] = await getParentArticles();

  return (
    <section className="p-4">
      <WikiMarkdownEdit article={null} parentArticles={parentArticles} />
    </section>
  );
}
