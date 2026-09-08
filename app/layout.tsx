import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleTag } from "@/components/analytics/google-tag";
import { QueryProvider } from "@/components/query/query-provider";
import { WebMcpProvider } from "@/components/webmcp-provider";
import { company } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? company.domain),
  title: {
    default: `${company.name} | Websites, payments, SEO`,
    template: `%s | ${company.name}`
  },
  description: company.mission,
  openGraph: {
    title: `${company.name} | Websites, payments, SEO`,
    description: company.tagline,
    url: company.domain,
    siteName: company.name,
    type: "website",
    images: [{ url: "/images/victoria-falls-hero.jpg", alt: "Victoria Falls, Zimbabwe" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Websites, payments, SEO`,
    description: company.tagline,
    images: ["/images/victoria-falls-hero.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <GoogleTag />
        <QueryProvider>
          <WebMcpProvider />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
