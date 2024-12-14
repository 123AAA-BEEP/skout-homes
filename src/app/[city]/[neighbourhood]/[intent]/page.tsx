import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Area } from '@/models/Area';
import { Intent, IntentCategory } from '@/models/Intent';
import { getAreaBySlug } from '@/lib/db/areas';
import { getIntentByKeyword } from '@/lib/db/intents';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LeadForm } from '@/components/ui/LeadForm';
import { LocalAreaFeatures } from '@/components/LocalAreaFeatures';
import { LocalTrustIndicators } from '@/components/LocalTrustIndicators';
import { FAQSection } from '@/components/FAQSection';

interface IntentPageProps {
  params: {
    city: string;
    neighbourhood: string;
    intent: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: IntentPageProps): Promise<Metadata> {
  const { city, neighbourhood, intent } = params;
  const slug = `${city}-${neighbourhood}`;
  
  try {
    // Get both area and intent data
    const [area, intentData] = await Promise.all([
      getAreaBySlug(slug),
      getIntentByKeyword(intent)
    ]);

    if (!area || !area.isPublished || !intentData || !intentData.isActive) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      };
    }

    // Replace placeholders in SEO content
    const seoTitle = intentData.seoTitle.replace(/{area}/g, area.name);
    const seoDescription = intentData.seoDescription.replace(/{area}/g, area.name);
    const seoKeywords = intentData.seoKeywords.map(keyword => 
      keyword.replace(/{area}/g, area.name)
    );

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords.join(', '),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.'
    };
  }
}

export default async function IntentPage({ params }: IntentPageProps) {
  const { city, neighbourhood, intent } = params;
  const slug = `${city}-${neighbourhood}`;
  
  try {
    console.log('Fetching data for:', { city, neighbourhood, intent, slug });
    
    // Get both area and intent data
    const [area, intentData] = await Promise.all([
      getAreaBySlug(slug),
      getIntentByKeyword(intent)
    ]);

    console.log('Fetched data:', { 
      areaFound: !!area, 
      areaPublished: area?.isPublished,
      intentFound: !!intentData,
      intentActive: intentData?.isActive 
    });

    // Validate all required data
    if (!area || !area.isPublished || !intentData || !intentData.isActive) {
      console.log('Data validation failed, returning 404');
      notFound();
    }

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: city.charAt(0).toUpperCase() + city.slice(1), href: `/${city}` },
      { label: area.name, href: `/${city}/${neighbourhood}` },
      { label: intentData.displayName, href: `/${city}/${neighbourhood}/${intent}` },
    ];

    // Generate page title
    const title = intentData.displayName
      ? `${intentData.displayName} in ${area.name}`
      : `Find Real Estate Services in ${area.name}`;

    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {intentData.description.replace(/{area}/g, area.name)}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LocalAreaFeatures area={area} />
                <LocalTrustIndicators />
                {area.faqs && area.faqs.length > 0 && (
                  <FAQSection faqs={area.faqs} className="mt-8" />
                )}
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <LeadForm location={area.name} intent={intent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error rendering intent page:', error);
    throw error; // This will trigger the error boundary
  }
} 