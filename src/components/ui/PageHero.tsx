'use client';

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { Lead } from '@/models/Lead'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
  location?: string
  intent?: string
}

interface FormData {
  intent: 'buyer' | 'seller'
  location: string
  email: string
  name: string
}

export default function PageHero({ 
  title, 
  subtitle,
  backgroundImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
  className,
  location = 'Toronto',
  intent = 'connect'
}: PageHeroProps) {
  const [formData, setFormData] = useState<FormData>({
    intent: 'buyer',
    location: '',
    email: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleIntentClick = (selectedIntent: 'buyer' | 'seller') => {
    setFormData(prev => ({ ...prev, intent: selectedIntent }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate form
    if (!formData.location || !formData.email || !formData.name) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const leadData: Partial<Lead> = {
        name: formData.name,
        email: formData.email,
        area: formData.location,
        type: formData.intent,
        createdAt: new Date(),
        status: 'new'
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900", className)}>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
        />
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Lead Capture Form */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            {submitted ? (
              <div className="text-center py-8">
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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => handleIntentClick('buyer')}
                    className={cn(
                      "px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200",
                      formData.intent === 'buyer'
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    Buy Property
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIntentClick('seller')}
                    className={cn(
                      "px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200",
                      formData.intent === 'seller'
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    Sell Property
                  </button>
                </div>
                
                {/* Modern Form */}
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Connecting...' : 'Connect with an Expert'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 