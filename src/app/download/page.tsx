import { type ReactNode } from "react";

import { headers } from "next/headers";
import Link from "next/link";

import { buttonVariants } from "@/components/_ui/button";
import { Separator } from "@/components/_ui/separator";
import ConfettiProvider from "@/components/download/confetti-provider/confetti-provider";

import { env } from "@/lib/env";
import { getUserPlatform } from "@/lib/user-agent";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

type Download = {
  os: string;
  url?: string;
  disabled?: boolean;
  icon: ReactNode;
};

const downloads: Download[] = [
  {
    os: "Windows",
    url: `${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/windows`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4875 4875" width={20} height={20}>
        <path fill="white" d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564" />
      </svg>
    ),
  },
  {
    os: "macOS",
    url: `${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/macos`,
    icon: (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.9967 12.8894C16.0079 12.0214 16.2384 11.1704 16.6669 10.4154C17.0954 9.66053 17.7078 9.02626 18.4473 8.57165C17.9775 7.90075 17.3578 7.34862 16.6373 6.95913C15.9169 6.56963 15.1155 6.3535 14.2969 6.32788C12.5506 6.14458 10.8578 7.3728 9.96789 7.3728C9.06082 7.3728 7.69076 6.34608 6.21542 6.37643C5.26113 6.40727 4.33111 6.68477 3.51595 7.1819C2.7008 7.67903 2.02833 8.37884 1.56405 9.21314C-0.447063 12.6951 1.05305 17.8125 2.97956 20.6271C3.94344 22.0054 5.06993 23.5449 6.54394 23.4903C7.98634 23.4305 8.52505 22.5705 10.2661 22.5705C11.9911 22.5705 12.4965 23.4903 14.0004 23.4556C15.5482 23.4305 16.5233 22.0712 17.4534 20.6799C18.146 19.6979 18.6789 18.6125 19.0324 17.4641C18.1332 17.0837 17.3658 16.4471 16.826 15.6336C16.2862 14.8201 15.9977 13.8657 15.9967 12.8894Z"
          fill="white"
        />
        <path
          d="M13.1561 4.47681C14 3.46374 14.4158 2.1616 14.3151 0.846924C13.0258 0.982339 11.8349 1.59854 10.9795 2.57274C10.5614 3.04867 10.2411 3.60235 10.037 4.20213C9.83293 4.80191 9.74906 5.43603 9.79021 6.06824C10.4351 6.07488 11.0731 5.93511 11.6561 5.65944C12.2391 5.38378 12.752 4.97942 13.1561 4.47681Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    os: "Linux",
    disabled: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 266 312" width={25}>
        <path
          fill="white"
          d="M128.6640625 79.2793c0 1-1 1-1 1h-1c-1 0-1-1-2-2 0 0-1-1-1-2s0-1 1-1l2 1c1 1 2 2 2 3m-18-10c0-5-2-8-5-8 0 0 0 1-1 1v2h3c0 2 1 3 1 5h2m35-5c2 0 3 2 4 5h2c-1-1-1-2-1-3s0-2-1-3-2-2-3-2c0 0-1 1-2 1 0 1 1 1 1 2m-30 16c-1 0-1 0-1-1s0-2 1-3c2 0 3-1 3-1 1 0 1 1 1 1 0 1-1 2-3 4h-1m-11-1c-4-2-5-5-5-10 0-3 0-5 2-7 1-2 3-3 5-3s3 1 5 3c1 3 2 6 2 9v2h1v-1c1 0 1-2 1-6 0-3 0-6-2-9s-4-5-8-5c-3 0-6 2-7 5-2 4-2.4 7-2.4 12 0 4 1.4 8 5.4 12 1-1 2-1 3-2m125 141c1 0 1-.4 1-1.3 0-2.2-1-4.8-4-7.7-3-3-8-4.9-14-5.7-1-.1-2-.1-2-.1-1-.2-1-.2-2-.2-1-.1-3-.3-4-.5 3-9.3 4-17.5 4-24.7 0-10-2-17-6-23s-8-9-13-10c-1 1-1 1-1 2 5 2 10 6 13 12 3 7 4 13 4 20 0 5.6-1 13.9-5 24.5-4 1.6-8 5.3-11 11.1 0 .9 0 1.4 1 1.4 0 0 1-.9 2-2.6 2-1.7 3-3.4 5-5.1 3-1.7 5-2.6 8-2.6 5 0 10 .7 13 2.1 4 1.3 6 2.7 7 4.3 1 1.5 2 2.9 3 4.2 0 1.3 1 1.9 1 1.9m-92-145c-1-1-1-3-1-5 0-4 0-6 2-9 2-2 4-3 6-3 3 0 5 2 7 4 1 3 2 5 2 8 0 5-2 8-6 9 0 0 1 1 2 1 2 0 3 1 5 2 1-6 2-10 2-15 0-6-1-10-3-13-3-3-6-4-10-4-3 0-6 1-9 3-2 3-3 5-3 8 0 5 1 9 3 13 1 0 2 1 3 1m12 16c-13 9-23 13-31 13-7 0-14-3-20-8 1 2 2 4 3 5l6 6c4 4 9 6 14 6 7 0 15-4 25-11l9-6c2-2 4-4 4-7 0-1 0-2-1-2-1-2-6-5-16-8-9-4-16-6-20-6-3 0-8 2-15 6-6 4-10 8-10 12 0 0 1 1 2 3 6 5 12 8 18 8 8 0 18-4 31-14v2c1 0 1 1 1 1m23 202c4 7.52 11 11.3 19 11.3 2 0 4-.3 6-.9 2-.4 4-1.1 5-1.9 1-.7 2-1.4 3-2.2 2-.7 2-1.2 3-1.7l17-14.7c4-3.19 8-5.98 13-8.4 4-2.4 8-4 10-4.9 3-.8 5-2 7-3.6 1-1.5 2-3.4 2-5.8 0-2.9-2-5.1-4-6.7s-4-2.7-6-3.4-4-2.3-7-5c-2-2.6-4-6.2-5-10.9l-1-5.8c-1-2.7-1-4.7-2-5.8 0-.3 0-.4-1-.4s-3 .9-4 2.6c-2 1.7-4 3.6-6 5.6-1 2-4 3.8-6 5.5-3 1.7-6 2.6-8 2.6-8 0-12-2.2-15-6.5-2-3.2-3-6.9-4-11.1-2-1.7-3-2.6-5-2.6-5 0-7 5.2-7 15.7v31.1c0 .9-1 2.9-1 6-1 3.1-1 6.62-1 10.6l-2 11.1v.17m-145-5.29c9.3 1.36 20 4.27 32.1 8.71 12.1 4.4 19.5 6.7 22.2 6.7 7 0 12.8-3.1 17.6-9.09 1-1.94 1-4.22 1-6.84 0-9.45-5.7-21.4-17.1-35.9l-6.8-9.1c-1.4-1.9-3.1-4.8-5.3-8.7-2.1-3.9-4-6.9-5.5-9-1.3-2.3-3.4-4.6-6.1-6.9-2.6-2.3-5.6-3.8-8.9-4.6-4.2.8-7.1 2.2-8.5 4.1s-2.2 4-2.4 6.2c-.3 2.1-.9 3.5-1.9 4.2-1 .6-2.7 1.1-5 1.6-.5 0-1.4 0-2.7.1h-2.7c-5.3 0-8.9.6-10.8 1.6-2.5 2.9-3.8 6.2-3.8 9.7 0 1.6.4 4.3 1.2 8.1.8 3.7 1.2 6.7 1.2 8.8 0 4.1-1.2 8.2-3.7 12.3-2.5 4.3-3.8 7.5-3.8 9.78 1 3.88 7.6 6.61 19.7 8.21m33.3-90.9c0-6.9 1.8-14.5 5.5-23.5 3.6-9 7.2-15 10.7-19-.2-1-.7-1-1.5-1l-1-1c-2.9 3-6.4 10-10.6 20-4.2 9-6.4 17.3-6.4 23.4 0 4.5 1.1 8.4 3.1 11.8 2.2 3.3 7.5 8.1 15.9 14.2l10.6 6.9c11.3 9.8 17.3 16.6 17.3 20.6 0 2.1-1 4.2-4 6.5-2 2.4-4.7 3.6-7 3.6-.2 0-.3.2-.3.7 0 .1 1 2.1 3.1 6 4.2 5.7 13.2 8.5 25.2 8.5 22 0 39-9 52-27 0-5 0-8.1-1-9.4v-3.7c0-6.5 1-11.4 3-14.6s4-4.7 7-4.7c2 0 4 .7 6 2.2 1-7.7 1-14.4 1-20.4 0-9.1 0-16.6-2-23.6-1-6-3-11-5-15l-6-9c-2-3-3-6-5-9-1-4-2-7-2-12-3-5-5-10-8-15-2-5-4-10-6-14l-9 7c-10 7-18 10-25 10-6 0-11-1-14-5l-6-5c0 3-1 7-3 11l-6.3 12c-2.8 7-4.3 11-4.6 14-.4 2-.7 4-.9 4l-7.5 15c-8.1 15-12.2 28.9-12.2 40.4 0 2.3.2 4.7.6 7.1-4.5-3.1-6.7-7.4-6.7-13m71.6 94.6c-13 0-23 1.76-30 5.25v-.3c-5 6-10.6 9.1-18.4 9.1-4.9 0-12.6-1.9-23-5.7-10.5-3.6-19.8-6.36-27.9-8.18-.8-.23-2.6-.57-5.5-1.03-2.8-.45-5.4-.91-7.7-1.37-2.1-.45-4.5-1.13-7.1-2.05-2.5-.79-4.5-1.82-6-3.07-1.38-1.26-2.06-2.68-2.06-4.27 0-1.6.34-3.31 1.02-5.13.64-1.1 1.34-2.2 2.04-3.2.7-1.1 1.3-2.1 1.7-3.1.6-.9 1-1.8 1.4-2.8.4-.9.8-1.8 1-2.9.2-1 .4-2 .4-3s-.4-4-1.2-9.3c-.8-5.2-1.2-8.5-1.2-9.9 0-4.4 1-7.9 3.2-10.4s4.3-3.8 6.5-3.8h11.5c.9 0 2.3-.5 4.4-1.7.7-1.6 1.3-2.9 1.7-4.1.5-1.2.7-2.1.9-2.5.2-.6.4-1.2.6-1.7.4-.7.9-1.5 1.6-2.3-.8-1-1.2-2.3-1.2-3.9 0-1.1 0-2.1.2-2.7 0-3.6 1.7-8.7 5.3-15.4l3.5-6.3c2.9-5.4 5.1-9.4 6.7-13.4 1.7-4 3.5-10 5.5-18 1.6-7 5.4-14 11.4-21l7.5-9c5.2-6 8.6-11 10.5-15s2.9-9 2.9-13c0-2-.5-8-1.6-18-1-10-1.5-20-1.5-29 0-7 .6-12 1.9-17s3.6-10 7-14c3-4 7-8 13-10s13-3 21-3c3 0 6 0 9 1 3 0 7 1 12 3 4 2 8 4 11 7 4 3 7 8 10 13 2 6 4 12 5 20 1 5 1 10 2 17 0 6 1 10 1 13 1 3 1 7 2 12 1 4 2 8 4 11 2 4 4 8 7 12 3 5 7 10 11 16 9 10 16 21 20 32 5 10 8 23 8 36.9 0 6.9-1 13.6-3 20.1 2 0 3 .8 4 2.2s2 4.4 3 9.1l1 7.4c1 2.2 2 4.3 5 6.1 2 1.8 4 3.3 7 4.5 2 1 5 2.4 7 4.2 2 2 3 4.1 3 6.3 0 3.4-1 5.9-3 7.7-2 2-4 3.4-7 4.3-2 1-6 3-12 5.82-5 2.96-10 6.55-15 10.8l-10 8.51c-4 3.9-8 6.7-11 8.4-3 1.8-7 2.7-11 2.7l-7-.8c-8-2.1-13-6.1-16-12.2-16-1.94-29-2.9-37-2.9"
        />
      </svg>
    ),
  },
];

export const metadata: Metadata = {
  title: "Download Selenite: Lost Contact",
  description: "Download the latest version of Selenite: Lost Contact for Windows, macOS and Linux.",
  openGraph: {
    title: "Download Selenite: Lost Contact",
    description: "Download the latest version of Selenite: Lost Contact for Windows, macOS and Linux.",
    images: [{ url: "/images/banner.png" }],
  },
  twitter: {
    title: "Download Selenite: Lost Contact",
    description: "Download the latest version of Selenite: Lost Contact for Windows, macOS and Linux.",
    card: "summary_large_image",
    images: [{ url: "/images/banner.png" }],
  },
  robots: "index, follow",
  keywords: ["selenite", "download", "lost contact", "game", "windows", "macos", "linux"],
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
  authors: [
    {
      name: "Selenite Studio",
      url: env.NEXT_PUBLIC_ROOT_URL,
    },
    {
      name: "Pierre Guéroult",
      url: "https://pierregueroult.dev",
    },
  ],
};

export default function DownloadPage(): ReactNode {
  const { os } = getUserPlatform(headers());

  const { currentDownload, rest } = downloads.reduce(
    (acc, download) => {
      if (download.os === os) {
        acc.currentDownload = download;
      } else {
        acc.rest.push(download);
      }
      return acc;
    },
    { currentDownload: undefined as Download | undefined, rest: [] as Download[] },
  );

  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden font-poppins">
      <div className="max-w-[90vw]">
        <ConfettiProvider>
          <h1 className="mb-4 text-center font-orbitron text-2xl font-bold uppercase">Download Selenite</h1>
          {currentDownload ? (
            <Link
              href={currentDownload.url ?? "#"}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
              data-confetti={currentDownload.disabled ? "false" : "true"}
              data-disabled={currentDownload.disabled ? "true" : "false"}
            >
              {currentDownload.icon}
              <span className="ml-2">Download for {currentDownload.os}</span>
            </Link>
          ) : (
            <div className="w-full rounded-md border border-border/20 px-4 py-2 font-mono text-sm shadow-sm">
              <p className="text-center text-white">Download for your platform is not available</p>
            </div>
          )}
          <div className="my-4 flex w-full items-center justify-center gap-4">
            <Separator className="hidden flex-1 xs:block" />
            <p className="text-center text-sm uppercase text-white">
              {!currentDownload || currentDownload.disabled ? "Download for another platform" : "Or"}
            </p>
            <Separator className="hidden flex-1 xs:block" />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
            {rest.map((download: Download) => (
              <Link
                key={download.os}
                href={download.url ?? "#"}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  download.disabled && "cursor-not-allowed opacity-50",
                  "w-full",
                )}
                data-confetti={download.disabled ? "false" : "true"}
                data-disabled={download.disabled ? "true" : "false"}
              >
                {download.icon}
                <span className="ml-2">Download for {download.os}</span>
              </Link>
            ))}
          </div>
          <Link className="mt-4 text-center text-xs underline" href={env.NEXT_PUBLIC_ROOT_URL}>
            Get back to https://selenite.live
          </Link>
        </ConfettiProvider>
      </div>
    </main>
  );
}
