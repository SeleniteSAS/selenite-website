"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/_ui/button";
import Logo from "@/components/wiki/logo/logo";

import { env } from "@/lib/env";

type WikiPageErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function WikiPageError({ error, reset }: WikiPageErrorProps) {
  const [showError, setShowError] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <Logo size={170} className="my-12" />
      <h1 className="mb-6 text-center text-4xl font-bold text-primary">500 - Erreur Serveur</h1>
      <p className="mb-8 text-center text-lg font-semibold tracking-tight text-foreground">
        Oops, tu as détruis la base allié ? C&apos;était pas ça ta mission.
      </p>
      <ul>
        <li>
          <Button onClick={reset}>Réessayer</Button>
        </li>
        <li>
          <Button
            onClick={() => {
              setShowError((prev) => !prev);
            }}
          >
            Afficher l&apos;erreur
          </Button>
        </li>
      </ul>
      {showError && (
        <pre className="overflow-auto rounded-md bg-slate-800 p-4 font-mono text-sm text-white [&_.hljs-comment]:text-gray-400 [&_.hljs-keyword]:text-blue-500 [&_.hljs-number]:text-blue-400 [&_.hljs-string]:text-green-400 [&_.hljs-title]:text-yellow-400">
          {error.stack}
        </pre>
      )}
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <Link href={env.NEXT_PUBLIC_WIKI_URL} className="p-2 text-primary underline">
            Retourner à l&apos;accueil
          </Link>
        </li>
        <li>
          <Link href={env.NEXT_PUBLIC_ROOT_URL} className="p-2 text-primary underline">
            Le site de Selenite
          </Link>
        </li>
        <li>
          <Link href={env.NEXT_PUBLIC_AUTH_URL} className="p-2 text-primary underline">
            Se connecter
          </Link>
        </li>
      </ul>
    </div>
  );
}
