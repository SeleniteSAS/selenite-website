"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";
import { LoginSchema, loginSchema } from "@/schemas/auth";

import "server-only";
import { ZodError } from "zod";

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
