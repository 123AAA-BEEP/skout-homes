'use client';

import { cn } from '@/lib/utils';

interface StatItemProps {
  value: string;
  label: string;
  description: string;
}

function StatItem({ value, label, description }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
        {value}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {label}
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}

interface AgentStatsProps {
  className?: string;
}

export default function AgentStats({ className }: AgentStatsProps) {
  return (
    <div className={cn("py-12 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <StatItem
            value="24/7"
            label="Dedicated Support"
            description="Full-service real estate support available around the clock to help you achieve your goals"
          />
          <StatItem
            value="100%"
            label="Client Focus"
            description="Personalized attention and tailored strategies to meet your unique real estate needs"
          />
          <StatItem
            value="Local"
            label="Market Expertise"
            description="Deep understanding of the local market trends, neighborhoods, and property values"
          />
        </div>
      </div>
    </div>
  );
} 