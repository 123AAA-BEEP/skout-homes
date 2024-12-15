import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Area } from '@/models/Area';
import { Intent, IntentCategory } from '@/models/Intent';
import { getAreaBySlug } from '@/lib/db/areas';
import { getIntentByKeyword } from '@/lib/db/intents';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LeadForm } from '@/components/ui/LeadForm';
import { LocalAreaFeatures } from '@/components/LocalAreaFeatures';
import { LocalTrustIndicators } from '@/components/LocalTrustIndicators';
import { FAQSection } from '@/components/FAQSection';
import PageHero from '@/components/ui/PageHero'
import FAQPageSchema from '@/components/SEO/FAQPageSchema';

interface IntentPageProps {
  params: {
    city: string;
    neighbourhood: string;
    intent: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: IntentPageProps): Promise<Metadata> {
  const { city, neighbourhood, intent } = params;
  const slug = `${city}-${neighbourhood}`;
  
  try {
    // Get both area and intent data
    const [area, intentData] = await Promise.all([
      getAreaBySlug(slug),
      getIntentByKeyword(intent)
    ]);

    if (!area || !area.isPublished || !intentData || !intentData.isActive) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      };
    }

    // Replace placeholders in SEO content
    const seoTitle = intentData.seoTitle.replace(/{area}/g, area.name);
    const seoDescription = intentData.seoDescription.replace(/{area}/g, area.name);
    const seoKeywords = intentData.seoKeywords.map(keyword => 
      keyword.replace(/{area}/g, area.name)
    );

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords.join(', '),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.'
    };
  }
}

function generateIntentFAQs(intent: string, cityName: string, neighbourhoodName: string, area: Area) {
  const cityDisplayName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const areaDisplayName = neighbourhoodName.charAt(0).toUpperCase() + neighbourhoodName.slice(1);
  
  // Get area features for more specific FAQs
  const features = area.features || [];
  const highlights = area.highlights || [];
  const propertyTypes = area.propertyTypes || [];
  
  // Helper function to create feature-based content
  const getFeatureBasedContent = (count = 3) => {
    const selectedFeatures = features.slice(0, count);
    return selectedFeatures.length > 0 
      ? selectedFeatures.join(', ')
      : 'various amenities and features';
  };

  // Helper function to create highlight-based content
  const getHighlightContent = () => {
    if (highlights.length === 0) return '';
    const highlightValues = highlights.map(h => h.value);
    return highlightValues.length > 0 
      ? ` Key highlights include ${highlightValues.slice(0, 3).join(', ')}.`
      : '';
  };

  // Helper function to get property type content
  const getPropertyTypeContent = () => {
    return propertyTypes.length > 0
      ? propertyTypes.join(', ')
      : 'various property types';
  };

  const intentKeywords = {
    'buy-house': 'buying',
    'sell-house': 'selling',
    'real-estate-agent': 'realtor',
    'free-home-evaluation': 'evaluation',
    'market-analysis': 'market'
  };

  const intentType = intentKeywords[intent] || 'buying';

  // Enhanced common FAQs with more specific data
  const commonFAQs = [
    {
      question: `What makes ${areaDisplayName} a desirable place to live?`,
      answer: `${areaDisplayName} is highly sought-after for its ${getFeatureBasedContent()}.${getHighlightContent()} This combination makes it an attractive choice for both families and professionals looking for a great place to call home.`
    },
    {
      question: `What amenities are available in ${areaDisplayName}?`,
      answer: `${areaDisplayName} offers residents access to ${getFeatureBasedContent(4)}. These amenities contribute to the area's high quality of life and continued popularity.`
    }
  ];

  // Enhanced intent-specific FAQs with more detailed content
  const intentSpecificFAQs = {
    buying: [
      {
        question: `What types of homes can I find in ${areaDisplayName}?`,
        answer: `${areaDisplayName} offers ${getPropertyTypeContent()}. Each option provides unique advantages, with prices varying based on size, location, and features. The area is particularly known for its ${getFeatureBasedContent(2)}.`
      },
      {
        question: `Why should I consider buying in ${areaDisplayName}?`,
        answer: `${areaDisplayName} stands out for its ${getFeatureBasedContent(3)}.${getHighlightContent()} These features, combined with strong property values and community appeal, make it an excellent choice for homebuyers.`
      },
      {
        question: `What should I know about the ${areaDisplayName} real estate market?`,
        answer: `The ${areaDisplayName} market is known for its ${propertyTypes[0] || 'diverse'} properties and ${getFeatureBasedContent(2)}. Working with our local agents gives you access to market insights and new listings as they become available.`
      }
    ],
    selling: [
      {
        question: `What makes ${areaDisplayName} attractive to buyers?`,
        answer: `Buyers are drawn to ${areaDisplayName} for its ${getFeatureBasedContent(3)}.${getHighlightContent()} These desirable features help properties maintain their value and attract qualified buyers.`
      },
      {
        question: `How can I maximize my home's value in ${areaDisplayName}?`,
        answer: `In ${areaDisplayName}, buyers particularly value properties that showcase the area's ${getFeatureBasedContent(2)}. Our agents can help you highlight these features and suggest strategic improvements to maximize your home's appeal.`
      },
      {
        question: `What's the best approach to selling in ${areaDisplayName}?`,
        answer: `Success in ${areaDisplayName}'s market comes from understanding and marketing its unique advantages: ${getFeatureBasedContent(3)}. Our agents use this local knowledge to create effective selling strategies.`
      }
    ],
    realtor: [
      {
        question: `What makes a great real estate agent in ${areaDisplayName}?`,
        answer: `The best ${areaDisplayName} agents combine deep knowledge of local features like ${getFeatureBasedContent(3)} with strong negotiation skills and marketing expertise. Our agents are selected for their proven track record and area expertise.`
      },
      {
        question: `How do your agents serve the ${areaDisplayName} community?`,
        answer: `Our agents specialize in ${areaDisplayName}'s ${getPropertyTypeContent()} and understand how features like ${getFeatureBasedContent(2)} affect property values. They provide comprehensive service, from market analysis to closing support.`
      },
      {
        question: `What can I expect from your ${areaDisplayName} agents?`,
        answer: `Our ${areaDisplayName} agents offer expert guidance on the local market, including insights about ${getFeatureBasedContent(3)}. They provide personalized service tailored to your specific real estate goals.`
      }
    ],
    evaluation: [
      {
        question: `What factors influence home values in ${areaDisplayName}?`,
        answer: `In ${areaDisplayName}, property values are influenced by ${getFeatureBasedContent(3)}.${getHighlightContent()} Our evaluation process considers these local factors along with current market conditions.`
      },
      {
        question: `How do you evaluate homes in ${areaDisplayName}?`,
        answer: `Our ${areaDisplayName} home evaluations consider local features like ${getFeatureBasedContent(3)}, recent comparable sales, and property-specific characteristics to provide accurate, market-based valuations.`
      },
      {
        question: `Why get a professional evaluation in ${areaDisplayName}?`,
        answer: `A professional evaluation helps you understand how your property compares in ${areaDisplayName}'s market, considering factors like ${getFeatureBasedContent(2)} that impact local property values.`
      }
    ],
    market: [
      {
        question: `What drives the ${areaDisplayName} real estate market?`,
        answer: `${areaDisplayName}'s market is driven by its ${getFeatureBasedContent(3)}.${getHighlightContent()} These factors contribute to the area's sustained appeal and market performance.`
      },
      {
        question: `How does ${areaDisplayName} compare to nearby areas?`,
        answer: `${areaDisplayName} distinguishes itself through ${getFeatureBasedContent(2)}. Our market analysis provides detailed comparisons with surrounding areas to help inform your real estate decisions.`
      },
      {
        question: `What trends are shaping ${areaDisplayName}'s market?`,
        answer: `Current trends in ${areaDisplayName} reflect the value of its ${getFeatureBasedContent(3)}. Our market analysis helps you understand how these trends affect your real estate opportunities.`
      }
    ]
  };

  return [...commonFAQs, ...intentSpecificFAQs[intentType]];
}

export default async function IntentPage({ params }: IntentPageProps) {
  const { city, neighbourhood, intent } = params;
  const slug = `${city}-${neighbourhood}`;
  
  try {
    console.log('Fetching data for:', { city, neighbourhood, intent, slug });
    
    // Get both area and intent data
    const [area, intentData] = await Promise.all([
      getAreaBySlug(slug),
      getIntentByKeyword(intent)
    ]);

    console.log('Fetched data:', { 
      areaFound: !!area, 
      areaPublished: area?.isPublished,
      intentFound: !!intentData,
      intentActive: intentData?.isActive 
    });

    // Validate all required data
    if (!area || !area.isPublished || !intentData || !intentData.isActive) {
      console.log('Data validation failed, returning 404');
      notFound();
    }

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: city.charAt(0).toUpperCase() + city.slice(1), href: `/${city}` },
      { label: area.name, href: `/${city}/${neighbourhood}` },
      { label: intentData.displayName, href: `/${city}/${neighbourhood}/${intent}` },
    ];

    // Generate page title
    const title = intentData.displayName
      ? `${intentData.displayName} in ${area.name}`
      : `Find Real Estate Services in ${area.name}`;

    // Generate FAQs using area data
    const intentFAQs = generateIntentFAQs(params.intent, params.city, params.neighbourhood, area);

    return (
      <>
        <FAQPageSchema faqs={intentFAQs} />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="mt-8">
              <PageHero 
                title={getIntentTitle(intent, neighbourhood)}
                subtitle={getIntentSubtitle(intent, neighbourhood, city)}
              />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {intentData.description.replace(/{area}/g, area.name)}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <LocalAreaFeatures area={area} />
                  <LocalTrustIndicators />
                  {area.faqs && area.faqs.length > 0 && (
                    <FAQSection faqs={area.faqs} className="mt-8" />
                  )}
                </div>
                
                <div className="lg:col-span-1">
                  <div className="sticky top-4">
                    <LeadForm location={area.name} intent={intent} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error rendering intent page:', error);
    throw error; // This will trigger the error boundary
  }
} 

// Helper functions to generate appropriate titles based on intent
function getIntentTitle(intent: string, neighbourhood: string) {
  // Customize based on your intent types
  return `${intent.split('-').join(' ').toUpperCase()} in ${neighbourhood}`
}

function getIntentSubtitle(intent: string, neighbourhood: string, city: string) {
  // Customize based on your intent types
  return `Connect with experienced agents specializing in ${neighbourhood}, ${city}`
} 