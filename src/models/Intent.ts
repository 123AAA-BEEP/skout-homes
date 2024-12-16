import { ObjectId } from 'mongodb';

export interface IntentCategory {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Intent {
  _id?: ObjectId;
  keywords: string[];
  displayName: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function validateIntent(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(data?.keywords)) errors.push('Keywords must be an array');
  if (!data?.displayName) errors.push('Display name is required');
  if (!data?.description) errors.push('Description is required');
  if (!data?.seoTitle) errors.push('SEO title is required');
  if (!data?.seoDescription) errors.push('SEO description is required');
  if (!Array.isArray(data?.seoKeywords)) errors.push('SEO keywords must be an array');

  return {
    isValid: errors.length === 0,
    errors
  };
} 