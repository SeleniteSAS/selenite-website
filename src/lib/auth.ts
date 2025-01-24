import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { domain, useSecureCookies } from "@/lib/cookies";
import { loginSchema } from "@/schemas/auth";
import { comparePassword, getUserByEmail, updateLastLoginByEmail } from "@/services/users/users";
import { User as UserWithPassword } from "@/types/user";

import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials: Partial<Record<"email" | "password", unknown>>): Promise<User | null> => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user: UserWithPassword | null = await getUserByEmail(email);

          if (!user) return null;

          const isValid: boolean = await comparePassword(password, user.password);

          if (!isValid) return null;

          await updateLastLoginByEmail(email);

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  useSecureCookies,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as UserRole;
      session.user.name = token.name as string;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: useSecureCookies,
        domain: `.${domain}`,
        path: "/",
        partitioned: true,
      },
    },
    csrfToken: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: useSecureCookies,
        domain: `.${domain}`,
        path: "/",
        partitioned: true,
      },
    },
    callbackUrl: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: useSecureCookies,
        domain: `.${domain}`,
        path: "/",
        partitioned: true,
      },
    },
  },
});
