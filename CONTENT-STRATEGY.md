# Content Strategy Specification

**IMPORTANT: This document defines our content structure and requirements.**

## Content Types

### Location Content
```typescript
interface LocationContent {
  required: {
    title: string;
    metaDescription: string;
    overview: string;
    keyFeatures: string[];
    amenities: string[];
    transportation: string[];
  };
  optional: {
    history: string;
    schools: string[];
    parks: string[];
    shopping: string[];
  };
  dynamic: {
    marketStats: boolean;
    activeListings: boolean;
  };
}
```

### Intent Content
```typescript
interface IntentContent {
  required: {
    title: `{intent} in {location}`;
    metaDescription: string;
    processSteps: string[];
    benefits: string[];
    faq: Array<{
      question: string;
      answer: string;
    }>;
  };
  optional: {
    testimonials: Array<{
      text: string;
      author: string;
    }>;
    marketInsights: string;
  };
}
```

## Content Variables

### Location Variables
```typescript
const locationVariables = {
  city: string;
  neighbourhood: string;
  region: string;
  postalCode?: string;
  propertyTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
```

### Intent Variables
```typescript
const intentVariables = {
  action: "buy" | "sell" | "invest";
  propertyType: "house" | "condo" | "townhouse";
  timeline: string;
  budget?: string;
}
```

## SEO Requirements

### Meta Content
```typescript
interface MetaContent {
  title: {
    maxLength: 60;
    pattern: `{primary-keyword} in {location} | {brand}`;
  };
  description: {
    maxLength: 155;
    pattern: `{value-prop} for {primary-keyword} in {location}. {call-to-action}`;
  };
  h1: {
    maxLength: 70;
    pattern: `{primary-keyword} in {location}`;
  };
}
```

### Content Length
```typescript
const contentLengths = {
  cityPage: {
    minimum: 1000,
    recommended: 1500
  };
  neighbourhoodPage: {
    minimum: 800,
    recommended: 1200
  };
  intentPage: {
    minimum: 600,
    recommended: 1000
  };
}
```

## FAQ Structure

### Required Topics
```typescript
interface FAQTopics {
  location: [
    "What makes {location} unique?",
    "What amenities are available?",
    "How is the transportation?",
    "What are popular areas in {location}?"
  ];
  buying: [
    "What is the average home price?",
    "What types of homes are available?",
    "How long do homes stay on market?",
    "What is the buying process?"
  ];
  selling: [
    "What is my home worth?",
    "When is the best time to sell?",
    "How long will it take to sell?",
    "What is the selling process?"
  ];
}
```

## Dynamic Content Rules

### Market Data
```typescript
interface MarketData {
  updateFrequency: "daily" | "weekly";
  required: [
    "average_price",
    "active_listings",
    "days_on_market"
  ];
  optional: [
    "price_trends",
    "sold_data",
    "market_conditions"
  ];
}
```

### Content Freshness
```typescript
interface ContentFreshness {
  staticContent: {
    reviewFrequency: "quarterly";
    updateTriggers: [
      "market_changes",
      "seasonal_updates",
      "major_developments"
    ];
  };
  dynamicContent: {
    caching: "1 day";
    fallback: "static_values";
  };
}
```

## Content Quality Guidelines

### Writing Style
- Clear and concise
- Professional but approachable
- Action-oriented
- Local focus
- Value-driven

### Content Principles
- User-first information
- Actionable insights
- Local expertise
- Current relevance
- Conversion-focused

### Content Review Process
1. Initial draft
2. SEO optimization
3. Local accuracy check
4. Compliance review
5. Final approval

## Implementation Notes

### Content Generation
- Manual creation for core content
- Dynamic assembly for variable content
- Regular review and updates
- Quality control process

### Content Management
- Version control
- Update tracking
- Approval workflow
- Archive system

---

*This document defines our content strategy and requirements. All content must follow these specifications.* 