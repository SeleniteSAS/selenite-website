import { ReactNode } from "react";

import dynamic from "next/dynamic";

import Lang from "@/components/common/lang/lang";
import ThemeProvider from "@/components/common/theme-provider/theme-provider";
import Theme from "@/components/common/theme/theme";

const SpaceShip = dynamic(() => import("@/components/auth/spaceship/spaceship"), { ssr: false });
const Canvas = dynamic(() => import("@/components/website/canvas/canvas"), { ssr: false });
const MdOnly = dynamic(() => import("@/components/common/md-only/md-only"), { ssr: false });

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps): ReactNode {
  return (
    <ThemeProvider>
      <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        <div className="relative h-full flex-1 items-end justify-start bg-background hidden md:flex">
          <div className="absolute z-0 h-full w-full">
            <MdOnly>
              <Canvas>
                <SpaceShip />
              </Canvas>
            </MdOnly>
          </div>
        </div>
        <section className="h-full px-4 sm:px-8 md:px-24 font-poppins w-full md:w-auto">
          {children}
          <Lang />
          <Theme />
        </section>
      </main>
    </ThemeProvider>
  );
}
