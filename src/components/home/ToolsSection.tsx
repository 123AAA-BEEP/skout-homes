import Link from 'next/link';

const ToolsSection = () => {
  const tools = [
    {
      title: "Land Transfer Tax Calculator",
      description: "Calculate your Ontario and Toronto land transfer taxes",
      icon: "🧮",
      link: "/tools/land-transfer-tax-calculator",
      features: [
        "Ontario tax calculation",
        "Toronto municipal tax calculation",
        "First-time buyer rebate",
        "Instant results"
      ]
    },
    {
      title: "Free Home Valuation",
      description: "Get a detailed estimate of your home's current value",
      icon: "🏠",
      link: "/tools/home-value-estimator",
      features: [
        "Step-by-step process",
        "Detailed analysis",
        "Professional evaluation",
        "Quick response"
      ]
    },
    {
      title: "Find Your Perfect Agent",
      description: "Get matched with a top local realtor in minutes",
      icon: "🤝",
      link: "/find-realtor",
      features: [
        "Free matching service",
        "Personalized recommendations",
        "Instant response",
        "No obligation"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Free Real Estate Tools</h2>
          <p className="text-xl text-gray-600">Essential calculators and tools for your real estate decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link 
              href={tool.link}
              key={tool.title}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection; 