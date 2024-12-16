'use client';

import React from 'react';
import { Area } from '@/models/Area';
import { LeadForm } from '@/components/ui/LeadForm';
import { FAQSection } from '@/components/FAQSection';
import { AgentSearchSection } from '@/components/AgentSearchSection';
import TrustIndicators from '@/components/home/TrustIndicators';

interface IntentTemplateProps {
  area: Area;
  intent: string;
  seoData: any;
}

export function IntentTemplate({ area, intent, seoData }: IntentTemplateProps) {
  switch (intent) {
    case 'buy':
      return (
        <div className="space-y-12">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold">
              Find Your Dream Home in {area.name}
            </h1>
            <p className="text-xl text-gray-600">
              Connect with experienced local agents who can help you find and purchase your ideal home.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Get Started with Your Home Search
            </h2>
            <LeadForm 
              location={area.name}
              intent="buy"
            />
          </div>

          <FAQSection 
            faqs={area.faqs || []}
            area={area.name}
            intent="buy"
          />

          <TrustIndicators />
        </div>
      );

    case 'sell':
      return (
        <div className="space-y-12">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold">
              Sell Your Home in {area.name}
            </h1>
            <p className="text-xl text-gray-600">
              Get connected with top local agents who can help you sell your home for the best price.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Get a Free Home Evaluation
            </h2>
            <LeadForm 
              location={area.name}
              intent="sell"
            />
          </div>

          <FAQSection 
            faqs={area.faqs || []}
            area={area.name}
            intent="sell"
          />

          <TrustIndicators />
        </div>
      );

    case 'invest':
      return (
        <div className="space-y-12">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold">
              Real Estate Investment in {area.name}
            </h1>
            <p className="text-xl text-gray-600">
              Connect with investment specialists who understand the {area.name} market.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Speak with an Investment Specialist
            </h2>
            <LeadForm 
              location={area.name}
              intent="invest"
            />
          </div>

          <FAQSection 
            faqs={area.faqs || []}
            area={area.name}
            intent="invest"
          />

          <TrustIndicators />
        </div>
      );

    case 'agents':
      return <AgentSearchSection area={area} seoData={seoData} />;

    default:
      return (
        <div className="space-y-12">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold">
              Real Estate Services in {area.name}
            </h1>
            <p className="text-xl text-gray-600">
              Connect with experienced local real estate professionals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Get Started Today
            </h2>
            <LeadForm 
              location={area.name}
              intent="general"
            />
          </div>

          <FAQSection 
            faqs={area.faqs || []}
            area={area.name}
          />

          <TrustIndicators />
        </div>
      );
  }
} 