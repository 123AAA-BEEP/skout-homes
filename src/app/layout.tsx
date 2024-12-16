import './globals.css';
import type { Metadata } from 'next';
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/providers/SessionProvider";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: "Skout Homes | Find Your Perfect Home",
    template: "%s | Skout Homes"
  },
  description: "Find your perfect home with Skout Homes. Browse listings, connect with agents, and discover your dream property in your desired neighborhood.",
  keywords: ["real estate", "homes", "property", "real estate agents", "house hunting", "property search"],
  authors: [{ name: "Skout Homes" }],
  creator: "Skout Homes",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXTAUTH_URL,
    title: 'Skout Homes | Find Your Perfect Home',
    description: 'Find your perfect home with Skout Homes. Browse listings, connect with agents, and discover your dream property.',
    siteName: 'Skout Homes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skout Homes | Find Your Perfect Home',
    description: 'Find your perfect home with Skout Homes. Browse listings, connect with agents, and discover your dream property.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Failed to get session:', error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider session={session}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProvider>
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Skout Homes",
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "43.6532",
                "longitude": "-79.3832"
              },
              "geoRadius": "100 km"
            },
            "broker": {
              "@type": "RealEstateBroker",
              "name": "Alex Karczewski",
              "jobTitle": "Broker",
              "worksFor": {
                "@type": "RealEstateOrganization",
                "name": "Orion Realty Corporation, Brokerage",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1149 Lakeshore Rd E",
                  "addressLocality": "Mississauga",
                  "addressRegion": "ON",
                  "postalCode": "L5E 1E8"
                }
              }
            }
          })}
        </Script>
      </body>
    </html>
  );
} 