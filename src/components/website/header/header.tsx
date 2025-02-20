import { useTranslations } from "next-intl";
import Link from "next/link";

import { buttonVariants } from "@/components/_ui/button";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo/logo";

const links = [
  {
    label: "home",
    url: "/",
  },
  {
    label: "wiki",
    url: env.NEXT_PUBLIC_WIKI_URL,
  },
  {
    label: "studio",
    url: env.NEXT_PUBLIC_STUDIO_URL,
  },
];

export default function Header() {
  const t = useTranslations("Website.Header");
  return (
    <header className="sticky top-0 z-50 flex justify-start px-8 pt-4">
      <div className="relative hidden flex-1 flex-col items-start xs:flex sm:static">
        <div className="flex w-full">
          <div className="h-px flex-1 bg-gray-400"></div>
          <div className="h-px w-10 flex-none origin-[0_0] rotate-45 bg-gray-400"></div>
        </div>
        <div className="absolute top-8 sm:relative sm:top-4 sm:pl-4">
          <span className="inline-block font-orbitron text-2xl uppercase leading-none sm:text-4xl">Selenite</span>
        </div>
      </div>
      <nav className="flex-1 xs:flex-none">
        <ul className="sm:-mt-1.5 flex gap-4 px-2 font-poppins justify-center sm:justify-start items-center sm:items-start">
          <li>
            <Link href="/" className="" title="Home">
              <Logo mainColor="white" secondaryColor="white" size={32} />
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} className="px-2 text-lg sm:leading-none">
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative top-2.5 -mx-3 h-px bg-gray-400"></div>
      </nav>
      <div className="hidden flex-1 flex-col items-end md:flex">
        <div className="flex w-full">
          <div className="h-px w-10 flex-none origin-[100%_0] -rotate-45 bg-gray-400"></div>
          <div className="h-px flex-1 bg-gray-400"></div>
        </div>
        <div className="relative top-4 pr-4">
          <span className="hidden font-poppins md:inline-block">
            <Link
              href={env.NEXT_PUBLIC_DOWNLOAD_URL}
              className={cn("text-black", buttonVariants({ variant: "outline" }))}
            >
              {t("download")}
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
}
