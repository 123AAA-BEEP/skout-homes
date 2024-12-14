import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Real Estate Website',
  description: 'Find your perfect home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
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