import { ReactNode } from "react";

import { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";

import LoginForm from "@/components/auth/login-form/login-form";
import RegisterForm from "@/components/auth/register-form/register-form";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

type AuthActionPageProps = {
  params: { action: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AuthActionPage({ params, searchParams }: AuthActionPageProps): Promise<ReactNode> {
  const session: Session | null = await auth();

  const redirectUrl: string =
    typeof searchParams.redirect === "string" ? searchParams.redirect : env.NEXT_PUBLIC_ROOT_URL;

  if (params.action === "login") {
    if (session) return redirect(redirectUrl);
    return <LoginForm redirectTo={redirectUrl} />;
  }

  if (params.action === "register") {
    if (session) return redirect(redirectUrl);
    return <RegisterForm />;
  }

  return notFound();
}
