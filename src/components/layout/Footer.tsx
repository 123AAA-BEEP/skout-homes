import Link from 'next/link';

interface FooterSection {
  title: string;
  type: 'links';
  columns?: number;
  items: Array<{
    label: string;
    href: string;
  }>;
}

export default function Footer() {
  const sections: FooterSection[] = [
    {
      title: "Popular Locations",
      type: "links",
      columns: 2,
      items: [
        {
          label: "Toronto Real Estate",
          href: "/toronto"
        },
        {
          label: "Mississauga Real Estate",
          href: "/mississauga"
        },
        {
          label: "Vaughan Real Estate",
          href: "/vaughan"
        },
        {
          label: "Oakville Real Estate",
          href: "/oakville"
        },
        {
          label: "Burlington Real Estate",
          href: "/burlington"
        },
        {
          label: "Brampton Real Estate",
          href: "/brampton"
        }
      ]
    },
    {
      title: "Quick Links",
      type: "links",
      items: [
        {
          label: "Find an Agent",
          href: "/find-realtor"
        },
        {
          label: "Free Home Valuation",
          href: "/tools/home-value-estimator"
        },
        {
          label: "Land Transfer Calculator",
          href: "/tools/land-transfer-tax-calculator"
        },
        {
          label: "Market Reports",
          href: "/market-reports"
        },
        {
          label: "Professional Services",
          href: "/professional-services"
        }
      ]
    },
    {
      title: "Resources",
      type: "links",
      items: [
        {
          label: "Buying Guide",
          href: "/guides/buying"
        },
        {
          label: "Selling Guide",
          href: "/guides/selling"
        },
        {
          label: "Investment Guide",
          href: "/guides/investing"
        },
        {
          label: "Market Updates",
          href: "/market-updates"
        }
      ]
    }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: "Accessibility", href: "/accessibility" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-4 py-8 bg-gray-100 md:px-6 md:py-12" role="contentinfo">
      {/* Main Sections */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4" id={`footer-section-${index}`}>
                {section.title}
              </h3>
              <div 
                className={`grid ${section.columns === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}
                role="list"
                aria-labelledby={`footer-section-${index}`}
              >
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:underline"
                    role="listitem"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclosure */}
        <div className="text-sm text-gray-600 mt-8 px-4">
          <h4 className="sr-only">Legal Disclosure</h4>
          <p>
            Disclosure: this website, and commentary herein are provided solely for the purpose to openly provide information to the public. The content of this website is for informational and conceptual purposes only. Prices, specifications, and architectural renderings are subject to change without notice. E. &O.E. Illustrations are artist's concept. The website is an open platform to share information to the public and does not provide any real estate, brokerage, appraisal, mortgage, legal or any other real property related services. Please consult a qualified professional before making any financial decisions. If you are dissatisfied with this website or with this agreement, your sole and exclusive remedy is to discontinue using this website. Please refer to our Privacy Policy and Legal Disclaimer for reference.
          </p>
        </div>

        {/* Broker Info */}
        <div className="text-sm font-semibold mt-4 px-4">
          <address className="not-italic">
            Alex Karczewski | Broker | Orion Realty Corporation, Brokerage<br />
            1149 Lakeshore Rd E, Mississauga ON L5E 1E8
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Skout Homes. All rights reserved.
            </p>
            <nav 
              className="flex gap-4 mt-4 md:mt-0" 
              aria-label="Legal links"
            >
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Skout Homes",
            "url": "https://skouthomes.com",
            "logo": "https://skouthomes.com/logo.svg",
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
                  "postalCode": "L5E 1E8",
                  "addressCountry": "CA"
                }
              }
            },
            "areaServed": [
              "Toronto",
              "Mississauga",
              "Vaughan",
              "Oakville",
              "Burlington",
              "Brampton"
            ]
          })
        }}
      />
    </footer>
  );
} 