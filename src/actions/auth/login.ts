"use server";

import { loginSchema, LoginSchema } from "@/schemas/auth";
import { ZodError } from "zod";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

type LoginReturn = { error: string } | { success: true };

export default async function login(values: LoginSchema): Promise<LoginReturn> {
  try {
    const fields = await loginSchema.parseAsync(values);

    await signIn("credentials", { ...fields, redirect: false });

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.message };
    }
    if (error instanceof AuthError) {
      return { error: "wrongcredentials" };
    }
    throw error;
  }
}
