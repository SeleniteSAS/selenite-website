import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import SubdomainsService from "@/services/subdomains/subdomains";
import { Subdomain } from "@/types/subdomain";

export const config: MiddlewareConfig = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

async function middleware(req: NextRequest): Promise<NextResponse> {
  const requestUrl: NextURL = req.nextUrl;
  const hostname: string | undefined = req.headers
    .get("host")
    ?.replace("localhost:3000", `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const params: string = requestUrl.searchParams.toString();
  const path: string = `${requestUrl.pathname}${params.length > 0 ? `?${params}` : ""}`;

  if (!hostname) throw new Error("No hostname found");

  const subdomains: Subdomain[] = SubdomainsService.getSubdomains();

  for (const subdomain of subdomains) {
    if (SubdomainsService.isValidSubdomain(subdomain, hostname))
      return NextResponse.rewrite(SubdomainsService.buildSubdomainUrl(subdomain, path, requestUrl.href));
  }

  return NextResponse.rewrite(SubdomainsService.buildSubdomainUrl(subdomains[0], path, requestUrl.href));
}

export default middleware;
