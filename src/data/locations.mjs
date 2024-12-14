// Helper function to create a basic location structure
function createLocation(name, slug) {
  return {
    name,
    slug,
    description: `${name} is a vibrant neighborhood in the Greater Toronto Area, offering a mix of residential properties and local amenities.`,
    imageUrl: `/images/areas/${slug}.jpg`,
    highlights: [
      {
        label: 'Community',
        value: 'Established',
        description: 'Strong community feel with excellent amenities'
      },
      {
        label: 'Location',
        value: 'Convenient',
        description: 'Well-connected to major transportation routes'
      }
    ],
    features: [
      {
        title: 'Lifestyle',
        description: 'A perfect blend of urban convenience and residential comfort.'
      },
      {
        title: 'Transportation',
        description: 'Easy access to public transit and major highways.'
      }
    ],
    amenities: [
      'Parks and Recreation',
      'Shopping Centers',
      'Public Transit',
      'Schools',
      'Restaurants'
    ],
    faqs: [
      {
        question: 'What makes this neighborhood special?',
        answer: 'This neighborhood offers a perfect balance of urban amenities and residential comfort, with excellent schools, parks, and shopping options.'
      },
      {
        question: 'How is the commute?',
        answer: 'The area is well-connected with easy access to public transit and major highways, making commuting convenient.'
      }
    ]
  };
}

// Define Toronto neighborhoods
const toronto = {
  'bay-street-corridor': createLocation('Bay Street Corridor', 'toronto-bay-street-corridor'),
  'dufferin-grove': createLocation('Dufferin Grove', 'toronto-dufferin-grove'),
  'kensington': createLocation('Kensington', 'toronto-kensington'),
  'chinatown': createLocation('Chinatown', 'toronto-chinatown'),
  'little-portugal': createLocation('Little Portugal', 'toronto-little-portugal'),
  'niagara': createLocation('Niagara', 'toronto-niagara'),
  'palmerston': createLocation('Palmerston', 'toronto-palmerston'),
  'little-italy': createLocation('Little Italy', 'toronto-little-italy'),
  'the-islands': createLocation('The Islands', 'toronto-the-islands'),
  'trinity-bellwoods': createLocation('Trinity Bellwoods', 'toronto-trinity-bellwoods'),
  'university': createLocation('University', 'toronto-university'),
  'waterfront-communities': createLocation('Waterfront Communities', 'toronto-waterfront-communities')
};

// Define Mississauga neighborhoods
const mississauga = {
  'port-credit': createLocation('Port Credit', 'mississauga-port-credit'),
  'streetsville': createLocation('Streetsville', 'mississauga-streetsville'),
  'erin-mills': createLocation('Erin Mills', 'mississauga-erin-mills'),
  'cooksville': createLocation('Cooksville', 'mississauga-cooksville'),
  'meadowvale': createLocation('Meadowvale', 'mississauga-meadowvale')
};

// Export locations data
export const locations = {
  toronto,
  mississauga
}; 