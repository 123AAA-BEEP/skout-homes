import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Find Top Real Estate Agents in GTA | Expert Local Realtors',
    template: '%s | Skout Homes'
  },
  description: 'Connect with experienced real estate agents in Toronto, Mississauga, and across the GTA. Get free consultation and local expertise for buying or selling your home.',
  keywords: ['real estate agent', 'realtor', 'Toronto real estate', 'GTA realtor', 'find real estate agent'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Skout Homes'
  }
}; 