import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/app/providers";
import {
  LOCALE_COOKIE_NAME,
  parseLocaleCookie,
} from "@/shared/i18n/constants";
import enMessages from "@/shared/i18n/messages/en.json";
import koMessages from "@/shared/i18n/messages/ko.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Life Anime Nine",
  description:
    "취향 기반 커뮤니티에서 나만의 탑 9 애니 목록을 만들고 공유하세요.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = parseLocaleCookie(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value,
  );

  return (
    <html
      lang={initialLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <I18nProvider
            initialLocale={initialLocale}
            messages={{ ko: koMessages, en: enMessages }}
          >
            <SiteHeader />
            {children}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
