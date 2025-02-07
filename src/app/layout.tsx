import { type ReactNode } from "react";

import type { Metadata } from "next";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Toaster } from "@/components/_ui/toaster";
import LevaProvider from "@/components/common/leva-provider/leva-provider";

import { orbitron, poppins } from "@/lib/fonts";

import "../styles/globals.css";

export const metadata: Metadata = {
  // TODO : remove this robots when the site is ready to be indexed
  robots: "noindex, nofollow",
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps): Promise<ReactNode> {
  const locale: string = await getLocale();
  const messages: AbstractIntlMessages = await getMessages();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning={true}>
      <body
        className={`antialiased ${poppins.variable} ${orbitron.variable} bg-black text-white`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <LevaProvider>
            {children}
            <Toaster />
          </LevaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
