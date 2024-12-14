import HomeValuation from '@/components/tools/HomeValuation';
import { Metadata } from '@/types';

export const metadata: Metadata = {
  title: 'Free Home Value Estimator | GTA Property Valuation',
  description: 'Get a free, professional estimate of your home\'s value. Detailed analysis based on current market data and property features.'
};

export default function HomeValueEstimatorPage() {
  return <HomeValuation />;
} 