import Link from 'next/link';

const PopularSearches = () => {
  const categories = {
    toronto: {
      title: "Popular Toronto Areas",
      links: [
        { label: "High Park Real Estate", href: "/toronto/high-park/realtor" },
        { label: "Liberty Village Real Estate", href: "/toronto/liberty-village/realtor" },
        { label: "Bloor West Village Real Estate", href: "/toronto/bloor-west-village/realtor" }
      ]
    },
    services: {
      title: "Popular Services",
      links: [
        { label: "Top Realtors in Markland Wood", href: "/toronto/markland-wood/top-realtor" },
        { label: "Find a Real Estate Agent", href: "/toronto/financial-district/realtor" },
        { label: "Free Home Evaluation", href: "/tools/home-value-estimator" }
      ]
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Searches</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key}>
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearches; 