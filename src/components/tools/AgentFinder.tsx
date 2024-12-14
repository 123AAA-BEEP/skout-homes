'use client';

import { useState } from 'react';
import { ContactInfo, LeadData } from '@/types';

interface FormData {
  intent: 'buy' | 'sell' | 'invest' | 'rent';
  location: string;
  contact: ContactInfo;
}

export default function AgentFinder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    intent: 'buy',
    location: '',
    contact: {
      name: '',
      email: '',
      phone: '',
      preferredContact: 'either'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData: LeadData = {
      source: 'agent-finder',
      intent: formData.intent,
      contact: formData.contact,
      location: {
        city: formData.location
      }
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        setStep(3); // Success step
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">I want to</label>
        <select
          value={formData.intent}
          onChange={(e) => setFormData({ ...formData, intent: e.target.value as FormData['intent'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="buy">Buy a property</option>
          <option value="sell">Sell my property</option>
          <option value="invest">Invest in real estate</option>
          <option value="rent">Rent a property</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Enter city or neighborhood"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={() => setStep(2)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          required
          value={formData.contact.name}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, name: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={formData.contact.email}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, email: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          required
          value={formData.contact.phone}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, phone: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
        <select
          value={formData.contact.preferredContact}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, preferredContact: e.target.value as 'email' | 'phone' | 'either' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="either">Either</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Find My Agent
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900">Thank You!</h3>
      <p className="text-gray-600">
        We've received your information and a real estate agent will contact you shortly.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Real Estate Agent</h1>
        <p className="text-gray-600">
          We'll match you with a local agent who specializes in your area and understands your needs.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
} 