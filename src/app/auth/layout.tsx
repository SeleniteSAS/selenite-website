import { ReactNode } from "react";

import Link from "next/link";

type AuthLayoutProps = { children: ReactNode };

export default function AuthLayout({ children }: AuthLayoutProps): ReactNode {
  const link = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://selenite.live";
  return (
    <main className="relative hidden h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <aside className="relative hidden h-full flex-col bg-foreground p-10 text-background dark:border-r lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
          Connect to{" "}
          <Link href={link} className={"ml-1"}>
            selenite.live
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “This library has saved me countless hours of work and helped me deliver stunning designs to my clients
              faster than ever before.”
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </aside>
      <div className="relative h-screen lg:p-8">{children}</div>
    </main>
  );
}
