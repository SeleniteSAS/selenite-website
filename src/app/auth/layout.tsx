import { ReactNode } from "react";

import { Metadata } from "next";
import dynamic from "next/dynamic";

import Lang from "@/components/common/lang/lang";
import ThemeProvider from "@/components/common/theme-provider/theme-provider";
import Theme from "@/components/common/theme/theme";

import { env } from "@/lib/env";

const SpaceShip = dynamic(() => import("@/components/auth/spaceship/spaceship"), { ssr: false });
const Canvas = dynamic(() => import("@/components/website/canvas/canvas"), { ssr: false });
const MdOnly = dynamic(() => import("@/components/common/md-only/md-only"), { ssr: false });

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export const metadata: Metadata = {
  title: {
    template: "Selenite - %s",
    default: "Selenite - Authentication",
  },
  description: "Continue with your account or connect with github. Register if you don't have an account.",
  openGraph: {
    title: {
      template: "Selenite - %s",
      default: "Selenite - Authentication",
    },
    description: "Continue with your account or connect with github. Register if you don't have an account.",
    images: ["/images/banner.png"],
  },
  keywords: ["selenite", "authentication", "login", "register", "github"],
  robots: "index, follow",
  twitter: {
    title: {
      template: "Selenite - %s",
      default: "Selenite - Authentication",
    },
    description: "Continue with your account or connect with github. Register if you don't have an account.",
    card: "summary_large_image",
    images: ["/images/banner.png"],
  },
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
  creator: "Selenite Studio",
  generator: "Next.js",
};

export default function AuthLayout({ children }: AuthLayoutProps): ReactNode {
  return (
    <ThemeProvider>
      <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        <div className="relative hidden h-full flex-1 items-end justify-start bg-background md:flex">
          <div className="absolute z-0 h-full w-full">
            <MdOnly>
              <Canvas>
                <SpaceShip />
              </Canvas>
            </MdOnly>
          </div>
        </div>
        <section className="h-full w-full px-4 font-poppins sm:px-8 md:w-auto md:px-24">
          {children}
          <Lang />
          <Theme />
        </section>
      </main>
    </ThemeProvider>
  );
}
