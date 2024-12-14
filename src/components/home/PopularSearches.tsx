import Link from 'next/link';

const PopularSearches = () => {
  const categories = {
    toronto: {
      title: "Popular Toronto Areas",
      links: [
        { label: "Annex Real Estate Agents", href: "/toronto/annex/real-estate-agent" },
        { label: "Yorkville Realtors", href: "/toronto/yorkville/real-estate-agent" },
        { label: "Downtown Toronto Agents", href: "/toronto/downtown/real-estate-agent" }
      ]
    },
    services: {
      title: "Popular Services",
      links: [
        { label: "Toronto Home Evaluation", href: "/toronto/home-evaluation" },
        { label: "Mississauga Top Realtors", href: "/mississauga/top-realtor" },
        { label: "First-Time Buyer Agents", href: "/first-time-buyer-agent" }
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