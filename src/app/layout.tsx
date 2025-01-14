import "../styles/globals.css";

import React, { type ReactNode } from "react";
import type { Metadata } from "next";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Toaster } from "@/components/_ui/toaster";
import { poppins, martian } from "@/lib/fonts";
import CommonLevaProvider from "@/components/common-leva-provider/common-leva-provider";

export const metadata: Metadata = {
  // TODO : remove this robots when the site is ready to be indexed
  robots: "noindex, nofollow",
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps): Promise<ReactNode> {
  const locale: string = await getLocale();
  const messages: AbstractIntlMessages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body className={`antialiased ${poppins.variable} ${martian.variable}`} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <CommonLevaProvider>
            {children}
            <Toaster />
          </CommonLevaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
