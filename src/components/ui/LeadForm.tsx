'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface LeadFormProps {
  location: string;
  intent: string;
  propertyType?: string;
  variant?: 'white' | 'transparent';
}

export function LeadForm({ location, intent, propertyType, variant = 'white' }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    console.log('Client: Starting form submission...');
    
    const leadData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      area: location,
      type: 'agent-search',
      propertyType,
      status: 'new',
      createdAt: new Date(),
      source: 'website'
    };
    
    console.log('Client: Sending payload:', leadData);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      console.log('Client: Response status:', response.status);
      const data = await response.json();
      console.log('Client: Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || data.details || 'Failed to submit');
      }

      // Clear form and show success
      setFormData({ name: '', phone: '', email: '' });
      setSuccess(true);
      
    } catch (error: any) {
      console.error('Client Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTransparent = variant === 'transparent';

  if (success) {
    return (
      <div className={cn(
        "rounded-lg shadow-xl p-8 text-center",
        isTransparent ? "bg-white/10 backdrop-blur-xl border border-white/10" : "bg-white border border-gray-100"
      )}>
        <div className="mb-6">
          <svg className={cn(
            "w-16 h-16 mx-auto",
            isTransparent ? "text-green-400" : "text-green-500"
          )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={cn(
          "text-2xl font-semibold mb-4",
          isTransparent ? "text-white" : "text-gray-900"
        )}>Thank You!</h3>
        <p className={cn(
          "mb-4",
          isTransparent ? "text-gray-200" : "text-gray-600"
        )}>
          We'll connect you with a local expert shortly.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg shadow-xl p-6",
      isTransparent ? "bg-white/10 backdrop-blur-xl border border-white/10" : "bg-white border border-gray-100"
    )}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={cn(
            "block text-sm font-medium",
            isTransparent ? "text-white" : "text-gray-700"
          )}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={cn(
              "mt-1 block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-1 focus:ring-primary-500/40 transition-all duration-200",
              isTransparent 
                ? "bg-white/5 border-white/10 text-white placeholder-gray-400" 
                : "border-gray-300 text-gray-900 placeholder-gray-500"
            )}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className={cn(
            "block text-sm font-medium",
            isTransparent ? "text-white" : "text-gray-700"
          )}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(416) 555-0123"
            className={cn(
              "mt-1 block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-1 focus:ring-primary-500/40 transition-all duration-200",
              isTransparent 
                ? "bg-white/5 border-white/10 text-white placeholder-gray-400" 
                : "border-gray-300 text-gray-900 placeholder-gray-500"
            )}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={cn(
            "block text-sm font-medium",
            isTransparent ? "text-white" : "text-gray-700"
          )}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={cn(
              "mt-1 block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-1 focus:ring-primary-500/40 transition-all duration-200",
              isTransparent 
                ? "bg-white/5 border-white/10 text-white placeholder-gray-400" 
                : "border-gray-300 text-gray-900 placeholder-gray-500"
            )}
            required
          />
        </div>
        {error && (
          <p className={cn(
            "text-sm",
            isTransparent ? "text-red-400" : "text-red-600"
          )}>{error}</p>
        )}
        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="intent" value={intent} />
        {propertyType && <input type="hidden" name="propertyType" value={propertyType} />}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Get Expert Help Now'}
        </button>
      </form>
      <p className={cn(
        "mt-3 text-xs text-center",
        isTransparent ? "text-gray-300" : "text-gray-500"
      )}>
        By submitting, you agree to our terms and privacy policy.
      </p>
    </div>
  );
} 