import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AreaCard {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}

const featuredAreas: AreaCard[] = [
  {
    name: "Downtown",
    description: "Luxury condos with stunning city views",
    imageUrl: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800", // Modern condo interior
    slug: "downtown"
  },
  {
    name: "West End",
    description: "Character homes with modern renovations",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", // Modern kitchen interior
    slug: "west-end"
  },
  {
    name: "Riverside",
    description: "Contemporary living near the water",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", // Modern house exterior
    slug: "riverside"
  },
  {
    name: "North York",
    description: "Spacious family homes with great schools",
    imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800", // Modern living room
    slug: "north-york"
  },
  {
    name: "East End",
    description: "Charming homes in established neighborhoods",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800", // Cozy dining room
    slug: "east-end"
  },
  {
    name: "Midtown",
    description: "Urban living with a neighborhood feel",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800", // Modern bedroom
    slug: "midtown"
  }
];

const FeaturedAreas = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Areas</h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Explore Toronto's diverse neighborhoods, each offering unique living experiences from modern condos to historic homes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredAreas.map((area) => (
          <Link href={`/areas/${area.slug}`} key={area.slug} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48 w-full">
                <Image
                  src={area.imageUrl}
                  alt={area.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                <p className="text-gray-600 mt-2">{area.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAreas; 