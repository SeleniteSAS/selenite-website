import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UsersService from "@/services/users/users";
import { loginSchema } from "@/schemas/auth";
import { UserRole } from "@prisma/client";

const useSecureCookies: boolean = process.env.AUTH_URL!.startsWith("https://");
const domain: string = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

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

          const user = await UsersService.getUserByEmail(email);

          if (!user) return null;

          const isValid = await UsersService.comparePassword(password, user.password);

          if (!isValid) return null;

          await UsersService.updateLastLoginByEmail(email);

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
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as UserRole;
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
