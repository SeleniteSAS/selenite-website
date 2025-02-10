import { Fragment, type ReactNode } from "react";

import type { Metadata } from "next";
import { Session } from "next-auth";

import Header from "@/components/wiki/header/header";
import MDXRemote from "@/components/wiki/markdown-remote/markdown-remote";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { getHomePageArticle } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";

const title: string = "Accueil | Selenite - Wiki & Documentation";
const description: string =
  "Découvrez la documentation complète du projet Selenite. Tutoriels, guides et informations essentielles pour comprendre l'univers et les fonctionnalités du projet.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/banner.png"],
  },
  robots: "index, follow",
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
};

export default async function WikiPage(): Promise<ReactNode> {
  const session: Session | null = await auth();

  const article: Article | null = await getHomePageArticle();

  return (
    <Fragment>
      <Header session={session} path="/" />
      <section className="p-4 text-foreground">
        {article ? (
          <MDXRemote source={article.markdown} />
        ) : (
          <p>Quelqu&apos;un aurait supprimé la page d&apos;accueil ?</p>
        )}
      </section>
    </Fragment>
  );
}
