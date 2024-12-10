import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'

export const metadata: Metadata = {
  title: 'Real Estate Services | Skout Homes',
  description: 'Professional real estate services in Toronto and Richmond Hill. Home buying, selling, property valuation, and expert guidance.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'Home Buying',
      description: 'Find your dream home with our expert guidance. We'll help you navigate the market and make informed decisions.',
      link: '/services/buying'
    },
    {
      title: 'Home Selling',
      description: 'Get the best value for your property. Our marketing strategies and network ensure maximum exposure.',
      link: '/services/selling'
    },
    {
      title: 'Property Valuation',
      description: 'Know your home's worth in today's market. Get a detailed analysis and valuation report.',
      link: '/services/home-valuation'
    },
    {
      title: 'Investment Properties',
      description: 'Build your real estate portfolio with profitable investment opportunities.',
      link: '/services/investment'
    }
  ]

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Professional real estate services tailored to your needs"
        type="city"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a
                href={service.link}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 