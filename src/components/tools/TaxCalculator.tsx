'use client';

import { useState } from 'react';
import { ContactInfo, LeadData } from '@/types';

interface FormData {
  purchasePrice: number;
  firstTimeBuyer: boolean;
  propertyType: 'residential' | 'commercial';
  location: string;
  contact: ContactInfo;
}

interface TaxBreakdown {
  provincial: number;
  municipal: number;
  firstTimeBuyerRebate: number;
  total: number;
}

export default function TaxCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    purchasePrice: 0,
    firstTimeBuyer: false,
    propertyType: 'residential',
    location: 'toronto',
    contact: {
      name: '',
      email: '',
      phone: '',
      preferredContact: 'either'
    }
  });

  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown>({
    provincial: 0,
    municipal: 0,
    firstTimeBuyerRebate: 0,
    total: 0
  });

  const calculateProvincialTax = (price: number): number => {
    if (price <= 55000) return price * 0.005;
    if (price <= 250000) return 275 + (price - 55000) * 0.01;
    if (price <= 400000) return 2225 + (price - 250000) * 0.015;
    return 4475 + (price - 400000) * 0.02;
  };

  const calculateMunicipalTax = (price: number, city: string): number => {
    if (city.toLowerCase() !== 'toronto') return 0;
    return price * 0.02;
  };

  const calculateFirstTimeBuyerRebate = (price: number): number => {
    if (price <= 368000) return calculateProvincialTax(price);
    if (price <= 400000) {
      const rebate = 4000 - ((price - 368000) * 4000) / (400000 - 368000);
      return Math.max(0, rebate);
    }
    return 0;
  };

  const calculateTax = () => {
    const provincial = calculateProvincialTax(formData.purchasePrice);
    const municipal = calculateMunicipalTax(formData.purchasePrice, formData.location);
    const firstTimeBuyerRebate = formData.firstTimeBuyer ? 
      calculateFirstTimeBuyerRebate(formData.purchasePrice) : 0;
    
    setTaxBreakdown({
      provincial,
      municipal,
      firstTimeBuyerRebate,
      total: provincial + municipal - firstTimeBuyerRebate
    });

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData: LeadData = {
      source: 'tax-calculator',
      intent: 'buy',
      contact: formData.contact,
      location: {
        city: formData.location
      },
      propertyDetails: {
        type: formData.propertyType
      },
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        setStep(4);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={formData.purchasePrice || ''}
            onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
            className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="500000"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Property Type</label>
        <select
          value={formData.propertyType}
          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as 'residential' | 'commercial' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <select
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="toronto">Toronto</option>
          <option value="mississauga">Mississauga</option>
          <option value="brampton">Brampton</option>
          <option value="vaughan">Vaughan</option>
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="firstTimeBuyer"
          checked={formData.firstTimeBuyer}
          onChange={(e) => setFormData({ ...formData, firstTimeBuyer: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="firstTimeBuyer" className="ml-2 block text-sm text-gray-700">
          I am a first-time home buyer
        </label>
      </div>
      <button
        onClick={calculateTax}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Calculate Tax
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Provincial Tax:</span>
            <span className="font-medium">{formatCurrency(taxBreakdown.provincial)}</span>
          </div>
          {taxBreakdown.municipal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Municipal Tax:</span>
              <span className="font-medium">{formatCurrency(taxBreakdown.municipal)}</span>
            </div>
          )}
          {taxBreakdown.firstTimeBuyerRebate > 0 && (
            <div className="flex justify-between text-green-600">
              <span>First-Time Buyer Rebate:</span>
              <span className="font-medium">-{formatCurrency(taxBreakdown.firstTimeBuyerRebate)}</span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-200 flex justify-between font-semibold">
            <span>Total Land Transfer Tax:</span>
            <span>{formatCurrency(taxBreakdown.total)}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Recalculate
        </button>
        <button
          onClick={() => setStep(3)}
          className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Full Report
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
          Get Full Report
        </button>
      </div>
    </form>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900">Thank You!</h3>
      <p className="text-gray-600">
        We'll send you a detailed report of your land transfer tax calculation and additional information about the home buying process.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Land Transfer Tax Calculator</h1>
        <p className="text-gray-600">
          Calculate the land transfer tax for your property purchase in the Greater Toronto Area.
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