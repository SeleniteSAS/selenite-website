import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import AuthLoginForm from "@/components/auth-login-form/auth-login-form";
import AuthRegisterForm from "@/components/auth-register-form/auth-register-form";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

const actions = ["login", "register"];

type AuthActionPageProps = {
  params: { action: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AuthActionPage({
  params: { action },
  searchParams,
}: AuthActionPageProps): Promise<ReactNode> {
  const session: Session | null = await auth();
  if (session) {
    if ("redirect" in searchParams && typeof searchParams.redirect === "string") {
      return redirect(searchParams.redirect);
    } else {
      return notFound();
    }
  }

  if (!actions.includes(action)) return notFound();

  if (action === "login") return <AuthLoginForm />;

  if (action === "register") return <AuthRegisterForm />;

  return notFound();
}
