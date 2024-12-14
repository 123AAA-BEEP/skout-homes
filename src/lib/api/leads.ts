import type { LeadSubmission } from '@/types';

export async function submitLead(leadData: LeadSubmission) {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Lead submission error:', error);
    throw error;
  }
} 