import { Neighbourhood } from './types'

export const neighbourhoods: Neighbourhood[] = [
  // Toronto Neighborhoods
  {
    name: "The Annex",
    slug: "the-annex",
    city: "toronto",
    description: "Historic neighborhood known for its Victorian homes, proximity to UofT, and vibrant cultural scene.",
    features: {
      parks: ["Christie Pits Park", "Taddle Creek Park", "Jean Sibelius Square"],
      transit: ["Spadina Station", "St. George Station", "Bathurst Station"],
      schools: ["University of Toronto", "Royal St. George's College", "Huron Street Junior Public School"],
      shopping: ["Bloor Street Shopping", "Markham Street Village", "Madison Avenue Fashion District"]
    },
    stats: {
      averagePrice: 1850000,
      medianPrice: 1650000,
      totalListings: 45,
      daysOnMarket: 18
    }
  },
  {
    name: "Yorkville",
    slug: "yorkville",
    city: "toronto",
    description: "Luxury shopping district with high-end condos and boutique retail experiences.",
    features: {
      parks: ["Jesse Ketchum Park", "Town Hall Square", "Yorkville Park"],
      transit: ["Bay Station", "Yonge Station", "Museum Station"],
      schools: ["Jesse Ketchum Junior and Senior Public School", "De La Salle College"],
      shopping: ["Yorkville Village", "Holt Renfrew", "Mink Mile"]
    },
    stats: {
      averagePrice: 2250000,
      medianPrice: 1950000,
      totalListings: 32,
      daysOnMarket: 22
    }
  },
  {
    name: "Leslieville",
    slug: "leslieville",
    city: "toronto",
    description: "Trendy east-end neighborhood with a mix of Victorian homes, cafes, and boutiques.",
    features: {
      parks: ["Greenwood Park", "Leslie Grove Park", "Jonathan Ashbridge Park"],
      transit: ["Queen Streetcar", "Leslie Street", "Eastern Avenue"],
      schools: ["Leslieville Junior Public School", "Duke of Connaught Public School"],
      shopping: ["Queen Street East Shopping", "Gerrard India Bazaar"]
    },
    stats: {
      averagePrice: 1450000,
      medianPrice: 1350000,
      totalListings: 55,
      daysOnMarket: 15
    }
  },
  {
    name: "Liberty Village",
    slug: "liberty-village",
    city: "toronto",
    description: "Modern urban neighborhood with converted industrial buildings and new condos.",
    features: {
      parks: ["Liberty Village Park", "Bill Johnston Park"],
      transit: ["Exhibition GO Station", "King Streetcar", "Liberty Village Express Bus"],
      schools: ["Liberty Village Early Learning Centre"],
      shopping: ["Liberty Village Market & Cafe", "Metro Supermarket", "West Elm"]
    },
    stats: {
      averagePrice: 850000,
      medianPrice: 750000,
      totalListings: 120,
      daysOnMarket: 12
    }
  },
  {
    name: "Rosedale",
    slug: "rosedale",
    city: "toronto",
    description: "Prestigious neighborhood with historic mansions and tree-lined streets.",
    features: {
      parks: ["Rosedale Park", "Craigleigh Gardens", "Chorley Park"],
      transit: ["Rosedale Station", "Castle Frank Station"],
      schools: ["Branksome Hall", "Rosedale Junior Public School"],
      shopping: ["Rosedale Main Street", "Summerhill Market"]
    },
    stats: {
      averagePrice: 3250000,
      medianPrice: 2950000,
      totalListings: 25,
      daysOnMarket: 28
    }
  },
  {
    name: "High Park",
    slug: "high-park",
    city: "toronto",
    description: "Family-friendly area surrounding Toronto's largest public park.",
    features: {
      parks: ["High Park", "Lithuania Park", "Rennie Park"],
      transit: ["High Park Station", "Keele Station", "Dundas West Station"],
      schools: ["High Park Alternative School", "Humberside Collegiate Institute"],
      shopping: ["Bloor West Village", "Junction Gardens"]
    },
    stats: {
      averagePrice: 1750000,
      medianPrice: 1550000,
      totalListings: 42,
      daysOnMarket: 16
    }
  },
  {
    name: "Distillery District",
    slug: "distillery-district",
    city: "toronto",
    description: "Historic district with Victorian industrial architecture, arts, and culture.",
    features: {
      parks: ["Parliament Square Park", "Corktown Common"],
      transit: ["King Streetcar", "Cherry Street", "Distillery Loop"],
      schools: ["Market Lane Junior and Senior Public School"],
      shopping: ["Distillery Shops", "St. Lawrence Market"]
    },
    stats: {
      averagePrice: 950000,
      medianPrice: 850000,
      totalListings: 65,
      daysOnMarket: 14
    }
  },
  {
    name: "Forest Hill",
    slug: "forest-hill",
    city: "toronto",
    description: "Upscale neighborhood known for luxury homes and top private schools.",
    features: {
      parks: ["Sir Winston Churchill Park", "Forest Hill Road Park"],
      transit: ["St. Clair West Station", "Forest Hill Station"],
      schools: ["Upper Canada College", "Bishop Strachan School", "Forest Hill Collegiate Institute"],
      shopping: ["Forest Hill Village", "St. Clair West Shopping"]
    },
    stats: {
      averagePrice: 3750000,
      medianPrice: 3250000,
      totalListings: 28,
      daysOnMarket: 32
    }
  },
  {
    name: "Beaches",
    slug: "beaches",
    city: "toronto",
    description: "Lakeside community with a laid-back vibe and sandy beaches.",
    features: {
      parks: ["Woodbine Beach", "Kew Gardens", "Ashbridges Bay Park"],
      transit: ["Queen Streetcar", "Main Street Station"],
      schools: ["Beaches Alternative Junior School", "Malvern Collegiate Institute"],
      shopping: ["Queen Street East Shopping", "Beach Village BIA"]
    },
    stats: {
      averagePrice: 1650000,
      medianPrice: 1450000,
      totalListings: 48,
      daysOnMarket: 19
    }
  },
  {
    name: "Cabbagetown",
    slug: "cabbagetown",
    city: "toronto",
    description: "Historic district with the largest collection of Victorian homes in North America.",
    features: {
      parks: ["Riverdale Park", "Wellesley Park", "Riverdale Farm"],
      transit: ["Castle Frank Station", "Sherbourne Station"],
      schools: ["Rose Avenue Junior Public School", "Lord Dufferin Junior and Senior Public School"],
      shopping: ["Parliament Street Shopping", "Carlton Street Shops"]
    },
    stats: {
      averagePrice: 1550000,
      medianPrice: 1350000,
      totalListings: 38,
      daysOnMarket: 21
    }
  },
  // Richmond Hill Neighborhoods
  {
    name: "Bayview Hill",
    slug: "bayview-hill",
    city: "richmond-hill",
    description: "Prestigious neighborhood with luxury homes and excellent schools.",
    features: {
      parks: ["Bayview Hill Community Park", "Russell Farm Park", "Hunter's Point Wildlife Park"],
      transit: ["Richmond Hill GO Station", "YRT Bus Routes"],
      schools: ["Bayview Secondary School", "St. Joseph Catholic Elementary School"],
      shopping: ["Times Square Shopping Mall", "Bayview Glen Shopping Centre"]
    },
    stats: {
      averagePrice: 1650000,
      medianPrice: 1450000,
      totalListings: 28,
      daysOnMarket: 25
    }
  },
  {
    name: "Mill Pond",
    slug: "mill-pond",
    city: "richmond-hill",
    description: "Historic area centered around the scenic Mill Pond Park.",
    features: {
      parks: ["Mill Pond Park", "Pioneer Park", "Richmond Green Sports Centre"],
      transit: ["Richmond Hill Centre Terminal", "YRT Bus Routes"],
      schools: ["Richmond Hill High School", "Walter Scott Public School"],
      shopping: ["Richmond Hill Centre", "Hillcrest Mall"]
    },
    stats: {
      averagePrice: 1350000,
      medianPrice: 1250000,
      totalListings: 35,
      daysOnMarket: 20
    }
  },
  {
    name: "Oak Ridges",
    slug: "oak-ridges",
    city: "richmond-hill",
    description: "Nature-focused community on the Oak Ridges Moraine.",
    features: {
      parks: ["Lake Wilcox Park", "Oak Ridges Corridor Conservation Reserve", "Bond Lake"],
      transit: ["YRT Bus Routes", "GO Bus Service"],
      schools: ["Oak Ridges Public School", "Lake Wilcox Public School"],
      shopping: ["Oak Ridges Marketplace", "King Ridge Marketplace"]
    },
    stats: {
      averagePrice: 1450000,
      medianPrice: 1350000,
      totalListings: 42,
      daysOnMarket: 22
    }
  },
  {
    name: "Jefferson",
    slug: "jefferson",
    city: "richmond-hill",
    description: "Family-oriented community with excellent schools and parks.",
    features: {
      parks: ["Jefferson Forest", "Phyllis Rawlinson Park"],
      transit: ["YRT Bus Routes", "Jefferson Station"],
      schools: ["Richmond Rose Public School", "St. Theresa of Lisieux Catholic High School"],
      shopping: ["Jefferson Plaza", "Yonge Street Shopping"]
    },
    stats: {
      averagePrice: 1250000,
      medianPrice: 1150000,
      totalListings: 45,
      daysOnMarket: 18
    }
  },
  {
    name: "Westbrook",
    slug: "westbrook",
    city: "richmond-hill",
    description: "Modern community with a mix of new developments and established homes.",
    features: {
      parks: ["Bridgeview Park", "Ozark Park", "Russell Tilt Park"],
      transit: ["YRT Bus Routes", "Westbrook Station"],
      schools: ["Westbrook Public School", "Holy Trinity School"],
      shopping: ["Westbrook Plaza", "Yonge Street Shops"]
    },
    stats: {
      averagePrice: 1150000,
      medianPrice: 1050000,
      totalListings: 52,
      daysOnMarket: 16
    }
  },
  {
    name: "North Richvale",
    slug: "north-richvale",
    city: "richmond-hill",
    description: "Established neighborhood with mature trees and spacious lots.",
    features: {
      parks: ["North Richvale Greenway", "Richvale Athletic Field"],
      transit: ["YRT Bus Routes", "Langstaff GO Station"],
      schools: ["Richvale Public School", "Richmond Hill Christian Academy"],
      shopping: ["Richvale Plaza", "Times Square"]
    },
    stats: {
      averagePrice: 1550000,
      medianPrice: 1450000,
      totalListings: 32,
      daysOnMarket: 24
    }
  },
  {
    name: "South Richvale",
    slug: "south-richvale",
    city: "richmond-hill",
    description: "Quiet residential area with easy access to amenities.",
    features: {
      parks: ["South Richvale Park", "German Mills Meadow"],
      transit: ["YRT Bus Routes", "Langstaff GO Station"],
      schools: ["Richvale Public School South", "St. Joseph Catholic School"],
      shopping: ["South Richvale Plaza", "German Mills Shopping"]
    },
    stats: {
      averagePrice: 1450000,
      medianPrice: 1350000,
      totalListings: 38,
      daysOnMarket: 21
    }
  },
  {
    name: "Hillsview",
    slug: "hillsview",
    city: "richmond-hill",
    description: "Upscale area with custom homes and panoramic views.",
    features: {
      parks: ["Hillsview Park", "Summit Golf Club"],
      transit: ["YRT Bus Routes"],
      schools: ["Hillsview Public School", "St. Theresa Catholic School"],
      shopping: ["Hillsview Plaza", "Yonge Street Boutiques"]
    },
    stats: {
      averagePrice: 1850000,
      medianPrice: 1750000,
      totalListings: 25,
      daysOnMarket: 28
    }
  }
] 