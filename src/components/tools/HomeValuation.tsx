'use client';

import { useState } from 'react';
import { ContactInfo, LeadData } from '@/types';

interface FormData {
  address: string;
  propertyDetails: {
    type: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    lotSize: string;
  };
  contact: ContactInfo;
}

export default function HomeValuation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    address: '',
    propertyDetails: {
      type: 'single-family',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 0,
      yearBuilt: new Date().getFullYear(),
      lotSize: ''
    },
    contact: {
      name: '',
      email: '',
      phone: '',
      preferredContact: 'either'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client: Starting home valuation submission...');
    
    const leadData = {
      name: formData.contact.name,
      email: formData.contact.email,
      phone: formData.contact.phone,
      area: formData.address,
      type: 'seller',
      source: 'home-valuation',
      status: 'new' as const,
      createdAt: new Date(),
      propertyType: formData.propertyDetails.type
    };
    console.log('Client: Sending payload:', leadData);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      console.log('Client: Response status:', response.status);
      const data = await response.json();
      console.log('Client: Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || data.details || 'Failed to submit');
      }

      console.log('Client: Form submitted successfully');
      setStep(4); // Success step
    } catch (error: any) {
      console.error('Client Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // Show error message to user
      alert(error.message || 'Failed to submit form. Please try again.');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Property Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your property address"
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <select
            value={formData.propertyDetails.type}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, type: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="single-family">Single Family Home</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="multi-family">Multi-Family</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year Built</label>
          <input
            type="number"
            value={formData.propertyDetails.yearBuilt}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, yearBuilt: parseInt(e.target.value) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="number"
            value={formData.propertyDetails.bedrooms}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, bedrooms: parseInt(e.target.value) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="number"
            value={formData.propertyDetails.bathrooms}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, bathrooms: parseInt(e.target.value) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Square Feet</label>
          <input
            type="number"
            value={formData.propertyDetails.squareFeet}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, squareFeet: parseInt(e.target.value) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lot Size</label>
          <input
            type="text"
            value={formData.propertyDetails.lotSize}
            onChange={(e) => setFormData({
              ...formData,
              propertyDetails: { ...formData.propertyDetails, lotSize: e.target.value }
            })}
            placeholder="e.g., 0.25 acres"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
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
          onClick={() => setStep(2)}
          className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get My Home Value
        </button>
      </div>
    </form>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900">Thank You!</h3>
      <p className="text-gray-600">
        We're preparing your home value estimate. A real estate professional will contact you shortly with a detailed analysis.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Free Home Value Estimator</h1>
        <p className="text-gray-600">
          Get a professional estimate of your home's value based on recent sales, market trends, and your property's features.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
} 