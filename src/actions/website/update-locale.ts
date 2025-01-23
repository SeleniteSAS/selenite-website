"use server";

import type { Locale } from "@/types/locale";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { locales } from "@/lang/locales";
import { cookies } from "next/headers";
import { useSecureCookies, domain } from "@/lib/cookies";

export default async function updateLocale(lang: Locale): Promise<boolean> {
  if (!updateLocale) return false;

  if (!locales.includes(lang)) return false;

  const store: ReadonlyRequestCookies = cookies();
  store.set({
    name: "locale",
    value: lang,
    httpOnly: true,
    sameSite: "lax",
    secure: useSecureCookies,
    domain: `.${domain}`,
    partitioned: true,
  });

  return true;
}
