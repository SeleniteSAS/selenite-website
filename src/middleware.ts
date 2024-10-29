import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import SubdomainsService from "@/services/subdomains/subdomains";
import { Subdomain } from "@/types/subdomain";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const config: MiddlewareConfig = {
  matcher: ["/((?!api/|_next/|images/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

async function subdomains(req: NextRequest): Promise<NextResponse> {
  const requestUrl: NextURL = req.nextUrl;
  const hostname: string | undefined = req.headers
    .get("host")
    ?.replace("localhost:3000", `${new URL(process.env.NEXT_PUBLIC_ROOT_URL!).hostname}`);

  const params: string = requestUrl.searchParams.toString();
  const path: string = `${requestUrl.pathname}${params.length > 0 ? `?${params}` : ""}`;

  if (!hostname) throw new Error("No hostname found");

  const subdomains: Subdomain[] = SubdomainsService.getSubdomains();

  for (const subdomain of subdomains) {
    if (SubdomainsService.isValidSubdomain(subdomain, hostname))
      return NextResponse.rewrite(SubdomainsService.buildSubdomainUrl(subdomain, path, requestUrl.href));
  }

  headers().set("x-url", requestUrl.href);

  return NextResponse.rewrite(SubdomainsService.buildSubdomainUrl(subdomains[0], path, requestUrl.href));
}

const middleware = process.env.NODE_ENV === "production" ? auth(subdomains) : subdomains;

export default middleware;
