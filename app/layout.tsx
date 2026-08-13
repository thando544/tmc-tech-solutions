import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { QueryProvider } from "@/components/query/query-provider";
import { company } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? company.domain),
  title: {
    default: `${company.name} | AI & Modern Technology`,
    template: `%s | ${company.name}`
  },
  description: company.mission,
  openGraph: {
    title: `${company.name} | AI & Modern Technology`,
    description: company.tagline,
    url: company.domain,
    siteName: company.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | AI & Modern Technology`,
    description: company.tagline
  },
  robots: {
    index: true,
    follow: true
  },
  other: {
    "google-adsense-account": "ca-pub-5531660508195606"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5531660508195606"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
