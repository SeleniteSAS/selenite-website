"use server";

import { signOut } from "@/lib/auth";

import "server-only";

export async function logout(): Promise<void> {
  await signOut();
}
