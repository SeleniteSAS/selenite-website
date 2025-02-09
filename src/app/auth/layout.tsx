import { ReactNode } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import Lang from "@/components/common/lang/lang";
import Canvas from "@/components/website/canvas/canvas";

import { env } from "@/lib/env";

const SpaceShip = dynamic(() => import("@/components/auth/spaceship/spaceship"));

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps): ReactNode {
  const link: string = env.NEXT_PUBLIC_ROOT_URL;

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="relative flex h-full flex-1 items-end justify-start bg-background">
        
        <div className="absolute z-0 h-full w-full">
          <Canvas>
            <SpaceShip />
          </Canvas>
        </div>
      </div>
      <section className="h-full px-24 font-poppins">
        {children}
        <Lang />
      </section>
    </main>
  );
}
