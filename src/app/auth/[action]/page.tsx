import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import AuthLoginForm from "@/components/auth-login-form/auth-login-form";
import AuthRegisterForm from "@/components/auth-register-form/auth-register-form";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

type AuthActionPageProps = {
  params: { action: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AuthActionPage({ params, searchParams }: AuthActionPageProps): Promise<ReactNode> {
  const session: Session | null = await auth();

  const redirectUrl: string =
    typeof searchParams.redirect === "string" ? searchParams.redirect : process.env.NEXT_PUBLIC_ROOT_URL!;

  if (params.action === "login") {
    if (session) return redirect(redirectUrl);
    return <AuthLoginForm redirectTo={redirectUrl} />;
  }

  if (params.action === "register") {
    if (session) return redirect(redirectUrl);
    return <AuthRegisterForm />;
  }

  return notFound();
}
