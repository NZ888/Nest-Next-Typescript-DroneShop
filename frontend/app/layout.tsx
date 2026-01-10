import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import {site} from "@/config/site"
import "@/styles/globals.css"
import {QueryProvider} from "@/providers/query-provider";
import {NotificationProvider} from "@/providers/NotificationProvider";

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    variable: "--font-manrope",
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: site.name,
    description: site.description,
    authors: site.author,
    keywords: site.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
      <QueryProvider>
          <NotificationProvider>
              {children}
          </NotificationProvider>
      </QueryProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
