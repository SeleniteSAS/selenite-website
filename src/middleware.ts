import { type NextURL } from "next/dist/server/web/next-url";
import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { buildSubdomainUrl, getSubdomains, isValidSubdomain } from "@/services/subdomains/subdomains";
import { Subdomain } from "@/types/subdomain";

export const config: MiddlewareConfig = {
  matcher: ["/((?!api/|_next/|images/|icons/|textures/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

async function subdomains(req: NextRequest): Promise<NextResponse> {
  const requestUrl: NextURL = req.nextUrl;
  const rootHostname = new URL(env.NEXT_PUBLIC_ROOT_URL).hostname;
  const hostname = req.headers.get("host")?.replace("localhost:3000", rootHostname) ?? "";

  if (!hostname) throw new Error("No hostname found in request");

  const subdomains: Subdomain[] = getSubdomains();
  const subdomain = subdomains.find((sub) => isValidSubdomain(sub, hostname)) ?? subdomains[0];

  return NextResponse.rewrite(buildSubdomainUrl(subdomain, requestUrl.pathname + requestUrl.search, requestUrl.href));
}

const isProduction = process.env.NODE_ENV === "production";
const middleware = isProduction ? auth(subdomains) : subdomains;

export default middleware;
