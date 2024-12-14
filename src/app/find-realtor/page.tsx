import { Metadata } from 'next';
import AgentFinder from '@/components/tools/AgentFinder';

export const metadata: Metadata = {
  title: 'Find Your Perfect Real Estate Agent | Free Agent Matching',
  description: 'Get matched with top local real estate agents based on your specific needs. Free service, no obligation, instant matching.',
};

export default function FindRealtorPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Real Estate Agent</h1>
        <p className="text-xl text-gray-600">Get matched with a local expert based on your specific needs</p>
      </div>
      <AgentFinder />
    </main>
  );
} 