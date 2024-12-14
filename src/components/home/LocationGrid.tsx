import Image from 'next/image';
import Link from 'next/link';

const LocationGrid = () => {
  const cities = [
    {
      name: "Toronto",
      description: "From downtown condos to family homes",
      image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800",
      link: "/toronto"
    },
    {
      name: "Mississauga",
      description: "Modern suburban living with great schools",
      image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800",
      link: "/mississauga"
    },
    {
      name: "Vaughan",
      description: "Upscale communities and new developments",
      image: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      link: "/vaughan"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Popular Areas
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore detailed neighborhood guides, market trends, and local insights for the Greater Toronto Area's most sought-after communities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link 
              href={city.link} 
              key={city.name}
              className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]"
            >
              <Image
                src={city.image}
                alt={`${city.name} Real Estate`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                <p className="text-sm md:text-base opacity-90">{city.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationGrid; 