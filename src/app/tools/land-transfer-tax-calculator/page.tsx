import { Metadata } from 'next';
import TaxCalculator from '@/components/tools/TaxCalculator';

export const metadata: Metadata = {
  title: 'Land Transfer Tax Calculator | Ontario & Toronto',
  description: 'Calculate your land transfer tax for Ontario and Toronto properties. Free, instant results with first-time buyer rebate calculations.',
};

export default function TaxCalculatorPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Land Transfer Tax Calculator</h1>
        <p className="text-xl text-gray-600">Calculate your Ontario and Toronto land transfer taxes</p>
      </div>
      <TaxCalculator />
    </main>
  );
} 