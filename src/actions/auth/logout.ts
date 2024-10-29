"use server";

import "server-only";
import { signOut } from "@/lib/auth";

export async function logout(redirectTo?: string): Promise<void> {
  await signOut({ redirect: !!redirectTo, redirectTo });
}
