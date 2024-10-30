import bcryptjs from "bcryptjs";
import prisma from "@/db/prisma";
import { User } from "@/types/user";

class UsersService {
  static async saltPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      return prisma.user.findUnique({ where: { email } });
    } catch {
      return null;
    }
  }

  static async updateLastLoginByEmail(email: string): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });
  }
}

export default UsersService;
