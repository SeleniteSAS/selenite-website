"use client";

import Link from "next/link";

import Logo from "@/components/wiki/logo/logo";

import { env } from "@/lib/env";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Logo size={170} className="my-12" />
      <h1 className="mb-6 text-center text-4xl font-bold text-primary">404 - Ressource introuvable</h1>
      <p className="mb-8 text-center text-lg font-semibold tracking-tight text-foreground">
        Oops, il semblerait que tu te sois trompé de planète. Celle-ci n&apos;existe pas.
      </p>
      <ul className="flex flex-wrap gap-2 items-center justify-center">
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
