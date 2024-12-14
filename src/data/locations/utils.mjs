// Helper function to create a basic location structure
export function createLocation(name, slug) {
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