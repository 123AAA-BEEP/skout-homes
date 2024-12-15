'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Lead } from '@/models/Lead';

interface FormData {
  location: string;
  email: string;
  name: string;
}

export default function Hero() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    email: '',
    name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client: Starting form submission...');
    setError('');
    setIsSubmitting(true);

    // Validate form
    if (!formData.location || !formData.email || !formData.name) {
      console.log('Client: Form validation failed - missing fields');
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        area: formData.location,
        type: 'buyer',
        status: 'new',
        source: 'hero-form'
      };
      console.log('Client: Sending payload:', payload);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Client: Response status:', response.status);
      const data = await response.json();
      console.log('Client: Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || data.details || 'Failed to submit');
      }

      console.log('Client: Form submitted successfully');
      setSuccess(true);
      setFormData({ location: '', email: '', name: '' });
    } catch (err: any) {
      console.error('Client Error:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      setError(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
          alt="Modern home"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Top Real Estate Agents in the Greater Toronto Area
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Connect with experienced local agents in your neighbourhood
          </p>

          {success ? (
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="mb-4 text-green-400">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300">
                  We'll connect you with a local expert shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white rounded-lg"
              />
              <input
                type="text"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 bg-white rounded-lg"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-white rounded-lg"
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Connecting...' : 'Connect with an Agent Now'}
              </button>
              <p className="text-sm text-gray-400">
                By continuing, you agree to our terms and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 