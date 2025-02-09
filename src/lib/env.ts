import { createEnv } from "@t3-oss/env-nextjs";

import { clientEnvSchemas, serverEnvSchemas } from "@/schemas/env";

export const env = createEnv({
  server: serverEnvSchemas,
  client: clientEnvSchemas,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    DISCORD_WEBHOOK_TELEMETRY: process.env.DISCORD_WEBHOOK_TELEMETRY,
    NEXT_PUBLIC_ROOT_URL: process.env.NEXT_PUBLIC_ROOT_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_DOWNLOAD_URL: process.env.NEXT_PUBLIC_DOWNLOAD_URL,
    NEXT_PUBLIC_WIKI_URL: process.env.NEXT_PUBLIC_WIKI_URL,
    NEXT_PUBLIC_STUDIO_URL: process.env.NEXT_PUBLIC_STUDIO_URL,
  },
});
