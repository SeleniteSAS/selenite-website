import { lazy, type ReactNode } from "react";

import Link from "next/link";

import Canvas from "@/components/website/canvas/canvas";
import Clock from "@/components/website/clock/clock";
import Loader from "@/components/website/loader/loader";

import { env } from "@/lib/env";
import SpaceShip from "@/components/website/spaceship/spaceship";

const Moon = lazy(() => import("@/components/website/moon/moon"));

export default async function WebsitePage(): Promise<ReactNode> {
  return (
    <div className="mt-32 h-[400vh]">
      {/* <Loader /> */}
      <div className="h-[300vh]">
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
        <div className="fixed inset-0 -z-10 h-screen w-screen">
          <Canvas style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
            <Moon />
            <SpaceShip />
          </Canvas>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="font-orbitron fixed bottom-8 left-8 text-lg">
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
