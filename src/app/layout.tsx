import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Racquet sports gear, expert matched`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tennis racquets India",
    "badminton racquets online",
    "pickleball paddles India",
    "padel rackets",
    "squash racquets",
    "free racquet stringing",
    "buy tennis shoes online India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — Find the racquet that plays like you`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Find the racquet that plays like you`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0B1426",
  colorScheme: "light",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    foundingDate: site.founded,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: [site.social.instagram, site.social.youtube, site.social.x],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "5214",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <AnnouncementBar />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileTabBar />
        <script
          type="application/ld+json"
          // Static, author-controlled payload — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
