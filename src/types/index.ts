import type { Metadata } from 'next';

// Form-related types
export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'either';
  bestTime?: string;
}

export interface Location {
  city: string;
  address?: string;
  postalCode?: string;
}

export interface PropertyDetails {
  type: 'house' | 'condo' | 'townhouse' | 'residential' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  yearBuilt?: number;
  lotSize?: string;
}

// Base Lead type for form submission
export interface LeadSubmission {
  source: string;
  intent: 'buy' | 'sell' | 'invest' | 'rent';
  contact: ContactInfo;
  location: Location;
  propertyDetails?: PropertyDetails;
  budget?: {
    min?: number;
    max?: number;
  };
  timeline?: string;
  notes?: string;
}

// Extended Lead type with database fields
export interface LeadData extends LeadSubmission {
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

// Re-export Next.js Metadata
export type { Metadata }; 