import type { Metadata } from "next";
import "@/styles/globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import { Roboto } from "next/font/google";
import { Inter } from "next/font/google";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};
const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"], // Можно указать нужные веса
  variable: "--font-roboto", // Создаст CSS-переменную
});
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"], // Можно указать нужные веса
  variable: "--font-inter", // Создаст CSS-переменную
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body className={`${roboto.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
