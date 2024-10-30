"use server";

import "server-only";

import { loginSchema, LoginSchema } from "@/schemas/auth";
import { ZodError } from "zod";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type LoginReturn = { error: string } | { success: true };

export default async function login(values: LoginSchema, redirectTo?: string): Promise<LoginReturn> {
  try {
    const fields = await loginSchema.parseAsync(values);

    await signIn("credentials", { ...fields, redirect: false });
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.message };
    }
    if (error instanceof AuthError) {
      return { error: "wrongcredentials" };
    }
    throw error;
  }

  if (redirectTo) redirect(redirectTo);

  return { success: true };
}
