import Hero from '@/components/home/Hero';
import ValueProps from '@/components/home/ValueProps';
import LocationGrid from '@/components/home/LocationGrid';
import TrustIndicators from '@/components/home/TrustIndicators';
import ToolsSection from '@/components/home/ToolsSection';
import PopularSearches from '@/components/home/PopularSearches';
import FeaturedAreas from '@/components/home/FeaturedAreas';
import FloatingContact from '@/components/ui/FloatingContact';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <LocationGrid />
      <TrustIndicators />
      <ToolsSection />
      <PopularSearches />
      <FeaturedAreas />
      <FloatingContact />
    </>
  );
} 