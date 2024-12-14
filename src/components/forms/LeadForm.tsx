'use client';

import { useState } from 'react';
import { Lead } from '@/models/Lead';

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      intent: formData.get('intent'),
      contact: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        preferredContact: formData.get('preferredContact')
      },
      location: {
        city: formData.get('city'),
        neighbourhood: formData.get('neighbourhood'),
        postalCode: formData.get('postalCode')
      }
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Submission failed');

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-gray-700">
          I want to:
        </label>
        <select
          id="intent"
          name="intent"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="buyer">Buy a property</option>
          <option value="seller">Sell a property</option>
          <option value="both">Both buy and sell</option>
          <option value="investor">Invest in property</option>
          <option value="information">Get more information</option>
        </select>
      </div>

      {/* Add other form fields */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Connect with an Agent'}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {success && (
        <p className="text-green-600 text-sm mt-2">
          Thank you! An agent will contact you shortly.
        </p>
      )}
    </form>
  );
} 