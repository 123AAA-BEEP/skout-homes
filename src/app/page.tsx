import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import NeighborhoodStats from '@/components/neighborhoods/NeighborhoodStats'
import NeighborhoodFeatures from '@/components/neighborhoods/NeighborhoodFeatures'

export const metadata: Metadata = {
  title: 'Skout Homes - Toronto & Richmond Hill Real Estate',
  description: 'Find your perfect home in Toronto and Richmond Hill with Skout Homes. Expert real estate services, neighborhood guides, and property insights.',
}

export default function HomePage() {
  const stats = {
    averagePrice: 1250000,
    medianPrice: 1150000,
    totalListings: 234,
    daysOnMarket: 15
  }

  const features = {
    parks: [
      'High Park',
      'Richmond Green Sports Centre',
      'Mill Pond Park'
    ],
    transit: [
      'TTC Subway Access',
      'GO Transit Station',
      'YRT Bus Routes'
    ],
    schools: [
      'Richmond Hill High School',
      'Bayview Secondary',
      'St. Theresa of Lisieux'
    ],
    shopping: [
      'Hillcrest Mall',
      'Richmond Hill Centre',
      'Times Square'
    ]
  }

  return (
    <>
      <Hero 
        title="Find Your Perfect Home"
        subtitle="Discover exceptional properties in Toronto and Richmond Hill with expert guidance every step of the way."
        type="city"
      />
      <div className="container mx-auto px-4 py-16">
        <NeighborhoodStats stats={stats} />
        <NeighborhoodFeatures features={features} />
      </div>
    </>
  )
} 