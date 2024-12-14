# Home Page Specification

**IMPORTANT: This document outlines the structure and content of our main landing page.**

## Page Structure

### Hero Section
```typescript
// Hero.tsx
interface HeroSection {
  heading: "Find Top Real Estate Agents in the Greater Toronto Area"
  subheading: "Connect with experienced local agents in your neighbourhood"
  
  // Primary CTA Form
  leadForm: {
    fields: [
      "Location (Autocomplete)",
      "Intent (Dropdown)",
      "Phone/Email (Input)",
    ]
    cta: "Connect with an Agent Now"
  }
}
```

### Location Navigator
```typescript
// Quick access to major cities/areas
interface LocationGrid {
  cities: [
    {
      name: "Toronto",
      neighbourhoods: number, // Count
      image: "/toronto.webp",
      link: "/toronto"
    },
    {
      name: "Mississauga",
      neighbourhoods: number,
      image: "/mississauga.webp",
      link: "/mississauga"
    },
    // Additional major cities...
  ]
}
```

### Value Proposition
```typescript
interface ValueProps {
  features: [
    {
      title: "Free Expert Consultation",
      description: "Connect with top local agents at no cost"
    },
    {
      title: "Local Market Knowledge",
      description: "Get insights from neighbourhood specialists"
    },
    {
      title: "Quick Response",
      description: "Hear back from an agent within minutes"
    }
  ]
}
```

### Popular Searches
```typescript
interface PopularSearches {
  categories: [
    {
      title: "Popular Toronto Areas",
      links: [
        "/toronto/annex/real-estate-agent",
        "/toronto/yorkville/real-estate-agent",
        // More high-value links...
      ]
    },
    {
      title: "Popular Services",
      links: [
        "/toronto/home-evaluation",
        "/mississauga/top-realtor",
        // More service-based links...
      ]
    }
  ]
}
```

### Trust Section
```typescript
interface TrustIndicators {
  stats: [
    { value: "1000+", label: "Agents Available" },
    { value: "50,000+", label: "Properties Sold" },
    { value: "98%", label: "Client Satisfaction" }
  ]
}
```

### Tools Section
```typescript
interface ToolsSection {
  heading: "Free Real Estate Tools",
  subheading: "Essential calculators and tools for your real estate decisions",
  
  tools: [
    {
      title: "Land Transfer Tax Calculator",
      description: "Calculate your Ontario and Toronto land transfer taxes",
      icon: "calculator",
      link: "/tools/land-transfer-tax-calculator",
      features: [
        "Ontario tax calculation",
        "Toronto municipal tax calculation",
        "First-time buyer rebate",
        "Instant results"
      ]
    },
    {
      title: "Free Home Valuation",
      description: "Get a detailed estimate of your home's current value",
      icon: "home",
      link: "/tools/home-value-estimator",
      formSteps: [
        {
          step: 1,
          title: "Property Type",
          fields: ["House", "Condo", "Townhouse", "Other"]
        },
        {
          step: 2,
          title: "Basic Details",
          fields: ["Bedrooms", "Bathrooms"]
        },
        {
          step: 3,
          title: "Property Size",
          fields: ["Square Footage", "Lot Size"]
        },
        {
          step: 4,
          title: "Property Features",
          fields: ["Recent Renovations", "Parking", "Outdoor Space"]
        },
        {
          step: 5,
          title: "Property Location",
          fields: ["Address", "Postal Code"]
        },
        {
          step: 6,
          title: "Contact Information",
          fields: ["Name", "Email", "Phone", "Preferred Contact Method"]
        }
      ],
      features: [
        "Step-by-step process",
        "Detailed analysis",
        "Professional evaluation",
        "Quick response"
      ]
    },
    {
      title: "Find Your Perfect Agent",
      description: "Get matched with a top local realtor in minutes",
      icon: "match",
      link: "/find-realtor",
      features: [
        "Free matching service",
        "Personalized recommendations",
        "Instant response",
        "No obligation"
      ],
      priority: "high",
      display: {
        position: "prominent",
        style: "featured"
      }
    }
  ]
}
```

### Tool Pages Implementation

#### Land Transfer Tax Calculator
```typescript
interface TaxCalculator {
  inputs: {
    propertyValue: number,
    firstTimeBuyer: boolean,
    location: "Toronto" | "Ontario"
  },
  outputs: {
    provincialTax: number,
    municipalTax: number,
    totalTax: number,
    potentialRebate: number
  },
  features: {
    instantCalculation: true,
    printableResults: true,
    emailResults: true,
    leadCaptureForm: {
      optional: true,
      position: "bottom"
    }
  }
}
```

#### Home Value Estimator
```typescript
interface HomeValueEstimator {
  formConfig: {
    progressBar: true,
    saveProgress: true,
    returnLink: true,
    estimatedTime: "2-3 minutes"
  },
  leadCapture: {
    required: true,
    step: 6,
    followUp: {
      email: true,
      sms: optional,
      responseTime: "within 24 hours"
    }
  },
  features: {
    mobileOptimized: true,
    autosave: true,
    locationAutocomplete: true,
    imageUpload: optional
  }
}
```

### Tool-Specific SEO

```typescript
const toolsSEO = {
  landTransferCalculator: {
    title: "Ontario & Toronto Land Transfer Tax Calculator | Free Tool",
    description: "Calculate your land transfer tax for Ontario and Toronto properties. Free, instant results with first-time buyer rebate calculations.",
    keywords: "land transfer tax calculator, Toronto land transfer tax, Ontario land transfer tax, first time buyer rebate"
  },
  homeValueEstimator: {
    title: "Free Home Value Estimator | GTA Property Valuation",
    description: "Get a free, professional estimate of your home's value. Detailed analysis based on current market data and property features.",
    keywords: "home value estimator, property valuation, house price estimate, GTA home value"
  }
}
```

### Conversion Strategy
```typescript
const toolsConversion = {
  primaryGoals: [
    "Lead capture through home valuation",
    "Contact information from calculator users"
  ],
  tactics: {
    calculator: {
      // Offer email/PDF of results
      // Show agent contact after calculation
      // Suggest home valuation as next step
    },
    valueEstimator: {
      // Progressive form engagement
      // Save progress to encourage completion
      // Immediate value preview before final step
    }
  }
}
```

## SEO Configuration

### Metadata
```typescript
const metadata = {
  title: "Find Top Real Estate Agents in GTA | Expert Local Realtors",
  description: "Connect with experienced real estate agents in Toronto, Mississauga, and across the GTA. Get free consultation and local expertise for buying or selling your home.",
  keywords: "real estate agent, realtor, Toronto real estate, GTA realtor, find real estate agent",
}
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "GTA Real Estate Connections",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "43.6532",
      "longitude": "-79.3832"
    },
    "geoRadius": "100 km"
  }
}
```

## Content Guidelines

### Key Messages
1. Immediate access to top agents
2. Free, no-obligation consultation
3. Local market expertise
4. Proven track record
5. Simple, fast process

### Tone & Style
- Professional but approachable
- Clear and direct
- Emphasis on local expertise
- Trust-building language
- Action-oriented

## Technical Implementation

### Performance Priorities
```typescript
const optimizations = {
  images: {
    priority: true, // For hero and city images
    loading: "lazy", // For below-fold images
    sizes: "(max-width: 768px) 100vw, 33vw"
  },
  interactivity: {
    formHydration: "priority",
    locationAutocomplete: "lazy"
  }
}
```

### Component Loading
```typescript
// Priority Components (Immediate Load)
- Hero
- Lead Form
- Navigation

// Deferred Loading
- Location Grid
- Trust Indicators
- Popular Searches
```

## Mobile Considerations

### Mobile-First Elements
1. Click-to-call button fixed to bottom
2. Simplified lead form
3. Collapsible location navigator
4. Touch-friendly interface
5. Optimized image sizes

### Responsive Breakpoints
```typescript
const breakpoints = {
  sm: "640px",   // Mobile
  md: "768px",   // Tablet
  lg: "1024px",  // Desktop
  xl: "1280px"   // Large Desktop
}
```

### Find a Realtor Tool
```typescript
interface FindRealtorTool {
  title: "Find Your Perfect Real Estate Agent",
  description: "Get matched with a local expert based on your specific needs",
  
  matchingForm: {
    steps: [
      {
        step: 1,
        title: "What are you looking to do?",
        fields: [
          {
            type: "radio",
            options: [
              "Buy a home",
              "Sell a home",
              "Both buy and sell",
              "Investment property",
              "Other"
            ]
          }
        ]
      },
      {
        step: 2,
        title: "Where are you looking to buy/sell?",
        fields: [
          {
            type: "location-autocomplete",
            placeholder: "Enter city, neighbourhood, or postal code",
            suggestions: true
          }
        ]
      },
      {
        step: 3,
        title: "What's your timeline?",
        fields: [
          {
            type: "select",
            options: [
              "Immediately",
              "Within 30 days",
              "1-3 months",
              "3-6 months",
              "6+ months",
              "Just browsing"
            ]
          }
        ]
      },
      {
        step: 4,
        title: "What's most important to you?",
        fields: [
          {
            type: "checkbox",
            multiSelect: true,
            options: [
              "Local market knowledge",
              "Experience level",
              "Quick response time",
              "Strong negotiation skills",
              "First-time buyer expertise",
              "Investment property experience",
              "Luxury home experience",
              "Language preferences",
              "Available on evenings/weekends"
            ]
          }
        ]
      },
      {
        step: 5,
        title: "Any specific requirements?",
        fields: [
          {
            type: "checkbox",
            multiSelect: true,
            options: [
              "Speaks multiple languages",
              "Experience with condos",
              "Experience with houses",
              "Pre-construction expertise",
              "Commercial experience"
            ]
          }
        ]
      },
      {
        step: 6,
        title: "Your Contact Information",
        fields: [
          {
            type: "text",
            label: "Name",
            required: true
          },
          {
            type: "email",
            label: "Email",
            required: true
          },
          {
            type: "phone",
            label: "Phone",
            required: true
          },
          {
            type: "select",
            label: "Preferred contact method",
            options: ["Email", "Phone", "Text"]
          }
        ]
      }
    ],
    
    features: {
      progressBar: true,
      saveProgress: true,
      backButton: true,
      mobileOptimized: true,
      estimatedTime: "2 minutes"
    }
  }
}

interface MatchingLogic {
  priorityFactors: [
    "Location match",
    "Specialization match",
    "Timeline urgency",
    "Language requirements",
    "Property type experience"
  ],
  
  responseTime: {
    immediate: {
      message: "We're finding your perfect agent match...",
      timing: "You'll receive your match within 5 minutes"
    }
  },
  
  followUp: {
    automatic: {
      email: true,
      sms: optional,
      timing: "instant"
    },
    agentNotification: {
      timing: "instant",
      method: ["email", "sms", "dashboard"]
    }
  }
}

interface SEOConfiguration {
  path: "/find-realtor",
  metadata: {
    title: "Find Your Perfect Real Estate Agent | Free Agent Matching",
    description: "Get matched with top local real estate agents based on your specific needs. Free service, no obligation, instant matching.",
    keywords: "find realtor, real estate agent matching, best agent finder, local realtor match"
  },
  structuredData: {
    "@type": "Service",
    "name": "Real Estate Agent Matching",
    "description": "Free real estate agent matching service"
  }
}
```

---

*This document serves as the specification for our home page implementation. All development must align with these guidelines while maintaining our core focus on lead generation.* 