'use client';

import React from 'react';

export function LocalTrustIndicators() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
          <h3 className="font-semibold mb-2">Years of Experience</h3>
          <p className="text-gray-600">Trusted by thousands of clients in the Greater Toronto Area</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
          <h3 className="font-semibold mb-2">Client Satisfaction</h3>
          <p className="text-gray-600">Based on over 1,000 verified client reviews</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">$1B+</div>
          <h3 className="font-semibold mb-2">In Transactions</h3>
          <p className="text-gray-600">Successfully closed deals in the past 5 years</p>
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-8 mt-8">
        <img src="/images/awards/top-agent.png" alt="Top Agent Award" className="h-16" />
        <img src="/images/awards/re-max.png" alt="RE/MAX Award" className="h-16" />
        <img src="/images/awards/diamond-club.png" alt="Diamond Club" className="h-16" />
      </div>
    </section>
  );
} 