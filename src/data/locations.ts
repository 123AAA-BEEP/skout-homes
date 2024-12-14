import type { Highlight, Feature } from '@/models/Area';

interface Location {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights: Highlight[];
  features: Feature[];
  amenities: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface CityAreas {
  [key: string]: {
    [key: string]: Location;
  };
}

// Helper function to create a basic location structure
function createLocation(name: string, slug: string): Location {
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
        title: 'Amenities',
        description: 'Easy access to shopping, schools, and recreation facilities.'
      }
    ],
    amenities: [
      'Local Shopping',
      'Parks and Recreation',
      'Public Transit',
      'Schools'
    ],
    faqs: [
      {
        question: `What makes ${name} special?`,
        answer: `${name} offers a great balance of urban amenities and residential comfort, making it ideal for families and professionals alike.`
      },
      {
        question: 'Is it good for families?',
        answer: 'Yes, with excellent schools, parks, and a strong community spirit.'
      }
    ]
  };
}

// Initialize the locations object
export const locations: CityAreas = {
  toronto: {},
  mississauga: {},
  vaughan: {},
  oakville: {},
  burlington: {},
  brampton: {},
  milton: {},
  haltonhills: {},
  markham: {}
};

// Toronto Downtown & Central
[
  'Bay Street Corridor', 'Dufferin Grove', 'Kensington', 'Chinatown', 
  'Little Portugal', 'Niagara', 'Palmerston', 'Little Italy', 
  'The Islands', 'Trinity-Bellwoods', 'University', 'Waterfront Communities',
  'Annex', 'Casa Loma'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.toronto[slug] = createLocation(name, slug);
});

// Toronto North
[
  'Wychwood', 'Yonge and St. Clair', 'Forest Hill', 'Humewood-Cedarvale',
  'Oakwood Village', 'Yonge and Eglinton', 'Bedford Park-Nortown',
  'Englemount-Lawrence', 'Forest Hill North', 'Lawrence Park North',
  'Lawrence Park South', 'Bathurst Manor', 'Clanton Park',
  'Lansing-Westgate', 'Newtonbrook West', 'Westminster-Branson',
  'Willowdale West'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.toronto[slug] = createLocation(name, slug);
});

// East York & Don Valley
[
  'Rosedale', 'Moore Park', 'Flemingdon Park', 'Leaside',
  'Thorncliffe Park', 'Bridle Path', 'Sunnybrook', 'York Mills',
  'St. Andrew', 'Windfields', 'Banbury', 'Don Mills', 'Parkwoods',
  'Donalda Victoria Village', 'Newtonbrook East', 'Willowdale East',
  'Bayview Village', 'Bayview Woods', 'Don Valley Village',
  'Henry Farm', 'Hillcrest Village', 'Pleasant View'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.toronto[slug] = createLocation(name, slug);
});

// West End Toronto
[
  'Corso Italia', 'Davenport', 'Dovercourt', 'Wallace Emerson',
  'Junction', 'High Park North', 'High Park', 'Swansea',
  'Junction Area', 'Liberty Village', 'Little Italy',
  'Roncesvalles', 'Runnymede', 'South Parkdale',
  'Weston', 'Bloor West Village', 'Pellam Park'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.toronto[slug] = createLocation(name, slug);
});

// Etobicoke
[
  'Alderwood', 'Edenbridge', 'Elms', 'Eringate', 'Etobicoke West Mall',
  'Humber Heights', 'Westmount', 'West Deane', 'Centennial', 'Old Rexdale',
  'Humber Valley', 'Islington City Centre West', 'The Westway',
  'Kingsview Village', 'Kingsway South', 'Long Branch', 'Markland Wood',
  'Mimico', 'Mount Olive', 'New Toronto', 'Princess-Rosethorn', 'Rexdale',
  'Stonegate', 'Thistletown', 'West Humber', 'Willowridge', 'Richview',
  'Martingrove', 'Clairville', 'Beaumonde Heights', 'Queensway',
  'Kipling and Rexdale', 'Jamestown', 'Silverstone'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.toronto[slug] = createLocation(name, slug);
});

// Mississauga
[
  'Airport Corporate', 'Applewood', 'Central Erin Mills', 'Churchill Meadows',
  'City Centre', 'Clarkson', 'Cooksville', 'Creditview', 'Dixie',
  'East Credit', 'Erin Mills', 'Erindale', 'Fairview', 'Gateway',
  'Hurontario', 'Lakeview', 'Lisgar', 'Lorne Park', 'Malton',
  'Mavis-Erindale', 'Meadowvale', 'Meadowvale Business Park',
  'Meadowvale Village', 'Mineola', 'Mississauga Valleys', 'Northeast',
  'Port Credit', 'Rathwood', 'Sheridan', 'Sheridan Park', 'Southdown',
  'Streetsville', 'Western Business Park'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.mississauga[slug] = createLocation(name, slug);
});

// Vaughan
[
  'Beverley Glen', 'Brownridge', 'Concord', 'Crestwood-Springfarm-Yorkhill',
  'East Woodbridge', 'Elder Mills', 'Glen Shields', 'Islington Woods',
  'Kleinburg', 'Lakeview Estates', 'Maple', 'Patterson',
  'Pine Valley Business Park', 'Rural Vaughan', 'Sonoma Heights',
  'Steeles West Industrial', 'Uplands', 'Vaughan Corporate Centre',
  'Vaughan Grove', 'Vellore Village', 'West Woodbridge',
  'West Woodbridge Industrial Area'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.vaughan[slug] = createLocation(name, slug);
});

// Oakville
[
  'Bronte East', 'Bronte West', 'Clearview', 'College Park', 'Eastlake',
  'Glen Abbey', 'Industrial', 'Iroquois Ridge North', 'Iroquois Ridge South',
  'Old Oakville', 'Palermo West', 'River Oaks', 'Rural Oakville',
  'Uptown Core', 'West Oak Trails', 'Winston Park'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.oakville[slug] = createLocation(name, slug);
});

// Burlington
[
  'Alton', 'Appleby', 'Bayview', 'Brant', 'Brant Hills', 'Bronte Creek',
  'Freeman', 'Grindstone', 'Headon', 'Industrial Burlington', 'LaSalle',
  'Mountainside', 'Orchard', 'Palmer', 'Rose', 'Roseland',
  'Rural Burlington', 'Shoreacres', 'Tansley', 'Tyandaga', 'Uptown'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.burlington[slug] = createLocation(name, slug);
});

// Brampton
[
  'Airport Road', 'Avondale', 'Bram East', 'Bram West',
  'Bramalea North Industrial', 'Bramalea Road South Gateway',
  'Bramalea South', 'Brampton Corridor', 'Brampton East',
  'Brampton East Industrial', 'Brampton North', 'Brampton South',
  'Brampton West', 'Brampton West Industrial', 'Central Park',
  'Clairville Conservation', 'Credit Valley', 'Downtown Brampton',
  'Fletcher\'s Creek South', 'Fletcher\'s Creek Village',
  'Fletcher\'s Meadow', 'Fletcher\'s West', 'Gore Industrial North',
  'Gore Industrial South', 'Goreway Drive Corridor', 'Heart Lake East',
  'Heart Lake West', 'Hearth Lake', 'Highway 427', 'Huttonville',
  'Madoc', 'Northgate', 'Northwest Brampton', 'Northwest Sandalwood Parkway',
  'Northwood Park', 'Queen Street Corridor', 'Sandringham-Wellington',
  'Sandringham-Wellington North', 'Snelgrove', 'Southgate',
  'Steeles Industrial', 'Toronto Gore Rural Estate',
  'Vales of Castlemore', 'Vales of Castlemore North', 'Westgate'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.brampton[slug] = createLocation(name, slug);
});

// Milton
[
  '401 Business Park', 'Beaty', 'Bowes', 'Bronte Meadows',
  'Brookville', 'Campbellville', 'Clarke', 'Coates', 'Cobban',
  'Dempsey', 'Derry Green Business Park', 'Dorset Park',
  'Esquesing', 'Ford', 'Harrison', 'Milton Heights', 'Moffat',
  'Mountain View', 'Nassagaweya', 'Nelson', 'Old Milton',
  'Scott', 'Timberlea', 'Trafalgar', 'Walker', 'Willmont'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.milton[slug] = createLocation(name, slug);
});

// Halton Hills
[
  'Acton', 'Georgetown', 'Glen Williams', 'Limehouse',
  'Rural Halton Hills', 'Stewarttown'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.haltonhills[slug] = createLocation(name, slug);
});

// Markham
[
  'Aileen-Willowbrook', 'Angus Glen', 'Bayview Fairway- Bayview Country Club Estates',
  'Bayview Glen', 'Berczy', 'Box Grove', 'Bullock', 'Buttonville',
  'Cachet', 'Cathedraltown', 'Cedar Grove', 'Cedarwood',
  'Commerce Valley', 'Cornell', 'Devil\'s Elbow', 'German Mills',
  'Grandview', 'Greensborough', 'Langstaff South', 'Legacy',
  'Markham Village', 'Markville', 'Middlefield', 'Milliken Mills East',
  'Milliken Mills West', 'Old Markham Village', 'Raymerville',
  'Rouge Fairways', 'Rouge River Estates', 'Royal Orchard',
  'Rural Markham', 'Sherwood-Amberglen', 'Thornhill', 'Thornlea',
  'Unionville', 'Victoria Manor-Jennings Gate', 'Victoria Square',
  'Village Green-South Unionville', 'Vinegar Hill', 'Wismer'
].forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  locations.markham[slug] = createLocation(name, slug);
});

export type { Location, CityAreas }; 