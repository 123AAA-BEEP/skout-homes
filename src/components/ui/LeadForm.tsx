'use client';

import React from 'react';

interface LeadFormProps {
  location: string;
  intent: string;
  propertyType?: string;
}

export function LeadForm({ location, intent, propertyType }: LeadFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const leadData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location,
      intent,
      propertyType,
      timestamp: new Date().toISOString()
    };

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

      // Clear form
      e.currentTarget.reset();
      
      // Show success message
      alert('Thank you! We will contact you shortly.');
      
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  // Get form title based on intent
  const getFormTitle = () => {
    const titles: { [key: string]: string } = {
      buy: 'Get Property Recommendations',
      sell: 'Get Your Home Valuation',
      invest: 'Get Investment Opportunities',
      rent: 'Find Your Perfect Rental',
      'home-evaluation': 'Get Your Free Home Evaluation',
      'agents': 'Connect with a Local Expert',
      'consultation': 'Schedule Your Consultation',
      'professional-services': 'Connect with Professional Services'
    };
    return titles[intent] || 'Connect with an Expert';
  };

  return (
    <div className="bg-white bg-opacity-100 rounded-lg shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">{getFormTitle()}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(416) 555-0123"
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required
          />
        </div>
        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="intent" value={intent} />
        {propertyType && <input type="hidden" name="propertyType" value={propertyType} />}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Get Expert Help Now
        </button>
      </form>
      <p className="mt-3 text-xs text-gray-500 text-center">
        By submitting, you agree to our terms and privacy policy.
      </p>
    </div>
  );
} 