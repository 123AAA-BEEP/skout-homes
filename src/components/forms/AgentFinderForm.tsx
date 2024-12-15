'use client';

import { useState } from 'react';
import type { Lead } from '@/models/Lead';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone';
}

export default function AgentFinderForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client: Starting agent finder form submission...');
    setError('');
    setIsSubmitting(true);

    if (!formData.name || !formData.email) {
      console.log('Client: Form validation failed - missing required fields');
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        type: 'agent-search',
        area: 'Toronto',
        source: 'agent-finder'
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
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: 'email'
      });
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

  if (success) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="mb-6 text-green-500">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your request has been submitted successfully. A real estate agent will contact you shortly to discuss your needs.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
          <select
            value={formData.preferredContact}
            onChange={(e) => setFormData(prev => ({ ...prev, preferredContact: e.target.value as 'email' | 'phone' }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Finding Agent...' : 'Find My Agent'}
        </button>
      </form>
    </div>
  );
} 