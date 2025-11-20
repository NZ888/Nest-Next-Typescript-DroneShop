import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import {site} from "@/config/site"
import "@/styles/globals.css"

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
        {children}
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
