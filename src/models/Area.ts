import { ObjectId } from 'mongodb';

// URL structure for area pages
export interface UrlStructure {
  city: string;
  neighborhood: string;
}

// SEO-related content
export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  intents: {
    buy?: IntentSEO;
    sell?: IntentSEO;
    invest?: IntentSEO;
    rent?: IntentSEO;
    agents?: IntentSEO;
  };
  urlPatterns: {
    [key: string]: string;  // Dynamic URL patterns
  };
}

// Intent-specific SEO content
export interface IntentSEO {
  title: string;
  description: string;
  keywords: string[];
}

// FAQ type
export interface FAQ {
  question: string;
  answer: string;
}

// Main Area interface
export interface Area {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  urlStructure: {
    city: string;
    neighborhood: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    intents: {
      buy?: IntentSEO;
      sell?: IntentSEO;
      invest?: IntentSEO;
      rent?: IntentSEO;
      agents?: IntentSEO;
    };
    urlPatterns: {
      [key: string]: string;
    };
  };
  highlights?: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  features?: Array<{
    title: string;
    description: string;
  }>;
  amenities?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Validation function
export function validateArea(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data?.name) errors.push('Name is required');
  if (!data?.slug) errors.push('Slug is required');
  if (!data?.description) errors.push('Description is required');
  if (!data?.imageUrl) errors.push('Image URL is required');
  
  // URL structure
  if (!data?.urlStructure?.city) errors.push('City is required in URL structure');
  if (!data?.urlStructure?.neighborhood) errors.push('Neighborhood is required in URL structure');

  // SEO validation
  if (!data?.seo?.title) errors.push('SEO title is required');
  if (!data?.seo?.description) errors.push('SEO description is required');
  if (!Array.isArray(data?.seo?.keywords)) errors.push('SEO keywords must be an array');

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Sanitize function to clean data before DB operations
export function sanitizeArea(data: Partial<Area>): Partial<Area> {
  const sanitized = { ...data };
  
  // Remove any undefined values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key as keyof Area] === undefined) {
      delete sanitized[key as keyof Area];
    }
  });

  return sanitized;
} 