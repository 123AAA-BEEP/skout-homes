import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAreaByCity } from '@/lib/db/areas';
import { IntentTemplate } from '@/components/templates/IntentTemplates';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { trackPageView } from '@/lib/analytics/pageTracking';
import { Area } from '@/models/Area';

interface PageProps {
  params: {
    city: string;
    slug: string[];
  };
}

// Helper function to extract intent and property type from URL
function extractUrlParams(slug: string[]): {
  intent: string | undefined;
  propertyType?: string;
  subIntent?: string;
} {
  const lastSegment = slug[slug.length - 1];
  const secondLastSegment = slug.length > 1 ? slug[slug.length - 2] : undefined;
  
  const intents = {
    'homes-for-sale': 'buy',
    'sell-your-home': 'sell',
    'investment-properties': 'invest',
    'homes-for-rent': 'rent',
    'real-estate-agents': 'agents'
  } as const;

  let intent: string | undefined;
  let propertyType: string | undefined;
  let subIntent: string | undefined;

  // Check if last segment matches a URL pattern
  if (lastSegment && lastSegment in intents) {
    intent = intents[lastSegment as keyof typeof intents];
  }

  return { intent, propertyType, subIntent };
}

// Helper function to get SEO data based on intent and property type
function getSeoData(area: Area, intent?: string, propertyType?: string, subIntent?: string): any {
  if (!intent) return area.seo;
  
  // Type assertion to ensure intent is a valid key
  const validIntents = ['buy', 'sell', 'invest', 'rent', 'agents'] as const;
  type ValidIntent = typeof validIntents[number];
  
  if (validIntents.includes(intent as ValidIntent)) {
    const intentData = area.seo.intents[intent as ValidIntent];
    if (!intentData) return area.seo;
    return intentData;
  }
  
  return area.seo;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, slug } = params;
  const neighborhood = slug[0];
  
  const area = await getAreaByCity(city, neighborhood);
  if (!area) return {};

  const { intent } = extractUrlParams(slug);
  const seoData = getSeoData(area, intent);

  if (!seoData) {
    console.error(`No SEO data found for ${neighborhood} with intent ${intent}`);
    return {};
  }

  return {
    title: seoData.metaTitle || seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [area.imageUrl],
    },
    alternates: {
      canonical: seoData.canonicalUrl,
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { city, slug } = params;
  const neighborhood = slug[0];
  
  // Get area data
  const area = await getAreaByCity(city, neighborhood);
  if (!area) {
    console.error(`Area not found: ${city}/${neighborhood}`);
    notFound();
  }

  const { intent } = extractUrlParams(slug);
  const currentPath = `/${city}/${slug.join('/')}`;
  
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: city.charAt(0).toUpperCase() + city.slice(1), href: `/${city}` },
    { label: area.name, href: `/${city}/${neighborhood}` },
    ...(intent ? [{ label: intent.charAt(0).toUpperCase() + intent.slice(1), href: currentPath }] : [])
  ];

  // Get SEO and content data
  const seoData = getSeoData(area, intent);

  // Track page view
  await trackPageView({
    path: currentPath,
    city,
    neighborhood: area.name,
    intent: intent || 'overview',
    serviceType: intent === 'agents' ? 'agent-search' : undefined
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {area.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(area.seo.structuredData)
          }}
        />
      )}

      <div className="mt-8">
        <IntentTemplate 
          area={area}
          intent={intent || 'overview'}
          seoData={seoData}
        />
      </div>
    </main>
  );
} 