import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skout Homes - Find Your Perfect Home',
  description: 'Discover your dream home with Skout Homes. Browse listings, connect with realtors, and find the perfect property.',
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Skout Homes
        </h1>
        <p className="text-center text-xl mb-8">
          Your journey to finding the perfect home starts here
        </p>
      </div>
    </main>
  )
} 