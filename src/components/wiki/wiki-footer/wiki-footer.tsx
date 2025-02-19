import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/_ui/card";

import { extractPlainText } from "@/lib/markdown";
import { getChildArticles } from "@/services/wiki-articles/wiki-articles";
import { Article } from "@/types/article";

type WikiFooterProps = Readonly<{
  articleSlug: string;
}>;

export default async function WikiFooter({ articleSlug }: WikiFooterProps) {
  const childArticles: Article[] = await getChildArticles(articleSlug);

  if (!childArticles.length) return null;

  return (
    <footer className="font-poppins">
      <h2 className="mb-2.5 mt-5 text-3xl font-bold">Articles liés :</h2>
      <div className="grid grid-cols-1 gap-4 px-8 py-2 md:grid-cols-2">
        {childArticles.map((childArticle: Article) => (
          <Link key={childArticle.slug} href={`/${childArticle.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle>{childArticle.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{extractPlainText(childArticle.markdown, 150) ?? "Cette page est vide"}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </footer>
  );
}
