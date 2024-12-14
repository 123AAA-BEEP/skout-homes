'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LeadSubmission } from '@/types';
import { submitLead } from '@/lib/api/leads';

interface FormData {
  location: string;
  intent: 'buy' | 'sell' | 'invest';
  contact: string;
}

const Hero = () => {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    intent: 'buy',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.location) {
      setError('Please enter your location');
      return false;
    }
    if (!formData.contact) {
      setError('Please enter your contact information');
      return false;
    }
    // Basic email validation
    if (formData.contact.includes('@') && !/\S+@\S+\.\S+/.test(formData.contact)) {
      setError('Please enter a valid email address');
      return false;
    }
    // Basic phone validation
    if (!formData.contact.includes('@') && !/^\+?[\d\s-]{10,}$/.test(formData.contact)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isEmail = formData.contact.includes('@');
    const leadData: LeadSubmission = {
      source: 'hero-form',
      intent: formData.intent,
      contact: {
        name: formData.name,
        email: isEmail ? formData.contact : '',
        phone: !isEmail ? formData.contact : '',
        preferredContact: isEmail ? 'email' : 'phone'
      },
      location: {
        city: formData.city || 'Toronto'
      }
    };

    try {
      await submitLead(leadData);
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="relative h-[600px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        alt="Modern home exterior"
        fill
        priority
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Top Real Estate Agents in the Greater Toronto Area
          </h1>
          <p className="text-xl text-white mb-8">
            Connect with experienced local agents in your neighbourhood
          </p>
          
          {/* Lead Capture Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  A real estate agent will contact you shortly to discuss your needs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                  <select
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={formData.intent}
                    onChange={(e) => setFormData({ ...formData, intent: e.target.value as FormData['intent'] })}
                  >
                    <option value="buy">Buy a property</option>
                    <option value="sell">Sell a property</option>
                    <option value="invest">Invest in property</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Phone or Email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Connecting...' : 'Connect with an Agent Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 