import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const tools = [
  {
    title: 'Land Transfer Tax Calculator',
    description: 'Calculate your land transfer tax for Ontario and Toronto properties',
    icon: '🧮',
    link: '/tools/land-transfer-tax-calculator'
  },
  {
    title: 'Free Home Valuation',
    description: 'Get an estimate of your home\'s current market value',
    icon: '🏠',
    link: '/tools/home-value-estimator'
  },
  {
    title: 'Find an Agent',
    description: 'Connect with a top local real estate agent',
    icon: '👤',
    link: '/find-realtor'
  }
];

export default function Tools() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">
          Useful Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div key={tool.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <Button variant="outline" size="sm" onClick={() => window.location.href = tool.link}>
                Try Now
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
} 