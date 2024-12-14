'use client';

import React from 'react';
import { Area } from '../models/Area';

interface LocalAreaFeaturesProps {
  area: Area;
}

export function LocalAreaFeatures({ area }: LocalAreaFeaturesProps) {
  if (!area.features || area.features.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {area.features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      
      {area.highlights && area.highlights.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Area Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {area.highlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="font-semibold mb-2">{highlight.label}</div>
                <div className="text-lg mb-2">{highlight.value}</div>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {area.amenities && area.amenities.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Local Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {area.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <span className="text-primary-600 mr-2">✓</span>
                {amenity}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {area.faqs && area.faqs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {area.faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 