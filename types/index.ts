export interface NavigationProps {
  isHeroVisible: boolean;
  activeSection: string;
  handleNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, id: string ) => void;
}

export interface ClientWrapperProps {
  children: React.ReactNode;
}

export interface IlamProfileFile {
  ilamProfile: IlamProfile
}

export interface IlamProfile {
  title: string
  introduction: string
  overview: Overview
  geography: Geography
  biodiversity: Biodiversity
  economy: Economy
  culture: Culture
  attractions: string[]
  accessibility: Accessibility
  conclusion: Conclusion
}

export interface Overview {
  description: string
  location: string
  characteristics: string[]
}

export interface Geography {
  area: string
  altitude: string
  borders: {
    east: string
    west: string
    south: string
    north: string
  }
  rivers: {
    main: string
    tributaries: string[]
  }
  climate: {
    types: string[]
    rainfall: string
    bestSeasons: string[]
  }
}

export interface Biodiversity {
  birds: string[]
  animals: string[]
  trees: string[]
  flora: string[]
}

export interface Economy {
  agriculture: {
    mainCrops: string[]
    foodCrops: string[]
    other: string[]
  }
  livestock: string[]
  products: {
    famous: string[]
  }
}

export interface Culture {
  ethnicGroups: string[]
  religions: string[]
  dances: string[]
  festivals: string[]
}

export interface Accessibility {
  byAir: string
  byRoad: string
  baseCamp: string
}

export interface Conclusion {
  tagline: string
  invitation: string
  summary: string
}

// types/destinations/index.ts

export interface DestinationsFile {
  destinations: Destination[]
}

export interface Destination {
  id: number
  name: string
  category: "main" | "secondary" // strict typing based on your JSON
  image: string
  description: string
  rating: number
  reviews: number
  details: DestinationDetails
}

export interface DestinationDetails {
  altitude: string
  bestSeason: string
  address: string
  distance: string
  attraction: string
  significance: string
  workers: string
  production: string
  impact: string
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}