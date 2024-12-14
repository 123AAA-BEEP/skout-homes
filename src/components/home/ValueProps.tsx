import React from 'react';
import Container from '@/components/ui/Container';

const ValueProps = () => {
  const features = [
    {
      title: "Free Expert Consultation",
      description: "Connect with top local agents at no cost",
      icon: "💬"
    },
    {
      title: "Local Market Knowledge",
      description: "Get insights from neighbourhood specialists",
      icon: "📍"
    },
    {
      title: "Quick Response",
      description: "Hear back from an agent within minutes",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps; 