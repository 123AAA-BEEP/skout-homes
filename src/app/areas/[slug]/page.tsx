import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAreaBySlug, getPopularAreas } from '@/lib/db/areas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LeadForm } from '@/components/ui/LeadForm';
import TrustIndicators from '@/components/home/TrustIndicators';
import { Area } from '@/models/Area';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for popular areas
export async function generateStaticParams() {
  const areas = await getPopularAreas(20);
  return areas.map((area) => ({
    slug: area.slug,
  }));
}

// Allow dynamic params for other areas
export const dynamicParams = true;

// Revalidate every 24 hours
export const revalidate = 86400;

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = await getAreaBySlug(params.slug);
  if (!area) return {};

  const title = area.seo?.title || `${area.name} Real Estate | Expert Local Agents`;
  const description = area.seo?.description || 
    `Find top real estate agents in ${area.name}. Get expert guidance, local market insights, and free consultation. Discover ${area.name} properties today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [area.imageUrl],
    },
  };
}

// Generate schema markup
function generateSchema(areaData: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: areaData.name,
    description: areaData.description,
    image: areaData.imageUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: areaData.coordinates?.lat,
      longitude: areaData.coordinates?.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const areaData = await getAreaBySlug(params.slug);

  if (!areaData) {
    notFound();
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema(areaData)) }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Areas', href: '/areas' },
            { label: areaData.name, href: `/areas/${params.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="relative h-[500px] w-full mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={areaData.imageUrl}
              alt={`${areaData.name} neighborhood`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">{areaData.name}</h1>
              <p className="text-xl opacity-90">{areaData.description}</p>
            </div>
            {/* Lead Form */}
            <div className="w-96">
              <LeadForm location={areaData.name} intent="explore" />
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Neighborhood Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areaData.highlights?.map((highlight) => (
              <div key={highlight.label} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-primary-600">{highlight.value}</p>
                  <p className="text-sm font-medium text-gray-600">{highlight.label}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Area Features */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6">About {areaData.name}</h2>
          <div className="prose max-w-none">
            {areaData.features?.map((feature, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Local Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {areaData.amenities?.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {areaData.faqs?.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
} 