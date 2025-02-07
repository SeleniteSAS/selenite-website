import { Fragment } from "react";

import { Session } from "next-auth";
import { notFound } from "next/navigation";

import Header from "@/components/wiki/header/header";
import MarkdownEdit from "@/components/wiki/markdown-edit/markdown-edit";

import { auth } from "@/lib/auth";
import { getParentArticles } from "@/services/wiki-articles/wiki-articles";

const title: string = "Nouvelle page | Selenite - Wiki & Documentation";
const description: string = "Créez une nouvelle page pour le wiki de Selenite.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/banner.png"],
  },
  robots: "noindex, nofollow",
};

export default async function NewWikiPage() {
  const session: Session | null = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return notFound();
  }

  const parentArticles: { slug: string; title: string }[] = await getParentArticles();

  return (
    <Fragment>
      <Header path="/new" session={session} />
      <section className="p-4 text-foreground">
        <MarkdownEdit article={null} parentArticles={parentArticles} />
      </section>
    </Fragment>
  );
}
