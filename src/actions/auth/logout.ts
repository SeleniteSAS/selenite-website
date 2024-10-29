"use server";

import "server-only";
import { signOut } from "@/lib/auth";

export async function logout(): Promise<void> {
  await signOut();
}
