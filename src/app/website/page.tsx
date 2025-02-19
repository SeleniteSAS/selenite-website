import { type ReactNode, lazy } from "react";

import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/_ui/button";
import Arrows from "@/components/website/arrows/arrows";
import Canvas from "@/components/website/canvas/canvas";
import Clock from "@/components/website/clock/clock";
import Footer from "@/components/website/footer/footer";
import SpaceShip from "@/components/website/spaceship/spaceship";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const Moon = lazy(() => import("@/components/website/moon/moon"));

const title = "Welcome to Selenite";
const description =
  "Bienvenue sur le site officiel de Selenite: Lost Contact, un jeu de tir intense où vous incarnez un pilote de vaisseau sur la surface lunaire. Votre mission : détruire les avant-postes extraterrestres pour désactiver le bouclier de la base ennemie. Combattez des vagues d'ennemis, améliorez votre vaisseau et préparez-vous à la bataille finale pour sauver la Terre en détruisant le canon extraterrestre. Stratégie, action et survie sont au cœur de l'aventure !";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/images/banner.png" }], // TODO: Replace with actual image
  },
  twitter: {
    card: "summary_large_image",
    site: "@selenite_studio",
    images: [{ url: "/images/banner.png" }],
    title,
    description,
  },
  robots: "index, follow",
  keywords: [
    "Selenite",
    "Selenite Lost Contact",
    "jeu de tir",
    "survie",
    "vaisseau spatial",
    "lune",
    "avant-postes extraterrestres",
    "combat spatial",
    "vagues d'ennemis",
    "améliorations du vaisseau",
    "stratégie",
    "action",
    "science-fiction",
    "canon extraterrestre",
    "mission finale",
    "bouclier extraterrestre",
    "bataille lunaire",
    "jeu de survie spatial",
  ],
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

export default async function WebsitePage(): Promise<ReactNode> {
  return (
    <div className="mt-32 h-[400vh]">
      <div className="flex h-[300vh] flex-col">
        <div className="relative h-[calc(100vh-8rem)]">
          <div className="ml-16 flex items-center gap-2">
            <svg width="29" height="13" viewBox="0 0 233 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.8" d="M0.709961 0H47.1399L140 100H93.5701L0.709961 0Z" fill="#FFF" />
              <path opacity="0.8" d="M93.5701 0H140L232.86 100H186.43L93.5701 0Z" fill="#FFF" />
            </svg>
            <p className="font-poppins font-bold uppercase">The adventures starts in </p>
          </div>
          <Clock />
          <div className="mx-16 mt-4 flex items-start justify-between font-poppins">
            <div className="text-md flex flex-col font-bold uppercase opacity-55">
              <span className="italic">Elbeuf</span>
              <div className="flex items-center gap-2 text-lg">
                <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.75 24.25V0H24.25V24.25H0V25.75H24.25V50H25.75V25.75H50V24.25H25.75Z" fill="#FFF" />
                </svg>

                <span>49° 17&apos; 14.298&apos;&apos; N</span>
                <span className="scale-y-50">/</span>
                <span>1° 0&apos; 32.6736&apos;&apos; E</span>
              </div>
            </div>
            <div className="text-md flex flex-col items-end font-bold uppercase opacity-55">
              <span className="italic">&copy; 2025 Selenite</span>
              <div className="flex gap-2">
                <span>Unity Technologies</span>
                <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0V50H50V0H0ZM25 25L1.46002 48.54V36.41L36.41 1.41003H48.54L25 25ZM48.54 13.59V25.73L25.73 48.54H13.59L48.54 13.59ZM12.14 1.45996H24.27L1.46002 24.27V12.14L12.14 1.45996ZM37.86 48.54L48.54 37.86V48.54H37.86Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 justify-center text-center font-orbitron font-semibold uppercase text-white">
            <p
              className={cn(
                buttonVariants({ variant: "link", size: "lg" }),
                "relative text-lg font-semibold text-white no-underline after:absolute after:bottom-2 after:left-8 after:h-px after:w-0 after:bg-white after:transition-[width] hover:no-underline hover:after:w-[calc(100%-4rem)]",
              )}
            >
              Scroll down to see more
            </p>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-center overflow-hidden">
          <section className="flex w-full max-w-[1200px] flex-1 items-center justify-between px-8">
            <div className="w-1/2">
              <h3 className="relative flex w-fit flex-col pb-4 font-orbitron after:absolute after:bottom-0 after:right-1/2 after:h-px after:w-screen after:bg-[#00E5E5]">
                <span className="text-md">#01</span>
                <span className="text-5xl">The story</span>
              </h3>
              <p className="pl-8 pt-8 font-poppins">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, corporis exercitationem! Similique unde,
                fugiat non sed ipsum porro corporis veniam, officiis quibusdam illum quod, at quis laboriosam saepe
                incidunt nostrum.
              </p>
            </div>
            <div className="h-32 w-1/2"></div>
          </section>
          <section className="flex w-full max-w-[1200px] flex-1 items-center justify-between px-8">
            <div className="h-32 w-1/2"></div>
            <div className="flex w-1/2 flex-col items-end">
              <h3 className="relative flex w-fit flex-col pb-4 text-right font-orbitron after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:bg-[#00E5E5]">
                <span className="text-md">#02</span>
                <span className="text-5xl">The Selenites</span>
              </h3>
              <p className="pl-8 pt-8 text-right font-poppins">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, corporis exercitationem! Similique unde,
                fugiat non sed ipsum porro corporis veniam, officiis quibusdam illum quod, at quis laboriosam saepe
                incidunt nostrum.
              </p>
            </div>
          </section>
        </div>
        <div className="relative flex h-[90vh] flex-col items-center">
          <section className="flex w-full max-w-[1200px] items-center justify-between px-8">
            <div className="w-full">
              <h3 className="relative flex w-fit flex-col pb-4 font-orbitron after:absolute after:bottom-0 after:right-1/2 after:h-px after:w-screen after:bg-[#00E5E5]">
                <span className="text-md">#03</span>
                <span className="text-5xl">Your mission</span>
              </h3>
              <p className="max-w-[50vw] pl-8 pt-8 font-poppins">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, corporis exercitationem! Similique unde,
                fugiat non sed ipsum porro corporis veniam, officiis quibusdam illum quod, at quis laboriosam saepe
                incidunt nostrum.
              </p>
            </div>
          </section>
          <div className="absolute bottom-4 right-4 -translate-x-1/2 space-y-4">
            <Arrows />
            <p className="text-wrap text-center font-poppins text-sm">
              Use the arrow keys <br />
              to move the spaceship
            </p>
          </div>
        </div>
        <div className="fixed inset-0 -z-10 h-screen w-screen">
          <Canvas style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
            <Moon />
            <SpaceShip />
          </Canvas>
        </div>
      </div>
      <Footer />
      <div className="fixed bottom-8 left-8 font-orbitron text-lg">
        DEVELOPED BY
        <br />
        <Link
          href={env.NEXT_PUBLIC_STUDIO_URL}
          className="flex items-center gap-2 [&_svg]:transition-transform [&_svg]:hover:rotate-45"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.08997 0V1.46001H15.51L0.579956 16.39L1.60999 17.42L16.54 2.49001V16.91H18V0H1.08997Z"
              fill="#fff"
            />
          </svg>

          <strong className="font-bold">SELENITE STUDIO</strong>
        </Link>
      </div>
    </div>
  );
}
