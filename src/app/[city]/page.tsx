import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Area } from '@/models/Area';
import { getAreasByCity } from '@/lib/db/areas';
import { LocalTrustIndicators } from '@/components/LocalTrustIndicators';
import { LeadForm } from '@/components/ui/LeadForm';
import PageHero from '@/components/ui/PageHero'
import { FAQSection } from '@/components/FAQSection';
import FAQPageSchema from '@/components/SEO/FAQPageSchema';

interface CityPageProps {
  params: {
    city: string;
  };
}

const validCities = [
  'toronto',
  'mississauga',
  'vaughan',
  'oakville',
  'brampton',
  'milton',
  'burlington',
  'markham'
];

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = decodeURIComponent(params.city).toLowerCase();
  
  // Validate city
  if (!validCities.includes(cityName)) {
    return {
      title: 'Page Not Found',
      description: 'The requested city page could not be found.'
    };
  }

  const cityDisplayName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  return {
    title: `Top Real Estate Agents in ${cityDisplayName} | Find Local Experts`,
    description: `Connect with experienced real estate agents in ${cityDisplayName}. Get expert guidance for buying, selling, or investing in real estate. Free consultation, no obligation.`,
    openGraph: {
      title: `Find Top Real Estate Agents in ${cityDisplayName}`,
      description: `Work with experienced local agents who know ${cityDisplayName} inside and out. Get expert guidance for your real estate journey.`,
      images: [`/images/cities/${cityName}.jpg`],
    },
    alternates: {
      canonical: `/${cityName}`,
    },
  };
}

function generateCityFAQs(cityName: string, areas: Area[] = []) {
  const cityDisplayName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  // Get unique features from areas
  const uniqueFeatures = Array.from(
    new Set(
      areas
        ?.flatMap(area => area.features || [])
        ?.map(feature => feature.title.toLowerCase())
    )
  ).slice(0, 3);

  // Get neighborhood names
  const popularNeighborhoods = areas
    ?.slice(0, 3)
    ?.map(area => area.name)
    || [];

  const faqs = [
    {
      question: `What makes ${cityDisplayName} a great place to live?`,
      answer: uniqueFeatures.length > 0
        ? `${cityDisplayName} is known for its ${uniqueFeatures.join(', ')}. The city offers a perfect blend of urban amenities and comfortable living spaces, making it an ideal choice for both families and professionals.`
        : `${cityDisplayName} offers a perfect blend of urban amenities and comfortable living spaces, making it an ideal choice for both families and professionals. With excellent schools, diverse communities, and growing job opportunities, it's a city that caters to various lifestyles.`
    },
    {
      question: `What are the most popular neighborhoods in ${cityDisplayName}?`,
      answer: popularNeighborhoods.length > 0
        ? `Some of ${cityDisplayName}'s most sought-after neighborhoods include ${popularNeighborhoods.join(', ')}. Each area has its unique charm and amenities, catering to different lifestyles and preferences.`
        : `${cityDisplayName} offers diverse neighborhoods to suit every lifestyle, from family-friendly suburban areas to vibrant urban communities. Connect with our local agents to find the perfect neighborhood for your needs.`
    },
    {
      question: `How is the real estate market in ${cityDisplayName}?`,
      answer: `The ${cityDisplayName} real estate market is dynamic and varies by neighborhood. Property values have shown steady growth, making it an attractive option for both homebuyers and investors. For the most current market analysis and trends, connect with our local real estate experts.`
    },
    {
      question: `What should I consider when buying a home in ${cityDisplayName}?`,
      answer: `When buying in ${cityDisplayName}, consider factors like proximity to transit, schools, and amenities. It's also important to understand local market conditions, property taxes, and future development plans. Our experienced local agents can guide you through these considerations and help you make an informed decision.`
    },
    {
      question: `How can I find the best real estate agent in ${cityDisplayName}?`,
      answer: `To find the best real estate agent in ${cityDisplayName}, look for someone with extensive local experience, positive client reviews, and deep knowledge of your target neighborhoods. Our platform connects you with pre-vetted, top-performing agents who specialize in ${cityDisplayName} real estate.`
    }
  ];

  return faqs;
}

export default async function CityPage({ params }: CityPageProps) {
  const cityName = decodeURIComponent(params.city).toLowerCase();
  
  // Validate city
  if (!validCities.includes(cityName)) {
    notFound();
  }

  const cityDisplayName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const areas = await getAreasByCity(cityName);
  
  if (!areas || areas.length === 0) {
    console.log('No areas found for city:', cityName);
  }

  // Generate FAQs using areas data
  const cityFAQs = generateCityFAQs(cityDisplayName, areas);
  
  return (
    <>
      <FAQPageSchema faqs={cityFAQs} />
      <main>
        <PageHero 
          title={`Find Your Perfect Home in ${cityDisplayName}`}
          subtitle="Discover the best properties and real estate agents in your area"
        />
        {/* Quick Actions */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quick Action Cards */}
              <QuickActionCard
                icon={<UserGroupIcon />}
                title="Find an Agent"
                description="Connect with top local experts who understand your needs"
                href="/find-realtor"
              />
              <QuickActionCard
                icon={<HomeIcon />}
                title="Free Home Evaluation"
                description="Get a professional opinion on your home's current market value"
                href="/tools/home-value-estimator"
              />
              <QuickActionCard
                icon={<MapIcon />}
                title="Area Guides"
                description={`Explore detailed guides about ${cityDisplayName} neighborhoods`}
                href="#areas"
              />
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Work With Our Agents?</h2>
            <LocalTrustIndicators />
          </div>
        </section>

        {/* Neighborhood Grid */}
        <section id="areas" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Explore {cityDisplayName} Neighborhoods</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {areas && areas.length > 0 ? (
                areas.map((area) => (
                  <NeighborhoodCard
                    key={area.slug}
                    area={area}
                    cityName={cityName}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No neighborhoods found for {cityDisplayName}.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Helpful Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ResourceCard
                icon={<HomeIcon />}
                title="Free Home Evaluation"
                description="Get a professional opinion on your home's value"
                href="/tools/home-value-estimator"
              />
              <ResourceCard
                icon={<CalculatorIcon />}
                title="Tax Calculator"
                description="Estimate your land transfer tax"
                href="/tools/land-transfer-tax-calculator"
              />
              <ResourceCard
                icon={<ChartIcon />}
                title="Market Reports"
                description="Get the latest market insights"
                href="#"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <FAQSection 
              faqs={cityFAQs}
              className="mb-12"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-primary-100 mb-8">
                Connect with a {cityDisplayName} expert today and get the guidance you need.
              </p>
              <LeadForm location={cityDisplayName} intent="connect" variant="transparent" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Client Components
function UserGroupIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function QuickActionCard({ icon, title, description, href }: QuickActionCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-8">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link 
          href={href}
          className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
        >
          Get Started <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}

interface NeighborhoodCardProps {
  area: Area;
  cityName: string;
}

function NeighborhoodCard({ area, cityName }: NeighborhoodCardProps) {
  return (
    <Link 
      href={`/${cityName}/${area.urlStructure.neighborhood}`}
      className="group"
    >
      <div className="bg-white h-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-100">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {area.name}
            </h3>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-gray-600 line-clamp-3 mb-4">{area.description}</p>
          {area.highlights && area.highlights.length > 0 && (
            <div className="space-y-2">
              {area.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight.label}: {highlight.value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function ResourceCard({ icon, title, description, href }: ResourceCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
} 