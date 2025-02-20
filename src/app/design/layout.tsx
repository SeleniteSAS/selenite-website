import type { CSSProperties, ReactNode } from "react";

import { Metadata } from "next";

import { SidebarProvider } from "@/components/_ui/sidebar";
import LenisProvider from "@/components/common/lenis-provider/lenis-provider";
import PathProvider from "@/components/common/path-provider/path-provider";
import Header from "@/components/design/header/header";
import Sidebar from "@/components/design/sidebar/sidebar";

import { env } from "@/lib/env";

type DesignLayoutProps = Readonly<{ children: ReactNode }>;

const title = {
  template: "%s - Selenite Studio Design",
  default: "Selenite Studio Design",
};

const description =
  "Découvrez l'univers de Selenite: Lost Contact, un jeu vidéo d'exploration et de survie sur la Lune. Plongez dans une aventure immersive avec notre charte graphique, affiches, trailer et assets officiels.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Selenite",
    "Selenite Lost Contact",
    "jeu vidéo",
    "survie",
    "exploration",
    "science-fiction",
    "Lune",
    "base lunaire",
    "charte graphique",
    "affiche",
    "trailer",
    "assets",
    "game design",
    "studio de jeu",
    "Selenite Game",
  ],
  openGraph: {
    title,
    description,
    images: ["/images/banner.png"],
  },
  robots: "index, follow",
  metadataBase: new URL(env.NEXT_PUBLIC_ROOT_URL),
};

export default function DesignMainPage({ children }: DesignLayoutProps): ReactNode {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "20rem",
        } as CSSProperties
      }
    >
      <PathProvider>
        <LenisProvider>
          <div className="min-h-screen w-full overflow-hidden bg-white">
            <Header />
            <div className="transition-[padding]">{children}</div>
          </div>
          <Sidebar />
        </LenisProvider>
      </PathProvider>
    </SidebarProvider>
  );
}
