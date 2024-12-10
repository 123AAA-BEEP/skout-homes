export interface City {
  name: string
  slug: string
  description: string
}

export interface NeighbourhoodFeatures {
  parks?: string[]
  transit?: string[]
  schools?: string[]
  shopping?: string[]
}

export interface NeighbourhoodStats {
  averagePrice: number
  medianPrice: number
  totalListings: number
  daysOnMarket: number
}

export interface Neighbourhood {
  name: string
  slug: string
  city: string
  description: string
  features: NeighbourhoodFeatures
  stats: NeighbourhoodStats
}

export type Intent = 'buying' | 'selling' | 'renting' | 'investing'

export interface PropertyType {
  type: 'house' | 'condo' | 'townhouse' | 'apartment'
  label: string
} 