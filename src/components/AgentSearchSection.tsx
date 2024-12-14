'use client';

import React from 'react';
import type { Area } from '@/models/Area';
import { LeadForm } from '@/components/ui/LeadForm';

interface AgentSearchSectionProps {
  area: Area;
  specialtyType?: string;
  seoData: any;
}

export function AgentSearchSection({ area, specialtyType, seoData }: AgentSearchSectionProps) {
  const agentData = area.seo.intents.agentSearch;
  
  return (
    <div className="space-y-8">
      {/* Agent Search Header */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold">
          {seoData.h1 || `Find a Real Estate Agent in ${area.name}`}
        </h2>
        <p>{seoData.description}</p>
      </div>

      {/* Agent Specialties */}
      {specialtyType && agentData.specialties?.[specialtyType] && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {agentData.specialties[specialtyType].type}
          </h3>
          <p className="text-gray-600 mb-6">
            {agentData.specialties[specialtyType].description}
          </p>
          <LeadForm 
            location={area.name}
            intent="agents"
            propertyType={specialtyType}
          />
        </div>
      )}

      {/* Agent Types Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(agentData.transactionType || {}).map(([key, type]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{type.title}</h3>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <a 
              href={`${area.seo.urlPatterns.agentSearch}/${type.urlSlug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>

      {/* Languages Section */}
      {agentData.languages && Object.keys(agentData.languages).length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Multilingual Agents</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(agentData.languages).map(([key, language]) => (
              <a
                key={key}
                href={`${area.seo.urlPatterns.agentSearch}/${language.urlSlug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold">{language.type}</h4>
                <p className="text-sm text-gray-600">{language.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Experience Levels */}
      {agentData.experience && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(agentData.experience).map(([key, exp]) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Lead Form */}
      <div className="bg-primary-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Connect with an Agent Today
        </h3>
        <LeadForm 
          location={area.name}
          intent="agents"
        />
      </div>
    </div>
  );
} 