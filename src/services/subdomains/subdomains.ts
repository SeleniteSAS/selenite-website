import { Subdomain } from "@/types/subdomain";

class SubdomainsService {
  static subdomains: Subdomain[] = [
    {
      name: "Website",
      subdomain: "",
      slug: "website",
    },
    {
      name: "Wiki of the game",
      subdomain: "wiki",
      slug: "wiki",
    },
    {
      name: "Source",
      subdomain: "download",
      slug: "download",
    },
    {
      name: "Website",
      subdomain: "www",
      slug: "website",
    },
  ];

  static getSubdomains(): Subdomain[] {
    return this.subdomains;
  }

  static buildSubdomainUrl(subdomain: Subdomain, path: string, url: string): URL {
    return new URL(`/${subdomain.slug}${path}`, url);
  }

  static isValidSubdomain(subdomain: Subdomain, hostname: string): boolean {
    return (
      hostname === `${subdomain.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN && subdomain.subdomain === "")
    );
  }
}

export default SubdomainsService;
