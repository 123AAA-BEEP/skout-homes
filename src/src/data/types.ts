export type CitySlug = 'toronto' | 'richmond-hill';

export interface Neighbourhood {
  name: string;
  slug: string;
  city: CitySlug;
  description: string;
  metaDescription: string;
  features?: {
    parks?: string[];
    transit?: string[];
    schools?: string[];
    shopping?: string[];
  };
  boundaries?: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  stats?: {
    averagePrice: number;
    medianPrice: number;
    totalListings: number;
    daysOnMarket: number;
  };
} 