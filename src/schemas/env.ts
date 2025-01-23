import { z } from "zod";

export const serverEnvSchemas = {
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_TRUST_HOST: z.enum(["true", "false"]),
};

export const clientEnvSchemas = {
  NEXT_PUBLIC_ROOT_URL: z.string().url().min(1),
  NEXT_PUBLIC_AUTH_URL: z.string().url().min(1),
  NEXT_PUBLIC_DOWNLOAD_URL: z.string().url().min(1),
  NEXT_PUBLIC_WIKI_URL: z.string().url().min(1),
  NEXT_PUBLIC_STUDIO_URL: z.string().url().min(1),
};
