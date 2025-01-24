import prisma from "@/db/prisma";
import { User } from "@/types/user";

import bcryptjs from "bcryptjs";

export async function saltPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcryptjs.compare(password, hash);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
}

export async function updateLastLoginByEmail(email: string): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: { lastLogin: new Date() },
  });
}
