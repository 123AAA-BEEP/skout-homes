export type CitySlug = 'toronto' | 'richmond-hill';

export interface Neighbourhood {
  name: string;
  slug: string;
  city: CitySlug;
  description: string;
  features?: {
    parks?: string[];
    transit?: string[];
    schools?: string[];
    shopping?: string[];
  };
} 