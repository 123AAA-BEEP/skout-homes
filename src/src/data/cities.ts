export interface City {
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  image?: string;
}

export const cities: City[] = [
  {
    name: 'Toronto',
    slug: 'toronto',
    description: 'Discover Toronto real estate opportunities in Canada\'s largest city. From downtown condos to suburban homes, find your perfect property.',
    metaDescription: 'Explore Toronto real estate listings and connect with top local agents. Find homes, condos, and investment properties in Toronto\'s diverse neighborhoods.',
  },
  {
    name: 'Richmond Hill',
    slug: 'richmond-hill',
    description: 'Explore Richmond Hill real estate in this thriving suburban community. Find family homes and luxury properties in a prime GTA location.',
    metaDescription: 'Browse Richmond Hill real estate listings and connect with experienced local agents. Discover homes and properties in Richmond Hill\'s desirable neighborhoods.',
  }
]; 