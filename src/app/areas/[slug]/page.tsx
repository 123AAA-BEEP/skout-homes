import { getAreaBySlug } from '@/lib/db/areas';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = await getAreaBySlug(params.slug);
  
  if (!area) {
    return {
      title: 'Area Not Found',
      description: 'The requested area could not be found.'
    };
  }

  return {
    title: `${area.name} Real Estate | Skout Homes`,
    description: area.description || `Find real estate in ${area.name}`,
  };
}

export default async function AreaPage({ params }: PageProps) {
  const area = await getAreaBySlug(params.slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{area.name}</h1>
        <p className="text-lg text-gray-700 mb-6">{area.description}</p>
      </div>
    </main>
  );
} 