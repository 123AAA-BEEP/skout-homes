import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'

export const metadata: Metadata = {
  title: 'Locations | Skout Homes',
  description: 'Explore properties in Toronto, Richmond Hill, and surrounding areas. Find detailed neighborhood guides and market insights.',
}

export default function LocationsPage() {
  return (
    <>
      <Hero
        title="Our Locations"
        subtitle="Discover properties in Toronto's and Richmond Hill's most desirable neighborhoods"
        type="city"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Toronto</h2>
              <p className="text-gray-600 mb-4">
                Explore Canada's largest city with diverse neighborhoods and vibrant culture.
              </p>
              <a href="/locations/toronto" className="text-blue-600 font-semibold hover:text-blue-800">
                View neighborhoods →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Richmond Hill</h2>
              <p className="text-gray-600 mb-4">
                Discover this family-friendly suburb with excellent schools and amenities.
              </p>
              <a href="/locations/richmond-hill" className="text-blue-600 font-semibold hover:text-blue-800">
                View neighborhoods →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 