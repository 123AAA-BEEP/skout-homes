'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's the first step in buying a home?",
    answer: "The first step is getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer. You should also connect with a local real estate agent who can guide you through the entire process."
  },
  {
    question: "How do I determine the right price for my home?",
    answer: "The best way to determine your home's value is through a comparative market analysis (CMA) from a local real estate agent. This analysis looks at recent sales of similar homes in your area, current market conditions, and your home's unique features."
  },
  {
    question: "When is the best time to sell my home?",
    answer: "While you can sell your home any time, spring and early fall typically see the most buyer activity. However, the best time to sell depends on your local market conditions, personal circumstances, and property type. A local real estate agent can help you determine the optimal timing."
  },
  {
    question: "What factors affect property value the most?",
    answer: "Key factors include location (neighborhood, school district, proximity to amenities), property size and condition, recent renovations or upgrades, local market conditions, and economic factors. Some factors you can control through improvements, while others are market-dependent."
  },
  {
    question: "How long does it typically take to buy or sell a home?",
    answer: "The timeline varies, but typically, once an offer is accepted, it takes 30-60 days to close. The entire process, including searching for a home or preparing to sell, can take several months. Market conditions, financing, and negotiation complexity can all impact the timeline."
  },
  {
    question: "What should I look for during a home viewing?",
    answer: "Focus on structural elements (foundation, roof, walls), systems (electrical, plumbing, HVAC), signs of water damage or mold, natural light, room layout, storage space, and neighborhood characteristics. Consider bringing a checklist and taking photos (with permission) to help remember details."
  },
  {
    question: "How much do I need for a down payment?",
    answer: "Down payment requirements vary by loan type and lender. While 20% is traditional, many buyers use loans requiring as little as 3.5% (FHA) or 5% (conventional) down. However, a larger down payment typically means better loan terms and lower monthly payments."
  }
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Common Real Estate Questions</h2>
        <p className="text-gray-600 text-center mb-12">
          Get answers to frequently asked questions about buying, selling, and investing in real estate
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ; 