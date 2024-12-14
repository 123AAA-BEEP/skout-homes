import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Area } from '@/models/Area';
import { getAreaBySlug } from '@/lib/db/areas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LeadForm } from '@/components/ui/LeadForm';
import { LocalAreaFeatures } from '@/components/LocalAreaFeatures';
import { LocalTrustIndicators } from '@/components/LocalTrustIndicators';
import { FAQSection } from '@/components/FAQSection';

interface NeighbourhoodPageProps {
  params: {
    city: string;
    neighbourhood: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NeighbourhoodPageProps): Promise<Metadata> {
  const { city, neighbourhood } = params;
  const slug = `${city}-${neighbourhood}`;
  const area = await getAreaBySlug(slug);

  if (!area) {
    return {
      title: 'Area Not Found',
      description: 'The requested area could not be found.'
    };
  }

  return {
    title: area.seo.title,
    description: area.seo.description,
    keywords: area.seo.keywords.join(', '),
  };
}

export default async function NeighbourhoodPage({ params }: NeighbourhoodPageProps) {
  const { city, neighbourhood } = params;
  const slug = `${city}-${neighbourhood}`;
  const area = await getAreaBySlug(slug);

  if (!area || !area.isPublished) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: city.charAt(0).toUpperCase() + city.slice(1), href: `/${city}` },
    { label: area.name, href: `/${city}/${neighbourhood}` },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{area.name}</h1>
          <p className="text-lg text-gray-600 mb-8">{area.description}</p>
          
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
                <LeadForm location={area.name} intent="connect" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 