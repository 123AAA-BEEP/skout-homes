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
  }
] 