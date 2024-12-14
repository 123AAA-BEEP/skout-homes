# Core Component Specifications

**IMPORTANT: This document defines our core reusable components.**

## Header Component

### Mobile-First Header
```typescript
interface Header {
  logo: {
    container: {
      position: "left",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    image: {
      src: "/logo.svg",
      alt: "Skout Homes Logo",
      width: 32,
      height: 32
    },
    text: {
      content: "Skout Homes",
      className: "text-xl font-bold"
    }
  },

  cta: {
    position: "right",
    label: "Get Started",
    href: "/find-realtor",
    variant: "primary",
    className: "hidden md:block" // Only show on desktop
  },

  mobileMenu: {
    trigger: {
      type: "hamburger",
      position: "right",
      className: "md:hidden" // Only show on mobile
    },
    drawer: {
      position: "right",
      width: "80vw",
      maxWidth: "300px",
      animation: "slide-in-right"
    },
    items: [
      {
        label: "Find an Agent",
        href: "/find-realtor"
      },
      {
        label: "Home Valuation",
        href: "/tools/home-value-estimator"
      },
      {
        label: "Tax Calculator",
        href: "/tools/land-transfer-tax-calculator"
      },
      {
        label: "Cities",
        type: "dropdown",
        items: [
          { label: "Toronto", href: "/toronto" },
          { label: "Mississauga", href: "/mississauga" }
          // Other cities...
        ]
      }
    ]
  }
}
```

## Footer Component

### Structure
```typescript
interface Footer {
  sections: [
    {
      title: "Popular Locations",
      type: "links",
      columns: 2,
      items: [
        {
          label: "Toronto Real Estate",
          href: "/toronto"
        },
        {
          label: "Mississauga Real Estate",
          href: "/mississauga"
        }
        // More locations...
      ]
    },
    {
      title: "Quick Links",
      type: "links",
      items: [
        {
          label: "Find an Agent",
          href: "/find-realtor"
        },
        {
          label: "Free Home Valuation",
          href: "/tools/home-value-estimator"
        },
        {
          label: "Land Transfer Calculator",
          href: "/tools/land-transfer-tax-calculator"
        }
      ]
    }
  ],

  legalDisclosure: {
    text: `Disclosure: this website, and commentary herein are provided solely for the purpose to openly provide information to the public. The content of this website is for informational and conceptual purposes only. Prices, specifications, and architectural renderings are subject to change without notice. E. &O.E. Illustrations are artist's concept. The website is an open platform to share information to the public and does not provide any real estate, brokerage, appraisal, mortgage, legal or any other real property related services. Please consult a qualified professional before making any financial decisions. If you are dissatisfied with this website or with this agreement, your sole and exclusive remedy is to discontinue using this website. Please refer to our Privacy Policy and Legal Disclaimer for reference.`,
    className: "text-sm text-gray-600 mt-8 px-4"
  },

  brokerInfo: {
    text: "Alex Karczewski | Broker | Orion Realty Corporation, Brokerage | 1149 Lakeshore Rd E, Mississauga ON L5E 1E8",
    className: "text-sm font-semibold mt-4 px-4"
  },

  bottomBar: {
    copyright: "© 2024 Skout Homes. All rights reserved.",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy"
      },
      {
        label: "Terms of Service",
        href: "/terms"
      },
      {
        label: "Sitemap",
        href: "/sitemap.xml"
      }
    ]
  }
}
```

### SEO Implementation
```typescript
interface FooterSEO {
  schema: {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Skout Homes",
    "broker": {
      "@type": "RealEstateBroker",
      "name": "Alex Karczewski",
      "jobTitle": "Broker",
      "worksFor": {
        "@type": "RealEstateOrganization",
        "name": "Orion Realty Corporation, Brokerage",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1149 Lakeshore Rd E",
          "addressLocality": "Mississauga",
          "addressRegion": "ON",
          "postalCode": "L5E 1E8"
        }
      }
    }
  }
}
```

### Mobile Responsiveness
```typescript
const footerResponsive = {
  container: {
    base: "w-full px-4 py-8 bg-gray-100",
    md: "px-6 py-12"
  },
  sections: {
    base: "grid gap-8",
    md: "grid-cols-2",
    lg: "grid-cols-4"
  },
  disclosure: {
    base: "text-xs leading-relaxed",
    md: "text-sm"
  }
}
```

## Additional Essential Components

### Floating Contact Button
```typescript
interface FloatingContact {
  mobile: {
    position: "bottom",
    type: "full-width",
    label: "Connect with an Agent",
    variant: "primary",
    sticky: true
  },
  
  desktop: {
    position: "bottom-right",
    type: "floating",
    label: "Get Started",
    showAfterScroll: "300px"
  }
}
```

### Breadcrumbs
```typescript
interface Breadcrumb {
  separator: "/",
  maxItems: 3,
  schema: true, // For SEO
  className: "text-sm py-2"
}
```

### Lead Capture Modal
```typescript
interface LeadModal {
  trigger: "button" | "scroll" | "exit-intent",
  form: {
    fields: [
      {
        name: "phone",
        type: "tel",
        required: true,
        placeholder: "Phone Number"
      },
      {
        name: "email",
        type: "email",
        required: true,
        placeholder: "Email"
      }
    ],
    submitLabel: "Connect Now",
    consent: "By submitting, you agree to our terms"
  }
}
```

### Accessibility Essentials
```typescript
const a11y = {
  // Minimum requirements
  requirements: [
    "aria-labels",
    "keyboard-navigation",
    "color-contrast",
    "focus-visible"
  ],
  
  // Skip link for keyboard users
  skipLink: {
    label: "Skip to main content",
    target: "#main-content"
  }
}
```

## Implementation Notes

### Header Implementation
- Hamburger menu on mobile
- Full navigation on desktop
- Sticky positioning
- Smooth transitions
- Clear CTAs

### Footer Implementation
- Mobile-first grid layout
- Readable legal text
- SEO-optimized links
- Clear broker information
- Proper spacing and hierarchy

---

*These components should be implemented with accessibility and performance in mind while maintaining SEO best practices.* 