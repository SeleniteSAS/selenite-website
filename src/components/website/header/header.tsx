import Link from "next/link";

import { buttonVariants } from "@/components/_ui/button";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },

  {
    label: "Wiki",
    url: env.NEXT_PUBLIC_WIKI_URL,
  },
  {
    label: "Studio",
    url: env.NEXT_PUBLIC_STUDIO_URL,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-start px-8 pt-4">
      <div className="flex flex-1 flex-col items-start">
        <div className="flex w-full">
          <div className="h-px flex-1 bg-gray-400"></div>
          <div className="h-px w-10 flex-none origin-[0_0] rotate-45 bg-gray-400"></div>
        </div>
        <div className="relative top-4 pl-4">
          <span className="inline-block font-orbitron text-4xl uppercase leading-none">Selenite</span>
        </div>
      </div>
      <nav>
        <ul className="-mt-1.5 flex gap-4 px-2 font-poppins">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} className="px-2 text-lg leading-none">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative top-2.5 -mx-3 h-px bg-gray-400"></div>
      </nav>
      <div className="flex flex-1 flex-col items-end">
        <div className="flex w-full">
          <div className="h-px w-10 flex-none origin-[100%_0] -rotate-45 bg-gray-400"></div>
          <div className="h-px flex-1 bg-gray-400"></div>
        </div>
        <div className="relative top-4 pr-4">
          <span className="font-poppins">
            <Link
              href={env.NEXT_PUBLIC_DOWNLOAD_URL}
              className={cn("text-black", buttonVariants({ variant: "outline" }))}
            >
              Download
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
}
