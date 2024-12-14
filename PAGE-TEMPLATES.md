# Page Templates Specification

**IMPORTANT: This document defines the structure and components for each page type.**

## Homepage Template

### Hero Section
```typescript
interface HomeHero {
  layout: "full-width";
  components: {
    leadForm: {
      position: "center";
      style: "floating-card";
      fields: [
        "location-search",
        "intent-selector",
        "contact-info"
      ];
    };
    background: {
      type: "image" | "gradient";
      overlay: true;
      opacity: 0.5;
    };
    heading: {
      main: string;
      sub: string;
    };
  };
}
```

### Featured Areas
```typescript
interface FeaturedAreas {
  layout: "grid";
  items: {
    count: 6;
    display: {
      image: true;
      title: string;
      description: string;
      stats: {
        properties: number;
        averagePrice: string;
      };
    };
  };
}
```

### Tools Section
```typescript
interface ToolsSection {
  layout: "three-column";
  tools: [
    {
      type: "calculator";
      title: "Land Transfer Tax Calculator";
      icon: "calculator";
    },
    {
      type: "valuation";
      title: "Free Home Valuation";
      icon: "home";
    },
    {
      type: "agent-finder";
      title: "Find an Agent";
      icon: "user";
    }
  ];
}
```

### Value Proposition
```typescript
interface ValueProps {
  layout: "four-column";
  items: [
    {
      icon: "check";
      title: "Expert Local Agents";
      description: string;
    },
    // ... other value props
  ];
}
```

## City Page Template

### City Hero
```typescript
interface CityHero {
  components: {
    heading: string;
    breadcrumbs: true;
    cityStats: {
      averagePrice: string;
      activeListings: number;
      neighbourhoods: number;
    };
    leadForm: "floating";
  };
}
```

### Neighbourhood Grid
```typescript
interface NeighbourhoodGrid {
  layout: "masonry";
  filters: {
    popular: boolean;
    alphabetical: boolean;
    priceRange: boolean;
  };
  display: {
    image: true;
    title: string;
    description: string;
    cta: "Explore {neighbourhood}";
  };
}
```

## Neighbourhood Page Template

### Neighbourhood Hero
```typescript
interface NeighbourhoodHero {
  components: {
    heading: string;
    breadcrumbs: true;
    stats: {
      averagePrice: string;
      activeListings: number;
      daysOnMarket: number;
    };
    leadForm: "side-floating";
  };
}
```

### Neighbourhood Content
```typescript
interface NeighbourhoodContent {
  sections: [
    {
      type: "overview";
      content: string;
    },
    {
      type: "amenities";
      items: string[];
    },
    {
      type: "transportation";
      items: string[];
    }
  ];
}
```

## Intent-Based Page Template

### Intent Hero
```typescript
interface IntentHero {
  components: {
    heading: `{intent} in {location}`;
    subheading: string;
    leadForm: "centered";
    trustIndicators: true;
  };
}
```

### Intent Content
```typescript
interface IntentContent {
  sections: [
    {
      type: "process-steps";
      steps: string[];
    },
    {
      type: "benefits";
      items: string[];
    },
    {
      type: "faq";
      questions: Array<{
        question: string;
        answer: string;
      }>;
    }
  ];
}
```

## Tool Page Template

### Tool Hero
```typescript
interface ToolHero {
  components: {
    heading: string;
    description: string;
    trustIndicators: true;
  };
}
```

### Tool Interface
```typescript
interface ToolInterface {
  layout: "two-column";
  components: {
    toolForm: {
      position: "left";
      width: "60%";
    };
    results: {
      position: "right";
      width: "40%";
      sticky: true;
    };
  };
}
```

## Common Components

### Navigation
```typescript
interface Navigation {
  type: "sticky";
  components: {
    logo: true;
    mainMenu: true;
    cta: "contact";
    mobileMenu: "hamburger";
  };
}
```

### Footer
```typescript
interface Footer {
  sections: [
    "popular-locations",
    "quick-links",
    "tools",
    "company"
  ];
  components: {
    newsletter: true;
    socialLinks: true;
    legalText: true;
  };
}
```

## Implementation Guidelines

### Responsive Behavior
- Mobile-first approach
- Breakpoint-specific layouts
- Adaptive content display
- Touch-friendly interactions

### Performance Requirements
- Lazy-loaded images
- Component-level code splitting
- Optimized loading states
- Minimal layout shift

### Accessibility Standards
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

---

*This document defines our page templates and their components. All implementations must follow these specifications.* 