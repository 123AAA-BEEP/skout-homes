export interface City {
  name: string;
  slug: string;
  description: string;
}

export const cities: City[] = [
  {
    name: "Toronto",
    slug: "toronto",
    description: "Discover Toronto's diverse neighborhoods and vibrant real estate market. From downtown condos to suburban homes, find your perfect property in Canada's largest city."
  },
  {
    name: "Richmond Hill",
    slug: "richmond-hill",
    description: "Explore Richmond Hill's family-friendly communities and growing real estate opportunities. Find your ideal home in this thriving Greater Toronto Area suburb."
  }
]; 