import { type DefaultSession } from "next-auth";

import { UserRole } from "@/types/user";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: ExtendedUser;
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    role: UserRole;
  }
}
