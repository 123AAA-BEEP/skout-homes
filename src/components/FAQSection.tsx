'use client';

import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQSection({ faqs, className = '' }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">
                {faq.question}
              </h3>
              <div className="prose max-w-none text-gray-600">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 