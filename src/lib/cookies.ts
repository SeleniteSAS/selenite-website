import { env } from "@/lib/env";

export const useSecureCookies: boolean = env.NEXT_PUBLIC_AUTH_URL.startsWith("https://");
export const domain: string = new URL(env.NEXT_PUBLIC_ROOT_URL).hostname;
