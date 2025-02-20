import { ArrowRight } from "lucide-react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import Noise from "@/components/_animate/noise";
import { buttonVariants } from "@/components/_ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/card";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "wiki",
    href: env.NEXT_PUBLIC_WIKI_URL,
  },
  {
    label: "studio",
    href: env.NEXT_PUBLIC_STUDIO_URL,
  },
  {
    label: "download",
    href: env.NEXT_PUBLIC_DOWNLOAD_URL,
  },
  {
    label: "auth",
    href: env.NEXT_PUBLIC_AUTH_URL,
  },
  {
    label: "github",
    href: "https://github.com/selenite-live/",
  },
];

export default function Footer() {
  const t = useTranslations("Website.Footer");

  return (
    <div className="flex h-screen flex-col px-4 text-white">
      <div className="mt-24 grid w-full flex-1 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center">
          <h4 className="mb-8 font-orbitron text-lg sm:text-2xl font-semibold uppercase">
            {t("title1")} <br
              className="hidden sm:block"
            /> {t("title2")}
          </h4>
          <ul className="flex flex-col gap-4 font-poppins">
            {links.map((link) => (
              <li key={link.href} className="group transition-transform hover:translate-x-4">
                <Link href={link.href} className="flex items-center gap-6 text-sm md:text-lg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 rotate-0 transition-transform group-hover:rotate-45"
                  >
                    <path
                      d="M1.08997 0V1.46001H15.51L0.579956 16.39L1.60999 17.42L16.54 2.49001V16.91H18V0H1.08997Z"
                      fill="#fff"
                    />
                  </svg>
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center p-4">
          <Card className="relative w-full max-w-[350px] border-border/40 bg-transparent text-white">
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <CardTitle>{t("downloadTitle")}</CardTitle>
              <CardDescription>{t("downloadDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 p-4 sm:p-6">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href={env.NEXT_PUBLIC_DOWNLOAD_URL}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "sm:text-md w-full justify-between px-2 text-xs sm:px-4",
                    )}
                  >
                    {t("downloadButton")}
                    <ArrowRight />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://github.com/selenite-live/selenite-game"}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "sm:text-md w-full justify-between px-2 text-xs sm:px-4",
                    )}
                  >
                    {t("downloadGithub")} <ArrowRight />
                  </Link>
                </li>
              </ul>
            </CardContent>
            <div className="absolute inset-0 z-0">
              <Noise patternSize={500} patternScaleX={10} patternScaleY={10} patternAlpha={40} />
            </div>
          </Card>
        </div>
        <div className="hidden items-center justify-center lg:flex">
          <p>There will the cover art game here !</p>
        </div>
      </div>
      <div className="pb-24 flex w-full">
        <div className="hidden flex-1 flex-col items-start justify-end md:flex">
          <div className="flex w-full">
            <div className="h-px flex-1 bg-gray-400"></div>
            <div className="h-px w-10 flex-none origin-[0_0] -rotate-45 bg-gray-400"></div>
          </div>
        </div>
        <nav className="flex-1 xs:flex-none">
          <ul className="-mb-1.5 flex gap-4 px-0 font-poppins md:px-2">
            <li>
              <Link
                className="xs:text-md w-full text-wrap px-2 text-center text-sm leading-none xs:w-auto sm:text-nowrap md:text-lg block"
                href={"/legals"}
              >
                {t("legals")}
              </Link>
            </li>
            <li>
              <Link
                className="xs:text-md w-full text-wrap px-2 text-center text-sm leading-none xs:w-auto sm:text-nowrap md:text-lg block"
                href={"/privacy-policy"}
              >
                {t("privacy")}
              </Link>
            </li>
          </ul>
          <div className="relative bottom-7 -mx-3 hidden h-px bg-gray-400 xs:block"></div>
        </nav>
        <div className="hidden flex-1 flex-col items-end justify-end xs:flex">
          <div className="flex w-full">
            <div className="h-px w-10 flex-none origin-[100%_0] rotate-45 bg-gray-400"></div>
            <div className="h-px flex-1 bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
