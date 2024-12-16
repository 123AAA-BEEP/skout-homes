import { ObjectId } from 'mongodb';

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  area: string;
  type: 'buyer' | 'seller' | 'agent-search';
  propertyType?: string;
  urgency?: 'standard' | 'soon' | 'urgent';
  specialty?: string;
  timestamp: Date;
  createdAt: Date;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  source?: 'website' | 'hero-form' | 'contact-form' | 'other';
}

interface ValidationError {
  field: string;
  message: string;
}

export function validateLead(data: any): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data?.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters' });
  }

  if (!data?.email || typeof data.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
  }

  if (!data?.area || typeof data.area !== 'string' || data.area.trim().length < 2) {
    errors.push({ field: 'area', message: 'Area is required and must be at least 2 characters' });
  }

  // Type validation
  const validTypes = ['buyer', 'seller', 'agent-search'] as const;
  if (!data?.type || !validTypes.includes(data.type)) {
    errors.push({ field: 'type', message: `Type must be one of: ${validTypes.join(', ')}` });
  }

  // Optional fields validation
  if (data?.phone && typeof data.phone !== 'string') {
    errors.push({ field: 'phone', message: 'Phone must be a string' });
  }

  if (data?.message && typeof data.message !== 'string') {
    errors.push({ field: 'message', message: 'Message must be a string' });
  }

  if (data?.propertyType && typeof data.propertyType !== 'string') {
    errors.push({ field: 'propertyType', message: 'Property type must be a string' });
  }

  const validUrgencyLevels = ['standard', 'soon', 'urgent'] as const;
  if (data?.urgency && !validUrgencyLevels.includes(data.urgency)) {
    errors.push({ field: 'urgency', message: `Urgency must be one of: ${validUrgencyLevels.join(', ')}` });
  }

  if (data?.specialty && typeof data.specialty !== 'string') {
    errors.push({ field: 'specialty', message: 'Specialty must be a string' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
} 